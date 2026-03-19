export interface Recipient {
	_id: string;
	name: string;
	photo: string;
}

export interface Actor {
	_id: string;
	name: string;
	photo: string;
}

export interface Entity {
	_id: string;
	body: string;
	image: string;
	user: string;
	commentsCount: number;
	topComment?: any;
	sharesCount: number;
	likesCount: number;
	isShare: boolean;
	id: string;
}

export interface Notification {
	_id: string;
	recipient: Recipient;
	actor: Actor;
	type: string;
	entityType: string;
	entityId: string;
	isRead: boolean;
	createdAt: string;
	entity: Entity;
}

export interface Data {
	notifications: Notification[];
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

export interface IAllNotifications {
	success: boolean;
	message: string;
	data: Data;
	meta: Meta;
}