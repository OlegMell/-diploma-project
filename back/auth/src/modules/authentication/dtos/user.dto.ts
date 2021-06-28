/***
 * Модель входящего пользователя
 */
export interface LoginUserDto {
    login: string;
    password: string
}

/**
 * Модель нового пользователя
 */
export interface AddUserDto {
    username: string;
    login: string;
    password: string
}

/**
 * Модель обновления персональных данных
 */

export interface UpdatePersonalInfoDto {
    name?: string;
    photo?: Express.Multer.File;
    bio?: string;
    site?: string;
    username?: string;
}
