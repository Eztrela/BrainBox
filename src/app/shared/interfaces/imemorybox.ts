import { Task, Note } from "../models";
import { INote } from "./inote";
import { ITask } from "./itask";
export interface Imemorybox {
  id: number;
  user: number;
  title: string;
  datetimeCreated: Date;
  tasks: Array<ITask>;
  notes: Array<INote>;
  tags: Array<number>;
}
