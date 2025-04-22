import { ProductColorVO } from "./ProductColorVO";
import { ProductInfoContentVO } from "./ProductInfoContentVO";
import { ProductSpecificVO } from "./ProductSpecifics";

export class ProductInfoVO {
  colors: ProductColorVO[];
  productInfoContent: ProductInfoContentVO[];
  productSpecifics: ProductSpecificVO[]; // Thêm thuộc tính này nếu cần

  constructor(
    colors: ProductColorVO[] = [],
    productInfoContent: ProductInfoContentVO[] = [],
    productSpecifics: ProductSpecificVO[] = []
  ) {
    this.colors = colors;
    this.productInfoContent = productInfoContent;
    this.productSpecifics = productSpecifics; 
  }

  toJSON() {
    return {
      colors: this.colors,
      productInfoContent: this.productInfoContent,
      productSpecifics: this.productSpecifics,
    };
  }

  static fromJSON(data: any): ProductInfoVO {
    const colors = (data.colors || []).map(
      (c: any) => new ProductColorVO(c.name, c.hexCode)
    );
    const content = (data.productInfoContent || []).map(
      (i: any) => new ProductInfoContentVO(i.label, i.value)
    );
    const specifics = (data.productSpecifics || []).map(
      (i: any) => new ProductSpecificVO(i)
    );
    return new ProductInfoVO(colors, content, specifics);
  }
}
