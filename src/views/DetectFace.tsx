import Camera from '@/components/Camera';
import { useFaceDetection } from '@/hooks/FaceHooks';
import { useStore } from '@/stores/DBStore';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

const DetectFace: React.FC = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { detectionResult, getDescriptors, matchFace } = useFaceDetection();
  const { faces } = useStore();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    const detectFace = async () => {
      try {
        const labeledFace = await getDescriptors(
          videoRef as React.RefObject<HTMLVideoElement>,
        ); // Start detecting faces

        // faces to DB
        if (labeledFace) {
          // 1. naama
          if (faces.length === 0) {
            navigate('/detected', { state: labeledFace.toJSON() });
            return;
          }

          // löytyykö naamaa jo kannasta
          const match = await matchFace(labeledFace.descriptors[0], faces);
          console.log('mätsi', match);

          const THRESHOLD = 0.4;
          if (match && match.distance > THRESHOLD) {
            // uusi naama
            navigate('/detected', { state: labeledFace.toJSON() });
            return;
          }
        }

        timer = setTimeout(detectFace, 100); // Schedule the next detection
      } catch (error) {}
    };

    // Initialize the video feed and start detection
    const startDetection = async () => {
      try {
        if (videoRef.current) {
          // Wait for the video element to be ready
          await new Promise<void>((resolve) => {
            if (videoRef.current!.readyState >= 2) {
              console.log('first');
              resolve();
            } else {
              videoRef.current!.oncanplay = () => {
                console.log('secoind');
                resolve();
              };
            }
          });
          detectFace(); // Start the detection loop
        }
      } catch (error) {
        console.error('Error initializing video feed:', error);
      }
    };

    startDetection();

    // Cleanup on unmount
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  console.log('descriptors', detectionResult);

  return (
    <div>
      <Camera ref={videoRef} width={800} height={480} />
      {detectionResult?.detection && (
        <div
          style={{
            position: 'absolute',
            top: detectionResult.detection.box.y,
            left: detectionResult.detection.box.x,
            width: detectionResult.detection.box.width,
            height: detectionResult.detection.box.height,
            border: '2px solid red',
            pointerEvents: 'none',
          }}
        ></div>
      )}
    </div>
  );
};

export default DetectFace;