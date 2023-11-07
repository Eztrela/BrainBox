import { PmemoryboxPipe } from './pmemorybox.pipe';

describe('PmemoryboxPipe', () => {
  it('create an instance', () => {
    const pipe = new PmemoryboxPipe();
    expect(pipe).toBeTruthy();
  });
});
