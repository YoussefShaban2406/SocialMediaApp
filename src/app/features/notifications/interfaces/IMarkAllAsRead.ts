export interface Data {
	modifiedCount: number;
}

export interface IMarkAllAsRead {
	success: boolean;
	message: string;
	data: Data;
}