export class ProductSpecificVO {
  name?: string;
  category?: string;
  price?: number;
  description?: string;
  weight?: number;
  height?: number;
  width?: number;
  long?: number;
  wheelbase?: number;
  saddleHeight?: number;
  groundClearance?: number;
  fuelTankCapacity?: number;
  frontTireSize?: string;
  backTireSize?: string;
  frontFork?: string;
  backFork?: string;
  engineType?: string;
  maxCapacity?: string;
  engineOilCapacity?: string;
  fuelConsumption?: string;
  startingSystem?: string;
  maxMoment?: string;
  xilanhCapacity?: string;
  pistonDiameterXStroke?: string;
  compressionRatio?: string;
  transmissionType?: string;
  trunkCapacity?: string;
  maxSpeed?: string;
  pinType?: string;
  voltage?: string;
  chargeTime?: string;
  brake?: string;
  energyConsumption?: string;
  travelDistance?: string;
  gear?: string;
  enginePower?: string;

  constructor(data: Partial<ProductSpecificVO>) {
    Object.assign(this, data);
  }

  toJSON() {
    return { ...this };
  }

  static fromJSON(data: any): ProductSpecificVO {
    return new ProductSpecificVO(data);
  }
}
