import { MemoryBox } from '../models';

describe('MemoryBox', () => {
  it('should create an instance', () => {
    expect(new MemoryBox(1, "any title")).toBeTruthy();
  });
});
