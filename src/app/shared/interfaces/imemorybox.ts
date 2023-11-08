import { User, Tag, Task, Note } from "../models";
export interface Imemorybox {
  id: number;
  user: User;
  title: string;
  datetimeCreated: Date;
  tasks: Array<Task>;
  notes: Array<Note>;
  tags: Array<Tag>;
}
