export interface Post {
	_id: string;
	body: string;
	privacy: string;
	user: string;
	sharedPost?: any;
	likes: any[];
	createdAt: string;
	likesCount: number;
	isShare: boolean;
	id: string;
}

export interface Data {
	post: Post;
}

export interface IDeletePost {
	success: boolean;
	message: string;
	data: Data;
}