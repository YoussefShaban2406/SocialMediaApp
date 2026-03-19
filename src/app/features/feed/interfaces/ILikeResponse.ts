export interface User {
	_id: string;
	name: string;
	username: string;
	photo: string;
	followersCount: number;
	followingCount: number;
	bookmarksCount: number;
	id: string;
}

export interface Post {
	_id: string;
	image: string;
	privacy: string;
	user: User;
	sharedPost?: any;
	likes: string[];
	createdAt: string;
	likesCount: number;
	isShare: boolean;
	id: string;
}

export interface Data {
	liked: boolean;
	likesCount: number;
	post: Post;
}

export interface ILikeResponse {
	success: boolean;
	message: string;
	data: Data;
}