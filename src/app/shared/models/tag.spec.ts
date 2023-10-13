import { Tag } from './tag.model';

describe('Tag', () => {
  it('should create an instance', () => {
    expect(new Tag(1, "any title", "color in hex")).toBeTruthy();
  });
});
