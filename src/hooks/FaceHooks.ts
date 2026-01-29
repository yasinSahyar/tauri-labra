import { RefObject, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import randomstring from '@/lib/randomstring';

type DetectionResult = faceapi.WithFaceDescriptor<
  faceapi.WithFaceLandmarks<
    {
      detection: faceapi.FaceDetection;
    },
    faceapi.FaceLandmarks68
  >
>;

const useFaceDetection = () => {
  const [detectionResult, setDetectionResult] =
    useState<DetectionResult | null>(null);

  // naaman mätsäys
  const matchFace = async (
    currentFace: Float32Array,
    facesFromDB: Float32Array[],
  ) => {
    if (facesFromDB && facesFromDB.length > 0) {
      const faceMatcher = new faceapi.FaceMatcher(
        facesFromDB.map((descriptor) => {
          return faceapi.LabeledFaceDescriptors.fromJSON(descriptor);
        }),
      );
      return faceMatcher.matchDescriptor(currentFace);
    }
  };

  // Detect face from video frames
  const getDescriptors = async (videoRef: RefObject<HTMLVideoElement>) => {
    if (videoRef.current) {
      try {
        if (!videoRef.current) {
          return;
        }
        const result = await faceapi
          .detectSingleFace(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions(),
          )
          .withFaceLandmarks(true)
          .withFaceDescriptor();

        if (!result) {
          console.error('No face detected');
          return;
        }

        console.log('result', result);

        setDetectionResult(result); // Update detection state

        const faceName = randomstring(6);
        const labeledFace = new faceapi.LabeledFaceDescriptors(faceName, [
          result.descriptor,
        ]);

        return labeledFace;
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    // Load the face detection models
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        await faceapi.nets.faceLandmark68TinyNet.loadFromUri('/models');
        await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
        console.log('Models loaded');
      } catch (error) {
        console.error('Error loading models:', error);
      }
    };

    loadModels();
  }, []);

  return { detectionResult, getDescriptors, matchFace };
};

export { useFaceDetection };
