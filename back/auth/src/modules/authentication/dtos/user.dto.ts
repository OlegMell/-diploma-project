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
    photo?: any;
    img?: string
    bio?: string;
    site?: string;
    username?: string;
}
