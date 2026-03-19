export interface Data {
	unreadCount: number;
}

export interface IUnreadNotificationsCounts {
	success: boolean;
	message: string;
	data: Data;
}