export interface User {
	_id: string;
	name: string;
	username: string;
	photo: string;
}

export interface Post {
	_id: string;
	body: string;
	image: string;
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
	posts: Post[];
}

export interface Pagination {
	currentPage: number;
	limit: number;
	total: number;
	numberOfPages: number;
	nextPage: number;
}

export interface Meta {
	feedMode: string;
	pagination: Pagination;
}

export interface IMyPostsResponse {
	success: boolean;
	message: string;
	data: Data;
	meta: Meta;
}