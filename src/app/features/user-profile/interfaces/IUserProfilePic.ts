export interface Data {
	photo: string;
	postId: string;
}

export interface IUserProfilePic {
	success: boolean;
	message: string;
	data: Data;
}