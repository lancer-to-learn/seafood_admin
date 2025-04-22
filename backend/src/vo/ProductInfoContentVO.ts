import ProductInfoSubContentVO from "./ProductInfoSubContentVO";

export class ProductInfoContentVO {
    title: string;
    value: ProductInfoSubContentVO[];
  
    constructor(title: string, value: ProductInfoSubContentVO[]) {
      this.title = title;
      this.value = value;
    }
  }
  