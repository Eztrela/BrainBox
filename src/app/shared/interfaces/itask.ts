import { Tag } from "../models";

export interface ITask {
  id: number;
  title: string;
  description: string;
  status: string;
  datetimeCreated: Date;
  datetimeDue: Date;
  priority: number;
  tags: Array<Tag>;
}
