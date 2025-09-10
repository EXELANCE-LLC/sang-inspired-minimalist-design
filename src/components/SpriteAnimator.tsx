import { useEffect, useRef, useState, useCallback } from 'react';

interface SpriteAnimatorProps {
  sprite: string;
  width: number;
  height: number;
  scale?: number;
  direction?: 'horizontal' | 'vertical';
  shouldAnimate?: boolean;
  loop?: boolean;
  startFrame?: number;
  fps?: number;
  stopLastFrame?: boolean;
  onError?: (error: any) => void;
  onLoad?: () => void;
  onEnd?: () => void;
  frameCount?: number;
  wrapAfter?: number;
  frame?: number;
  reset?: boolean;
  className?: string;
}

const SpriteAnimator = ({
  sprite,
  width,
  height,
  scale = 1,
  direction = 'horizontal',
  shouldAnimate = true,
  loop = true,
  startFrame = 0,
  fps = 60,
  stopLastFrame = false,
  onError = () => {},
  onLoad = () => {},
  onEnd = () => {},
  frameCount,
  wrapAfter,
  frame,
  reset,
  className = ''
}: SpriteAnimatorProps) => {
  const animationRef = useRef<number>();
  const [currentFrame, setCurrentFrame] = useState(startFrame);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [totalFrames, setTotalFrames] = useState(0);

  const frameInterval = 1000 / fps;

  const loadImage = useCallback((src: string) => {
    let cancelled = false;
    
    if (!isLoading && (!isLoaded || hasError)) {
      setIsLoading(true);
      const img = new Image();
      
      img.onload = () => {
        if (!cancelled) {
          onLoad();
          setIsLoaded(true);
          setIsLoading(false);
          setTotalFrames(frameCount || Math.floor(direction === 'horizontal' ? img.width / width : img.height / height));
          setImageWidth(img.width);
          setImageHeight(img.height);
        }
      };
      
      img.onerror = (error) => {
        if (!cancelled) {
          onError(error);
          setHasError(true);
          setIsLoading(false);
        }
      };
      
      img.src = src;
    }
    
    return () => { cancelled = true; };
  }, [sprite, isLoaded, hasError, frameCount, direction, width, height, onLoad, onError, isLoading]);

  const animate = useCallback((frame: number, timestamp: number) => {
    if (!animationRef.current) {
      animationRef.current = timestamp;
    }
    
    if (shouldAnimate) {
      const elapsed = timestamp - animationRef.current;
      
      if (elapsed < frameInterval) {
        return requestAnimationFrame((ts) => animate(frame, ts));
      }
      
      animationRef.current = timestamp - (elapsed % frameInterval);
      setCurrentFrame(frame);
    } else {
      animationRef.current = 0;
    }
  }, [shouldAnimate, frameInterval]);

  const getBackgroundPosition = useCallback((frameIndex = 0) => {
    const isHorizontal = direction === 'horizontal';
    let row: number, col: number;
    
    if (typeof wrapAfter === 'undefined') {
      row = isHorizontal ? 0 : frameIndex;
      col = isHorizontal ? frameIndex : 0;
    } else {
      row = isHorizontal ? Math.floor(frameIndex / wrapAfter) : frameIndex % wrapAfter;
      col = isHorizontal ? frameIndex % wrapAfter : Math.floor(frameIndex / wrapAfter);
    }
    
    const x = (-width * col) / scale;
    const y = (-height * row) / scale;
    
    return `${x}px ${y}px`;
  }, [direction, width, height, wrapAfter, scale]);

  // Load image
  useEffect(() => {
    const cleanup = loadImage(sprite);
    return cleanup;
  }, [sprite, loadImage]);

  // Animation loop
  useEffect(() => {
    if (shouldAnimate && isLoaded) {
      const nextFrame = currentFrame + 1 >= totalFrames ? startFrame : currentFrame + 1;
      
      if (!shouldAnimate) return;
      
      if (currentFrame === totalFrames - 1 && stopLastFrame) {
        onEnd();
        return;
      }
      
      const animationId = requestAnimationFrame((timestamp) => {
        animate(nextFrame, timestamp);
      });
      
      return () => cancelAnimationFrame(animationId);
    }
  }, [shouldAnimate, totalFrames, currentFrame, startFrame, stopLastFrame, onEnd, animate, isLoaded]);

  // Reset frame
  useEffect(() => {
    setCurrentFrame(startFrame);
  }, [reset, startFrame]);

  // Manual frame control
  useEffect(() => {
    if (typeof frame === 'number' && frame !== currentFrame) {
      setCurrentFrame(frame);
    }
  }, [frame, currentFrame]);

  const style: React.CSSProperties = {
    backgroundImage: isLoaded ? `url(${sprite})` : 'none',
    backgroundPosition: isLoaded ? getBackgroundPosition(currentFrame) : 'initial',
    backgroundSize: `${imageWidth / scale}px ${imageHeight / scale}px`,
    width: `${width / scale}px`,
    height: `${height / scale}px`,
    backgroundRepeat: 'no-repeat'
  };

  return <div className={className} style={style} />;
};

export default SpriteAnimator;
