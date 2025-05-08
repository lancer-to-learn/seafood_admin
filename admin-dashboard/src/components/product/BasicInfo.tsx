import { ProductData } from "../../Pages/Product/ProductEditor";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface BasicInfoProps {
  product: ProductData;
  updateProduct: (data: Partial<ProductData>) => void;
}

const BasicInfo = ({ product, updateProduct }: BasicInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>
          Enter the basic details about your motorcycle product.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Product Name</label>
            <input
              id="name"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="Enter product name"
              value={product.name}
              onChange={(e) => updateProduct({ name: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="brand" className="text-sm font-medium">Brand</label>
            <input
              id="brand"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="Enter brand name"
              value={product.brand}
              onChange={(e) => updateProduct({ brand: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="price" className="text-sm font-medium">Price</label>
            <input
              id="price"
              type="text"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="Enter price"
              value={product.price}
              onChange={(e) => updateProduct({ price: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="stock" className="text-sm font-medium">Stock</label>
            <input
              id="stock"
              type="number"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="Enter stock quantity"
              value={product.stock}
              onChange={(e) => updateProduct({ stock: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">Category</label>
            <select
              id="category"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={product.category}
              onChange={(e) => updateProduct({ category: e.target.value })}
            >
              <option value="" disabled>Select category</option>
              <option value="sport">Sport</option>
              <option value="cruiser">Cruiser</option>
              <option value="touring">Touring</option>
              <option value="adventure">Adventure</option>
              <option value="offroad">Off-road</option>
              <option value="scooter">Scooter</option>
            </select>
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">Description</label>
          <textarea
            id="description"
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter product description"
            rows={5}
            value={product.description}
            onChange={(e) => updateProduct({ description: e.target.value })}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInfo;