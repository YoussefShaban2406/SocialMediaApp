export interface User {
	_id: string;
	name: string;
	username: string;
	photo: string;
}

export interface Post {
	_id: string;
	body: string;
	privacy: string;
	user: User;
	sharedPost?: any;
	likes: any[];
	createdAt: string;
	commentsCount: number;
	topComment?: any;
	sharesCount: number;
	likesCount: number;
	isShare: boolean;
	id: string;
	bookmarked: boolean;
}

export interface Data {
	post: Post;
}

export interface ISinglePostResponse {
	success: boolean;
	message: string;
	data: Data;
}