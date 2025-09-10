import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import BubbleMessages from './BubbleMessages';
import SpriteAnimator from './SpriteAnimator';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const HomePageComponent = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [messages, setMessages] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showGraphics, setShowGraphics] = useState(false);

  useEffect(() => {
    // Start with a simple test message after component mounts
    setTimeout(() => {
      setMessages([t("Hi there!")]);
      setShowGraphics(true);
      setIsLoaded(true);
    }, 1000);
  }, [t]);

  const containerVariants = {
    hide: { opacity: 0 },
    show: { opacity: 1 }
  };

  return (
    <section className="flex overflow-hidden w-full min-h-[30rem]">
      <div className="w-full flex flex-wrap space-y-20 lg:px-48 md:px-8 px-4">
        <div className="flex-shrink-0 relative w-full flex items-center justify-center">
          <div className="flex-shrink-0 relative top-10 sm:top-0">
            
            {/* Test: Simple content */}
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">HomePageComponent Loaded!</h2>
              
              {/* Bubble Messages */}
              {messages.length > 0 && (
                <div className="mb-8">
                  <BubbleMessages messages={messages} />
                </div>
              )}
              
              {/* Simple animated container */}
              <motion.div
                initial="hide"
                animate={showGraphics ? "show" : "hide"}
                variants={containerVariants}
                transition={{ ease: "easeOut", duration: 1 }}
                className="relative grid place-items-center"
              >
                <div className="w-64 h-64 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">Animation Test</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePageComponent;
