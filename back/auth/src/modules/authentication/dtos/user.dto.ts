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
 * Модель персональных данных
 */

export interface PersonalInfoDto {
    firstname?: string;
    lastname?: string;
    email?: string;
    photo?: string;
    phone?: string;
    bio?: string;
    site?: string;
}
