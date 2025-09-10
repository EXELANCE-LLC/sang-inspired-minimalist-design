import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import BubbleMessages from './BubbleMessages';
import SpriteAnimator from './SpriteAnimator';
import { useLanguage } from '@/contexts/LanguageContext';

const HomePageComponent = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [messages, setMessages] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [laptopState, setLaptopState] = useState('fiddle');
  const [showGraphics, setShowGraphics] = useState(false);
  const timeoutRef = useRef(3);

  const messageQueue = [
    { timeout: 2, content: t("Hi there!") },
    { timeout: 2, content: t("My name is Bigo") },
    { timeout: 4, content: t("I'm a designer & developer based in Turkey") }
  ];

  const handleHomeGraphicLoaded = () => {
    setTimeout(() => {
      startMessageSequence();
    }, 2000);
  };

  let currentIndex = 0;

  const startMessageSequence = () => {
    if (currentIndex < messageQueue.length) {
      const message = messageQueue[currentIndex];
      addMessage(message.content);
      currentIndex++;
      setTimeout(() => {
        startMessageSequence();
      }, message.timeout * 1000);
    }
  };

  const addMessage = (content: string) => {
    setMessages(prev => 
      prev.length >= 3 
        ? [...prev.slice(1), content]
        : [...prev, content]
    );
  };

  // Laptop animation states
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
    fiddle: { 
      scaleX: [1, 1.05, 1.05, 1.05, 1], 
      scaleY: [1, 1.05, 1.05, 1.05, 1], 
      translateZ: -100 
    }
  };

  const containerVariants = {
    hide: { opacity: 0 },
    show: { opacity: 1 }
  };

  // Start animations when loaded
  useEffect(() => {
    if (isLoaded) {
      setShowGraphics(true);
    }
  }, [isLoaded]);

  // Laptop animation cycle
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
    <section className="flex overflow-hidden w-full min-h-[30rem]">
      <div className="w-full flex flex-wrap space-y-20 lg:px-48 md:px-8 px-4">
        <div className="flex-shrink-0 relative w-full flex items-center justify-center">
          <div className="flex-shrink-0 relative top-10 sm:top-0">
            
            {/* Bubble Messages */}
            {messages.length > 0 && <BubbleMessages messages={messages} />}
            
            {/* Main Graphics Container */}
            <motion.div
              initial="hide"
              animate={showGraphics ? "show" : "hide"}
              variants={containerVariants}
              transition={{ ease: "easeOut", duration: 2, delay: 0.5 }}
              className="pointer-events-none relative grid place-items-center select-none"
            >
              
              {/* Sprite Character */}
              <motion.div
                initial="off"
                animate={showGraphics ? "fiddle" : "off"}
                variants={spriteVariants}
                transition={{ ease: "easeOut", duration: 1.5 }}
                className="opacity-100"
              >
                <SpriteAnimator
                  sprite={theme === 'dark' ? "/images/face-sprite-dark.png" : "/images/face-sprite-light.png"}
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
              <div className="absolute inset-0 transform translate-y-[56%] origin-center-bottom">
                <motion.div
                  initial="closed"
                  animate={showGraphics ? laptopState : "closed"}
                  variants={laptopVariants}
                  transition={{ ease: "easeOut", duration: 1, delay: 0.5 }}
                  className="relative grid w-full place-items-center overflow-visible"
                  style={{ 
                    originY: 1, 
                    transformPerspective: 1000, 
                    scale: 0.9, 
                    translateZ: 100 
                  }}
                >
                  
                  {/* Screen Glow */}
                  <div className="absolute inset-2 bottom-1/2 overflow-visible bg-[#5cceff99] dark:bg-[#5cceff80] sang-screen-glow" />
                  
                  {/* Fidget Hand */}
                  <motion.div
                    initial="off"
                    animate={showGraphics ? "fiddle" : "off"}
                    variants={handVariants}
                    transition={{ ease: "easeOut", duration: 1.5 }}
                    className="w-[25px] h-[25px] rounded-[10px] overflow-hidden bg-[#f0d1ac] absolute"
                    style={{ 
                      translateX: 70, 
                      translateY: 28, 
                      translateZ: -1 
                    }}
                  />
                  
                  {/* Laptop Lid Image */}
                  <img
                    src="/images/laptop-lid.png"
                    width={390}
                    height={237}
                    className="z-[1] relative"
                    alt="laptop lid"
                    onLoad={() => {
                      handleHomeGraphicLoaded();
                      setIsLoaded(true);
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePageComponent;
