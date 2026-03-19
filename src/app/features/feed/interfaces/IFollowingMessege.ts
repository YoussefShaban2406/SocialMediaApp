export interface Data {
	following: boolean;
	followersCount: number;
}

export interface IFollowingMessege {
	success: boolean;
	message: string;
	data: Data;
}