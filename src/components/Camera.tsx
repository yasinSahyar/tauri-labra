import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

type CameraProps = {
  width: number;
  height: number;
};

const Camera = forwardRef<HTMLVideoElement, CameraProps>((props, ref) => {
  const { width, height } = props;
  const videoRef = useRef<HTMLVideoElement>(null);
  useImperativeHandle(ref, () => videoRef.current!);
  useEffect(() => {
    const setupVideoInput = async () => {
      try {
        if (videoRef.current) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              width: { ideal: width },
              height: { ideal: height },
            },
            audio: false,
          });
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current!.play();
          };
        }
      } catch (error) {
        console.error('video error', (error as Error).message);
      }
    };
    setupVideoInput();
  }, []);

  return <video ref={videoRef} width={width} height={height}></video>;
});

export default Camera;
