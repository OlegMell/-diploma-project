/**
 * Модель подписки
 */
export interface FollowDto {
    sourceUserId: string; // Id пользователя желающего подписатся
    targetUserId: string;  // Id пользователя на котого подписываюсться
}
