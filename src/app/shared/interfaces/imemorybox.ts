export interface Imemorybox {
    id: number;
    user: number;
    title: string;
    datetimeCreated: Date;
    tasks: Array<number>;
    notes: Array<number>;
    tags: Array<number>;
}
