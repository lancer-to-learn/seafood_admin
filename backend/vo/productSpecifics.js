class ProductSpecifics {
    constructor() {
        // Empty constructor
    }

    initialize({
        name, category, price, description, weight, height, width, long, wheelbase, saddleHeight,
        groundClearance, fuelTankCapacity, frontTireSize, backTireSize, frontFork, backFork,
        engineType, maxCapacity, engineOilCapacity, fuelConsumption, startingSystem, maxMoment,
        xilanhCapacity, pistonDiameterXStroke, compressionRatio, transmissionType, trunkCapacity,
        maxSpeed, pinType, voltage, chargeTime, brake, energyConsumption, travelDistance, gear,
        enginePower
    }) {
        this.name = name;
        this.category = category;
        this.price = price;
        this.description = description;
        this.weight = weight;
        this.height = height;
        this.width = width;
        this.long = long;
        this.wheelbase = wheelbase;
        this.saddleHeight = saddleHeight;
        this.groundClearance = groundClearance;
        this.fuelTankCapacity = fuelTankCapacity;
        this.frontTireSize = frontTireSize;
        this.backTireSize = backTireSize;
        this.frontFork = frontFork;
        this.backFork = backFork;
        this.engineType = engineType;
        this.maxCapacity = maxCapacity;
        this.engineOilCapacity = engineOilCapacity;
        this.fuelConsumption = fuelConsumption;
        this.startingSystem = startingSystem;
        this.maxMoment = maxMoment;
        this.xilanhCapacity = xilanhCapacity;
        this.pistonDiameterXStroke = pistonDiameterXStroke;
        this.compressionRatio = compressionRatio;
        this.transmissionType = transmissionType;
        this.trunkCapacity = trunkCapacity;
        this.maxSpeed = maxSpeed;
        this.pinType = pinType;
        this.voltage = voltage;
        this.chargeTime = chargeTime;
        this.brake = brake;
        this.energyConsumption = energyConsumption;
        this.travelDistance = travelDistance;
        this.gear = gear;
        this.enginePower = enginePower;
    }

    getDetails() {
        return {
            name: this.name,
            category: this.category,
            price: this.price,
            description: this.description,
            weight: this.weight,
            height: this.height,
            width: this.width,
            long: this.long,
            wheelbase: this.wheelbase,
            saddleHeight: this.saddleHeight,
            groundClearance: this.groundClearance,
            fuelTankCapacity: this.fuelTankCapacity,
            frontTireSize: this.frontTireSize,
            backTireSize: this.backTireSize,
            frontFork: this.frontFork,
            backFork: this.backFork,
            engineType: this.engineType,
            maxCapacity: this.maxCapacity,
            engineOilCapacity: this.engineOilCapacity,
            fuelConsumption: this.fuelConsumption,
            startingSystem: this.startingSystem,
            maxMoment: this.maxMoment,
            xilanhCapacity: this.xilanhCapacity,
            pistonDiameterXStroke: this.pistonDiameterXStroke,
            compressionRatio: this.compressionRatio,
            transmissionType: this.transmissionType,
            trunkCapacity: this.trunkCapacity,
            maxSpeed: this.maxSpeed,
            pinType: this.pinType,
            voltage: this.voltage,
            chargeTime: this.chargeTime,
            brake: this.brake,
            energyConsumption: this.energyConsumption,
            travelDistance: this.travelDistance,
            gear: this.gear,
            enginePower: this.enginePower,
        };
    }

    updateDetails(details) {
        Object.keys(details).forEach(key => {
            if (details[key] !== undefined) {
                this[key] = details[key];
            }
        });
    }
}

module.exports = ProductSpecifics;