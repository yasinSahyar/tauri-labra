import { useEffect, useRef, useState } from 'react';
import { GestureRecognizer, FilesetResolver } from '@mediapipe/tasks-vision';

const useGestureRecognition = (
  videoRef: React.RefObject<HTMLVideoElement | null>,
) => {
  const [gesture, setGesture] = useState<string>('');
  const [savedGesture, setSavedGesture] = useState<string>('');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null); // Timer for frame processing

  useEffect(() => {
    let gestureRecognizer: GestureRecognizer | null = null;

    // Initialize the GestureRecognizer
    const initializeGestureRecognizer = async () => {
      try {
        const filesetResolver = await FilesetResolver.forVisionTasks('/wasm');
        gestureRecognizer = await GestureRecognizer.createFromOptions(
          filesetResolver,
          {
            baseOptions: {
              modelAssetPath: '/models/gesture_recognizer.task',
              delegate: 'GPU',
            },
            runningMode: 'VIDEO',
            numHands: 1,
          },
        );
      } catch (error) {
        console.error('Error initializing GestureRecognizer:', error);
      }
    };

    // Process video frames for gesture detection
    const processVideoFrames = async () => {
      try {
        if (videoRef && videoRef.current && gestureRecognizer) {
          const nowInMs = Date.now();
          const results = gestureRecognizer.recognizeForVideo(
            videoRef.current,
            nowInMs,
          );

          results.gestures.forEach((gestureGroup) => {
            gestureGroup.forEach((gestureResult) => {
              const currentGesture = gestureResult.categoryName;
              console.log('testi', currentGesture, gesture);
              if (currentGesture !== 'None') {
                if (
                  currentGesture === 'Thumb_Up' ||
                  currentGesture === 'Thumb_Down'
                ) {
                  setGesture(currentGesture);
                  setSavedGesture(currentGesture);
                } else if (currentGesture !== gesture) {
                  setGesture(currentGesture);
                }
              }
            });
          });
        }
      } catch (error) {
        setGesture('processVideoFrames error: ' + (error as Error).message);
      } finally {
        if (timer.current) {
          clearTimeout(timer.current);
          timer.current = setTimeout(processVideoFrames, 100); // Process frames periodically
        }
      }
    };

    // Main initialization function
    const main = async () => {
      if (videoRef) {
        try {
          if (!videoRef.current) return;

          // Wait for the video element to be ready
          await new Promise<void>((resolve) => {
            if (videoRef && videoRef.current) {
              if (videoRef.current.readyState >= 2) resolve();
              else videoRef.current.oncanplay = () => resolve();
            }
          });

          await initializeGestureRecognizer();
          timer.current = setTimeout(processVideoFrames, 100); // Start processing frames
        } catch (error) {
          console.error('Error in main initialization:', error);
        }
      }
    };

    main();

    // Cleanup on unmount
    return () => {
      if (gestureRecognizer) {
        gestureRecognizer.close();
        gestureRecognizer = null;
      }
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return { gesture, savedGesture };
};

export { useGestureRecognition };