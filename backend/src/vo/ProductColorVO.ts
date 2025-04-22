export class ProductColorVO {
  name: string;
  hexCode?: string; // Có thể undefined nếu không có mã màu

  constructor(name: string, hexCode?: string) {
    this.name = name;
    this.hexCode = hexCode;
  }
}
