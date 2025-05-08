import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductData } from "../../Pages/Product/ProductEditor";

interface SpecificationsProps {
  specifications: ProductData["specifications"];
  updateSpecifications: (data: Partial<ProductData["specifications"]>) => void;
}

const Specifications = ({ specifications, updateSpecifications }: SpecificationsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Specifications</CardTitle>
        <CardDescription>
          Enter the technical specifications for this motorcycle product.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="engineType" className="text-sm font-medium">Engine Type</label>
            <input
              id="engineType"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="e.g. 4-stroke, liquid cooled"
              value={specifications.engineType}
              onChange={(e) => updateSpecifications({ engineType: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="displacement" className="text-sm font-medium">Displacement (cc)</label>
            <input
              id="displacement"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="e.g. 998cc"
              value={specifications.displacement}
              onChange={(e) => updateSpecifications({ displacement: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="power" className="text-sm font-medium">Power Output</label>
            <input
              id="power"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="e.g. 150 HP @ 10,000 rpm"
              value={specifications.power}
              onChange={(e) => updateSpecifications({ power: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="torque" className="text-sm font-medium">Torque</label>
            <input
              id="torque"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="e.g. 112 Nm @ 9,000 rpm"
              value={specifications.torque}
              onChange={(e) => updateSpecifications({ torque: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="transmission" className="text-sm font-medium">Transmission</label>
            <input
              id="transmission"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="e.g. 6-speed manual"
              value={specifications.transmission}
              onChange={(e) => updateSpecifications({ transmission: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="fuelCapacity" className="text-sm font-medium">Fuel Capacity</label>
            <input
              id="fuelCapacity"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="e.g. 16 liters"
              value={specifications.fuelCapacity}
              onChange={(e) => updateSpecifications({ fuelCapacity: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="weight" className="text-sm font-medium">Weight</label>
            <input
              id="weight"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="e.g. 210 kg"
              value={specifications.weight}
              onChange={(e) => updateSpecifications({ weight: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="seatHeight" className="text-sm font-medium">Seat Height</label>
            <input
              id="seatHeight"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="e.g. 820 mm"
              value={specifications.seatHeight}
              onChange={(e) => updateSpecifications({ seatHeight: e.target.value })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Specifications;
