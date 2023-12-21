import {Task} from "../models";

export interface TaskEvent {
  task: Task;
  idBox: string;
  color: string;
}
