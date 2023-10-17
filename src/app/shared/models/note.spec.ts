import { Note } from '../models';

describe('Note', () => {
  it('should create an instance', () => {
    expect(new Note(0, 'content')).toBeTruthy();
  });
});
