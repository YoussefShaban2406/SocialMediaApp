export interface Data {
	bookmarked: boolean;
	bookmarksCount: number;
}

export interface IBookmarkPost {
	success: boolean;
	message: string;
	data: Data;
}