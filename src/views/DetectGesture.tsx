import Camera from '@/components/Camera';
import { useGestureRecognition } from '@/hooks/GestureHooks';
import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';

const DetectGesture = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { gesture, savedGesture } = useGestureRecognition(videoRef);
  const { label } = useParams();
  const navigate = useNavigate();

  console.log('detected gesture:', gesture);

  useEffect(() => {
    if (gesture === 'Pointing_Up' && savedGesture) {
      navigate('/result', {
        state: { vote: savedGesture, label },
      });
    }
  }, [gesture]);

  return (
    <>
      <section className="w-full">
        <Camera ref={videoRef} width={800} height={480} />
      </section>
      <section className="w-full">
        <div className="absolute top-24 left-0 p-4 bg-stone-900">
          <p>
            faceName: {label} &nbsp;
            {savedGesture === 'Thumb_Up' && <ThumbsUpIcon className="inline" />}
            {savedGesture === 'Thumb_Down' && (
              <ThumbsDownIcon className="inline" />
            )}
          </p>
          <p>
            {savedGesture ? (
              <p>Point up to save</p>
            ) : (
              <p>Thumb up or down to vote</p>
            )}
          </p>
        </div>
      </section>
    </>
  );
};

export default DetectGesture;