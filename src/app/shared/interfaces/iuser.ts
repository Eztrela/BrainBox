import { MemoryBox,Tag } from "../models";
export interface IUser {
    id: number;
    email: string;
    username: string;
    password: string;
    notifications: boolean;
    memoryBoxes: Array<MemoryBox>;
    tags: Array<Tag>;
}
