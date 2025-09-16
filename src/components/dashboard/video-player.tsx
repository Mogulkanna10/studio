'use client';
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Camera, PenSquare, PlayCircle } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "../ui/button";

export default function VideoPlayer() {
  const videoPlaceholder = PlaceHolderImages.find(
    (img) => img.id === "video-placeholder"
  );
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Camera Feed
        </CardTitle>
        <CardDescription>Live video from front-facing camera.</CardDescription>
      </CardHeader>
      <CardContent className="p-0 relative">
        {videoPlaceholder && (
          <Image
            src={videoPlaceholder.imageUrl}
            width={800}
            height={600}
            alt={videoPlaceholder.description}
            data-ai-hint={videoPlaceholder.imageHint}
            className="aspect-video w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <PlayCircle className="h-16 w-16 text-white/70 hover:text-white transition-colors cursor-pointer" />
        </div>
      </CardContent>
      <CardFooter className="p-3 bg-muted/50">
          <Button variant="outline" className="w-full">
              <PenSquare className="mr-2 h-4 w-4" />
              Annotate Video
          </Button>
      </CardFooter>
    </Card>
  );
}
