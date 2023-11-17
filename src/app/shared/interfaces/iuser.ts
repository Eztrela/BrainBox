export interface IUser {
    id: number;
    email: string;
    username: string;
    password: string;
    notifications: boolean;
    memoryBoxes: Array<number>;
    tags: Array<number>;
}
