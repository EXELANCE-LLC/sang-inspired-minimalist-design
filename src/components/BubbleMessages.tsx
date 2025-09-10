import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface BubbleMessageProps {
  message: string;
  tail: boolean;
  animState: 'show' | 'midground' | 'background';
}

const BubbleMessage = ({ message, tail, animState }: BubbleMessageProps) => {
  const bubbleClasses = {
    show: 'bg-lime-400 text-black text-opacity-100',
    midground: 'bg-lime-300 dark:bg-lime-600 text-opacity-50',
    background: 'bg-lime-100 dark:bg-lime-800 text-opacity-25'
  };

  const tailClasses = {
    show: 'text-lime-400',
    midground: 'text-lime-300 dark:text-lime-600',
    background: 'text-lime-100 dark:text-lime-800'
  };

  return (
    <div className={`rounded-2xl px-3 py-2 transition-all duration-150 relative ${bubbleClasses[animState]}`}>
      <AnimatePresence>
        {tail && (
          <motion.div
            className={`absolute bottom-[-2px] left-[-4px] z-[-10] w-[25px] h-[24px] ${tailClasses[animState]}`}
            exit={{ x: 5, opacity: 0, rotateY: 40 }}
          >
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
          </motion.div>
        )}
      </AnimatePresence>
      <span className="relative z-10 inline-block select-none text-lg leading-tight font-medium">
        {message}
      </span>
    </div>
  );
};

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
      <AnimatePresence>
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
              key={message}
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
                  <BubbleMessage
                    message={message}
                    tail={isLast}
                    animState={animState}
                  />
                </motion.div>
              </motion.div>
            </motion.li>
          );
        })}
      </AnimatePresence>
    </motion.ul>
  );
};

export default BubbleMessages;
