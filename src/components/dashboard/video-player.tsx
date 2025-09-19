'use client';
import { useEffect, useRef, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Camera, PenSquare, VideoOff, AlertTriangle, Wand2, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Badge } from '../ui/badge';
import { classifyRailDefect, ClassifyRailDefectOutput } from '@/ai/flows/classify-rail-defect';
import { Separator } from '../ui/separator';

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const { toast } = useToast();
  const [isClassifying, setIsClassifying] = useState(false);
  const [classificationResult, setClassificationResult] = useState<ClassifyRailDefectOutput | null>(null);


  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setHasCameraPermission(false);
        toast({
          variant: "destructive",
          title: "Camera Not Supported",
          description: "Your browser does not support camera access.",
        });
        return;
      }
      
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        setHasCameraPermission(false);
        toast({
          variant: "destructive",
          title: "Camera Access Denied",
          description: "Please enable camera permissions in your browser settings to use this app.",
        });
      }
    };

    getCameraPermission();
    
    // Cleanup function to stop video stream
    return () => {
        if(videoRef.current && videoRef.current.srcObject){
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [toast]);

  const handleAnnotateAndClassify = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    setIsClassifying(true);
    setClassificationResult(null);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    if(!context) return;
    
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataUri = canvas.toDataURL('image/jpeg');

    try {
      const result = await classifyRailDefect({ imageDataUri });
      setClassificationResult(result);
      toast({
          title: `Classification: ${result.defectType}`,
          description: `Confidence: ${(result.confidence * 100).toFixed(1)}%`
      });
    } catch(error) {
        console.error("Classification failed:", error);
        toast({
            title: "Classification Failed",
            description: "Could not analyze the video frame.",
            variant: "destructive"
        });
    }

    setIsClassifying(false);
  }


  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1.5">
            <CardTitle className="text-lg flex items-center gap-2">
                <PenSquare className="h-5 w-5 text-primary" />
                Video Annotation Tool
            </CardTitle>
            <CardDescription>Capture a frame and classify defects using AI.</CardDescription>
        </div>
         {hasCameraPermission === true && <Badge variant="secondary" className="border-green-500/50 text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/50">Live</Badge>}
         {hasCameraPermission === false && <Badge variant="destructive">Offline</Badge>}
      </CardHeader>
      <CardContent className="p-0 relative aspect-video bg-muted flex items-center justify-center">
        <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
        {hasCameraPermission === false && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 p-4 text-center">
            <VideoOff className="h-12 w-12 text-muted-foreground" />
            <p className="mt-2 font-semibold">Camera feed is not available.</p>
            <p className="text-sm text-muted-foreground">Please check permissions and refresh.</p>
          </div>
        )}
         {hasCameraPermission === null && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 p-4 text-center">
             <Camera className="h-12 w-12 text-muted-foreground animate-pulse" />
            <p className="mt-2 font-semibold">Accessing Camera...</p>
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4 p-4">
          <Button onClick={handleAnnotateAndClassify} className="w-full" disabled={!hasCameraPermission || isClassifying}>
              {isClassifying ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
              )}
              Capture & Classify Defect
          </Button>

          {classificationResult && (
              <>
                <Separator />
                <Alert>
                    <Wand2 className="h-4 w-4" />
                    <AlertTitle>Classification Complete</AlertTitle>
                    <AlertDescription className="mt-2 space-y-2">
                        <p><strong>Defect Type:</strong> {classificationResult.defectType}</p>
                        <p><strong>Confidence:</strong> {(classificationResult.confidence * 100).toFixed(1)}%</p>
                        <p><strong>Assessment:</strong> {classificationResult.assessment}</p>
                    </AlertDescription>
                </Alert>
              </>
          )}

          {hasCameraPermission === false && (
              <Alert variant="destructive" className="w-full">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Camera Access Required</AlertTitle>
                  <AlertDescription>
                    Please allow camera access in your browser settings to use this feature.
                  </AlertDescription>
              </Alert>
          )}
      </CardFooter>
    </Card>
  );
}
