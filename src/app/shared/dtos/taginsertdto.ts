export class TagInsertDTO {
  title: string;
  color: string;

  constructor(title: string, color: string) {
    this.title = title;
    this.color = color;
  }
}
