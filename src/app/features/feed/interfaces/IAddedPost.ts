export interface Post {
	body: string;
	privacy: string;
	user: string;
	sharedPost?: any;
	likes: any[];
	_id: string;
	image: string;
	createdAt: string;
	likesCount: number;
	isShare: boolean;
	id: string;
}

export interface Data {
	post: Post;
}

export interface IAddedPost {
	success: boolean;
	message: string;
	data: Data;
}