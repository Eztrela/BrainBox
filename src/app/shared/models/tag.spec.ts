import { Tag } from '../models';

describe('Tag', () => {
  it('should create an instance', () => {
    expect(new Tag(1, "any title", "color in hex")).toBeTruthy();
  });
});
