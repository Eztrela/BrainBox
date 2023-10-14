import { Task } from './task.model';

describe('Task', () => {
  it('should create an instance', () => {
    expect(new Task(1, "Title", "Desciption", "Status", new Date(), 5)).toBeTruthy();
  });
});
