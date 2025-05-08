import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductData } from "../../Pages/Product/ProductEditor";
import { toast } from "sonner";
import { Image, Plus, Upload, X } from "lucide-react";
import React from "react";

interface MediaUploadProps {
  media: ProductData["media"];
  updateMedia: (media: ProductData["media"]) => void;
}

const MediaUpload = ({ media, updateMedia }: MediaUploadProps) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const newMedia: ProductData["media"] = [];
    
    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        toast.error("Only image and video files are supported");
        return;
      }
      
      const fileUrl = URL.createObjectURL(file);
      const fileType = file.type.startsWith('image/') ? 'image' : 'video';
      
      newMedia.push({
        id: crypto.randomUUID(),
        url: fileUrl,
        type: fileType as "image" | "video",
      });
    });
    
    if (newMedia.length > 0) {
      updateMedia([...media, ...newMedia]);
      toast.success(`${newMedia.length} file(s) uploaded successfully`);
    }
  };

  const removeMedia = (id: string) => {
    const newMedia = media.filter(item => item.id !== id);
    updateMedia(newMedia);
    toast.success("Media removed successfully");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Media Upload</CardTitle>
        <CardDescription>
          Upload images and videos of your motorcycle product. Drag and drop files or click to browse.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-10 text-center mb-6 transition-colors ${
            dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <Upload className="h-10 w-10 text-gray-400" />
            <div className="space-y-2">
              <p className="text-lg font-medium">Drag and drop files here</p>
              <p className="text-sm text-gray-500">Supported formats: JPG, PNG, GIF, MP4, WebM</p>
              <p className="text-sm text-gray-500">Maximum file size: 10MB</p>
            </div>
            <label htmlFor="fileUpload" className="cursor-pointer">
              <button 
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                <Plus className="mr-2 h-4 w-4" />
                Browse Files
              </button>
              <input 
                id="fileUpload"
                type="file" 
                multiple
                accept="image/*,video/*"
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>

        {media.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-medium">Uploaded Media ({media.length})</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {media.map((item) => (
                <div key={item.id} className="relative group">
                  <div className="aspect-square rounded-lg border overflow-hidden bg-gray-100 flex items-center justify-center">
                    {item.type === "image" ? (
                      <img src={item.url} alt="Product" className="object-cover w-full h-full" />
                    ) : (
                      <div className="relative w-full h-full">
                        <video src={item.url} className="object-cover w-full h-full" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Image className="h-10 w-10 text-gray-400" />
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-destructive text-destructive-foreground hover:bg-destructive/90 inline-flex items-center justify-center h-8 w-8 rounded-md"
                    onClick={() => removeMedia(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MediaUpload;