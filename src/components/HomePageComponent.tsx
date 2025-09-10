import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

// Sprite Animator Hook (Astro'dan uyarlanmış)
const useSprite = ({
  sprite,
  width,
  height,
  frameCount = 30,
  fps = 30,
  shouldAnimate = true,
  scale = 1,
  wrapAfter = 10
}: {
  sprite: string;
  width: number;
  height: number;
  frameCount?: number;
  fps?: number;
  shouldAnimate?: boolean;
  scale?: number;
  wrapAfter?: number;
}) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const intervalRef = useRef<number>();

  const interval = 1000 / fps;

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
      setImageWidth(img.width);
      setImageHeight(img.height);
    };
    img.src = sprite;
  }, [sprite]);

  useEffect(() => {
    if (shouldAnimate && imageLoaded) {
      intervalRef.current = window.setInterval(() => {
        setCurrentFrame((prev) => (prev + 1) % frameCount);
      }, interval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [shouldAnimate, imageLoaded, frameCount, interval]);

  const getBackgroundPosition = () => {
    const isHorizontal = true;
    let row: number, col: number;

    if (typeof wrapAfter === 'undefined') {
      row = isHorizontal ? 0 : currentFrame;
      col = isHorizontal ? currentFrame : 0;
    } else {
      row = isHorizontal ? Math.floor(currentFrame / wrapAfter) : currentFrame % wrapAfter;
      col = isHorizontal ? currentFrame % wrapAfter : Math.floor(currentFrame / wrapAfter);
    }

    const x = (-width * col) / scale;
    const y = (-height * row) / scale;
    return `${x}px ${y}px`;
  };

  return {
    backgroundImage: imageLoaded ? `url(${sprite})` : null,
    backgroundPosition: imageLoaded ? getBackgroundPosition() : null,
    backgroundSize: `${imageWidth / scale}px ${imageHeight / scale}px`,
    width: `${width / scale}px`,
    height: `${height / scale}px`
  };
};

// Sprite Animator Component
const SpriteAnimator = ({ sprite, width, height, scale = 1.5, frameCount = 30, wrapAfter = 10, fps = 30, shouldAnimate = true, className }: {
  sprite: string;
  width: number;
  height: number;
  scale?: number;
  frameCount?: number;
  wrapAfter?: number;
  fps?: number;
  shouldAnimate?: boolean;
  className?: string;
}) => {
  const spriteStyle = useSprite({
    sprite,
    width,
    height,
    frameCount,
    fps,
    shouldAnimate,
    scale,
    wrapAfter
  });

  return <div className={className} style={spriteStyle} />;
};

// Theme Hook
const usePreferredTheme = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'no-preference';
    const dark = window.matchMedia('(prefers-color-scheme: dark)');
    const light = window.matchMedia('(prefers-color-scheme: light)');
    return dark.matches ? 'dark' : light.matches ? 'light' : 'no-preference';
  });

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;

    const dark = window.matchMedia('(prefers-color-scheme: dark)');
    const light = window.matchMedia('(prefers-color-scheme: light)');

    const darkHandler = ({ matches }: { matches: boolean }) => {
      if (matches) setTheme('dark');
    };
    const lightHandler = ({ matches }: { matches: boolean }) => {
      if (matches) setTheme('light');
    };

    dark.addEventListener('change', darkHandler);
    light.addEventListener('change', lightHandler);

    return () => {
      dark.removeEventListener('change', darkHandler);
      light.removeEventListener('change', lightHandler);
    };
  }, []);

  return theme;
};

// Bubble Messages Component
const BubbleMessages = ({ messages }: { messages: string[] }) => {
  const moveVariants = {
    start: { opacity: 0, x: -140, y: 40 },
    show: { opacity: 1, x: 0, y: 0 },
    midground: { opacity: 1, x: 0, y: 0 },
    background: { opacity: 1, x: 0, y: 4 },
    end: { opacity: 0, y: -40 }
  };

  const scaleVariants = {
    start: { scale: 0.1 },
    show: { scale: 1 },
    midground: { scale: 0.8 },
    background: { scale: 0.6 },
    end: { scale: 0.6 }
  };

  return (
    <motion.ul
      className="absolute bottom-full left-0 flex flex-col w-full max-w-80 items-center justify-center sm:bottom-28 sm:left-52 sm:items-start sm:justify-end"
      style={{ perspective: '50rem' }}
      animate={{ translateY: -8 }}
      transition={{
        repeat: Infinity,
        duration: 8,
        repeatType: 'reverse',
        repeatDelay: 0.125,
        ease: 'linear'
      }}
    >
      {messages.map((message, index) => {
        const isLast = index === messages.length - 1;
        const states = ['show', 'midground', 'background'] as const;
        
        let animState: typeof states[number];
        if (messages.length === 1) {
          animState = states[0];
        } else if (messages.length === 2) {
          animState = index === 0 ? states[1] : states[0];
        } else {
          animState = index === 0 ? states[2] : index === 1 ? states[1] : states[0];
        }

        return (
          <motion.li
            key={`${message}-${index}`}
            className="relative mb-[-20px] w-full"
            style={{ perspective: '9cm' }}
            animate={{ translateY: -8 }}
            transition={{
              repeat: Infinity,
              duration: 1,
              repeatType: 'reverse',
              repeatDelay: 0.125,
              ease: 'easeInOut'
            }}
          >
            <motion.div
              initial="start"
              animate={animState}
              exit="end"
              variants={scaleVariants}
              transition={{
                ease: [0.83, 0.005, 0.725, 0.905],
                duration: 0.33
              }}
              className="transform-origin-bottom-left"
              layout
            >
              <motion.div
                initial="start"
                animate={animState}
                exit="end"
                variants={moveVariants}
                transition={{
                  ease: [0.83, 0.005, 0.725, 0.905],
                  duration: 0.33
                }}
                className="flex w-full transform-origin-bottom-left list-none items-center justify-center sm:items-start sm:justify-start"
                layout
              >
                <div className={`rounded-2xl px-3 py-2 transition-all duration-150 relative ${
                  animState === 'show' ? 'bg-lime-400 text-black text-opacity-100' :
                  animState === 'midground' ? 'bg-lime-300 dark:bg-lime-600 text-opacity-50' :
                  'bg-lime-100 dark:bg-lime-800 text-opacity-25'
                }`}>
                  {isLast && (
                    <div className={`absolute bottom-[-2px] left-[-4px] z-[-10] w-[25px] h-[24px] ${
                      animState === 'show' ? 'text-lime-400' :
                      animState === 'midground' ? 'text-lime-300 dark:text-lime-600' :
                      'text-lime-100 dark:text-lime-800'
                    }`}>
                      <svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.0911 19.9565C0.712776 19.5337 1.18628 18.7884 1.7501 18.7248C3.18873 18.5625 4.7241 17.7495 6.18173 16.6732C11.2624 12.922 12.931 6.31547 12.931 0V0L25 20.323V20.323C18.3108 20.323 11.3179 24.7014 4.96602 22.604C3.65683 22.1717 2.33634 21.3483 1.0911 19.9565Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  )}
                  <span className="relative z-10 inline-block select-none text-lg leading-tight font-medium">
                    {message}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.li>
        );
      })}
    </motion.ul>
  );
};

// Laptop Animation Component
const LaptopGraphic = ({ onLoad }: { onLoad: () => void }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [laptopState, setLaptopState] = useState('fiddle');
  const timeoutRef = useRef(3);
  const theme = usePreferredTheme();

  const duration = 1;
  const delay = 0.5;
  const scale = 1.05;

  const visibilityVariants = {
    hide: { opacity: 0 },
    show: { opacity: 1 }
  };

  const laptopVariants = {
    closed: { rotateX: 0 },
    fiddle: { rotateX: -30 },
    foddle: { rotateX: -15 },
    fuddle: { rotateX: -40 },
    open: { rotateX: -35 }
  };

  const handVariants = {
    off: { translateY: 28 },
    fiddle: { translateY: [28, 20, 20, 20, 28] }
  };

  const spriteVariants = {
    off: { scaleX: 1, scaleY: 1, translateZ: -100 },
    fiddle: { scaleX: [1, scale, scale, scale, 1], scaleY: [1, scale, scale, scale, 1], translateZ: -100 }
  };

  useEffect(() => {
    if (isLoaded) {
      // Laptop animation başlat
    }
  }, [isLoaded]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      switch (laptopState) {
        case 'fiddle':
          setLaptopState('foddle');
          timeoutRef.current = 6;
          break;
        case 'foddle':
          setLaptopState('fuddle');
          timeoutRef.current = 8;
          break;
        case 'fuddle':
          setLaptopState('fiddle');
          timeoutRef.current = 5;
          break;
      }
    }, timeoutRef.current * 1000);

    return () => clearTimeout(timeout);
  }, [laptopState]);

  return (
    <motion.div
      initial="hide"
      animate="show"
      variants={visibilityVariants}
      transition={{ ease: 'easeOut', duration: 2, delay: 0.5 }}
      className="pointer-events-none relative grid place-items-center select-none"
    >
      {/* Character Sprite */}
      <motion.div
        initial="off"
        animate="fiddle"
        variants={spriteVariants}
        transition={{ ease: 'easeOut', duration: duration + delay * 2 }}
        className="opacity-100"
      >
        <SpriteAnimator
          sprite={theme === 'dark' ? '/images/face-sprite-dark.png' : '/images/face-sprite-light.png'}
          width={360}
          height={360}
          scale={1.5}
          frameCount={30}
          wrapAfter={10}
          fps={30}
          shouldAnimate={true}
          className="w-full overflow-hidden rounded-full"
        />
      </motion.div>

      {/* Laptop Container */}
      <div className="absolute inset-0 transform translate-y-[56%]" style={{ perspectiveOrigin: 'center bottom' }}>
        <motion.div
          initial="closed"
          animate={isLoaded ? 'open' : 'closed'}
          variants={laptopVariants}
          transition={{ ease: 'easeOut', duration: duration, delay: delay }}
          className="relative grid w-full place-items-center overflow-visible"
          style={{ 
            originY: 1, 
            transformPerspective: 1000, 
            scale: 0.9, 
            translateZ: 100 
          }}
        >
          {/* Screen Glow */}
          <div 
            className="absolute inset-2 bottom-1/2 overflow-visible bg-[#5cceff99] dark:bg-[#5cceff80]"
            style={{
              '--lightBloom': '24px',
              animation: 'sangFilterAnimation 8s infinite'
            } as React.CSSProperties}
          />

          {/* Fidget Hand */}
          <motion.div
            className="absolute w-6 h-6 rounded-[10px] overflow-hidden bg-[#f0d1ac]"
            initial="off"
            animate="fiddle"
            variants={handVariants}
            transition={{ ease: 'easeOut', duration: duration + delay * 2 }}
            style={{ 
              translateX: 70, 
              translateY: 28, 
              translateZ: -1 
            }}
          />

          {/* Laptop Image */}
          <img
            src="/images/laptop-lid.png"
            width={390}
            height={237}
            className="z-10 relative"
            alt="laptop lid"
            onLoad={() => {
              onLoad();
              setIsLoaded(true);
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

// Main HomePageComponent
const HomePageComponent = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<string[]>([]);
  const clickCountRef = useRef(2);

  const messageSequence = [
    { timeout: 2, content: t("Hi there!") },
    { timeout: 2, content: t("My name is Bigo") },
    { timeout: 4, content: t("I'm a designer & developer based in Turkey") }
  ];

  const handleHomeGraphicLoaded = () => {
    setTimeout(() => {
      startMessageSequence(messageSequence);
    }, 2000);
  };

  let messageIndex = 0;

  const startMessageSequence = (sequence: typeof messageSequence) => {
    if (messageIndex < sequence.length) {
      const currentMessage = sequence[messageIndex];
      addMessage(currentMessage.content);
      messageIndex++;
      setTimeout(() => {
        startMessageSequence(sequence);
      }, currentMessage.timeout * 1000);
    }
  };

  const addMessage = (message: string) => {
    setMessages(prev => {
      const newMessages = prev.length >= 3 ? [...prev.slice(1), message] : [...prev, message];
      return newMessages;
    });
  };

  return (
    <section className="flex overflow-hidden w-full min-h-[30rem]">
      <div className="w-full flex flex-wrap space-y-20 lg:px-48 md:px-8 px-4">
        <div className="flex-shrink-0 relative w-full flex items-center justify-center">
          <div 
            className="flex-shrink-0 relative top-10 sm:top-0"
            onClick={() => {
              clickCountRef.current = clickCountRef.current + 1;
            }}
          >
            <BubbleMessages messages={messages} />
            <LaptopGraphic onLoad={handleHomeGraphicLoaded} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePageComponent;
