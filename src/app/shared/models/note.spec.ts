import { Note } from './note';

describe('Note', () => {
  it('should create an instance', () => {
    expect(new Note(0, 'content')).toBeTruthy();
  });
});
