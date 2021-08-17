import { Injectable } from '@nestjs/common';
import { CreatePostReq, GetByAuthorIdDto, LikePost, RemoveReqDto, } from '../models/dtos/posts.dtos';
import { PostsRepository } from '../../../shared/repositories/posts.repository';
import { CreatedPost, Post, Post1, } from '../models/interfaces/posts.interfaces';
import { UsersService } from '../../../shared/services/users.service';
import { Observable, of } from 'rxjs';
import { mergeMap, reduce } from 'rxjs/operators';
import { DropboxService } from '../../../shared/services/dropbox.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepos: PostsRepository,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly dropboxService: DropboxService,
  ) {}

  public create(posts: CreatePostReq): Promise<CreatedPost> {
    return this.postsRepos.createPost(posts);
  }

  public async getAll(token: string): Promise<any> {
    const userId = this.jwtService.decode(
      token.slice(token.indexOf(' ') + 1),
    ).sub;

    // console.log('GET_ALL:::USER_ID - ', userId);

    const posts = await this.postsRepos.getAll();
    // console.log('GET_ALL:::POSTS - ', posts);
    if (!posts.length) {
      return null;
    }

    posts.forEach((post: Post) => {
      if (post.likedUsers.length) {
        if (post.likedUsers.includes(userId)) {
          post.isLiked = true;
        }
      }
    });

    return this.fillPostData(posts, userId);
  }

  public async getByAuthorId(query: GetByAuthorIdDto): Promise<any> {
    // const userId = this.jwtService.decode(
    //   token.slice(token.indexOf(' ') + 1),
    // ).sub;

    const posts = await this.postsRepos.getByAuthorId(query);

    if (!posts.length) {
      return null;
    }

    // posts.forEach((post: Post) => {
    //   if (post.likedUsers.length) {
    //     if (post.likedUsers.includes(userId)) {
    //       post.isLiked = true;
    //     }
    //   }
    // });

    return this.fillPostData(posts, '');
  }

  public removePost(query: RemoveReqDto): any {
    return this.postsRepos.remove(query.id);
  }

  public async setLike(like: LikePost): Promise<any> {
    like.userId = this.jwtService.decode(
      like.token.slice(like.token.indexOf(' ') + 1),
    ).sub;

    // console.log('SET_LIKE:::LIKE - ', like);

    const res = await this.postsRepos.setLike(like);
    // console.log('SET_LIKE:::SET_LIKE_RES - ', res);
    if (res) {
      return res;
    } else {
      return null;
    }
  }

  private fillPostData(posts: Post[], cUserId: string): Observable<any[]> {
    return of(...posts).pipe(
      // map((post: Post) => {
      //   if (post.likedUsers.length > 0) {
      //     if (
      //       post.likedUsers.find((userId) => userId?.toHexString() === cUserId)
      //     ) {
      //       console.log('HEREERERERERERERRER');
      //       post.isLiked = true;
      //       return post;
      //     } else {
      //       return post;
      //     }
      //   } else {
      //     return post;
      //   }
      // }),
      mergeMap((post: Post1) => {
        // console.log(post);
        return this.usersService
          .getAuthorDataById({
            id: post.author.toHexString(),
          })
          .pipe(
            mergeMap((author) => {
              return this.dropboxService
                .getFileLink(author.personalInfo.photo)
                .pipe(
                  mergeMap((link) => {
                    return of({
                      post: post,
                      authorData: { ...author, photo: link },
                    });
                  }),
                );
            }),
          );
      }),
      reduce((acc, post) => [...acc, post], []),
    );
  }
}
