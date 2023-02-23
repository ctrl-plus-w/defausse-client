export enum NotificationStatus {
	ERROR,
	SUCCESS,
	WARNING,
	INFO,
}

export interface INotification {
	id: number;
	name: string;
	description: string;

	status: NotificationStatus;
}
