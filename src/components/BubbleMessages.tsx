import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BubbleMessage {
  id: number;
  content: string;
  timeout: number;
  animState: 'show' | 'midground' | 'background';
}

const BubbleMessages = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<BubbleMessage[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const messageQueue = [
    { timeout: 2000, content: t("Hi there!") },
    { timeout: 2000, content: t("My name is Bigo") },
    { timeout: 4000, content: t("I'm a designer & developer based in Turkey") }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      startMessageSequence();
    }, 3000); // 3 saniye sonra başla

    return () => clearTimeout(timer);
  }, []);

  const startMessageSequence = () => {
    if (currentMessageIndex < messageQueue.length) {
      const newMessage: BubbleMessage = {
        id: Date.now() + currentMessageIndex,
        content: messageQueue[currentMessageIndex].content,
        timeout: messageQueue[currentMessageIndex].timeout,
        animState: 'show'
      };

      setMessages(prev => {
        const updatedMessages = prev.map((msg, index) => ({
          ...msg,
          animState: index === prev.length - 1 ? 'midground' : 'background'
        })) as BubbleMessage[];

        const newMessages = [...updatedMessages, newMessage];
        
        // Maximum 3 mesaj tutuyoruz
        if (newMessages.length > 3) {
          return newMessages.slice(1);
        }
        return newMessages;
      });

      setCurrentMessageIndex(prev => prev + 1);

      setTimeout(() => {
        startMessageSequence();
      }, messageQueue[currentMessageIndex].timeout);
    }
  };

  const BubbleTail = () => (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="sang-bubble-tail"
    >
      <path
        d="M1.0911 19.9565C0.712776 19.5337 1.18628 18.7884 1.7501 18.7248C3.18873 18.5625 4.7241 17.7495 6.18173 16.6732C11.2624 12.922 12.931 6.31547 12.931 0V0L25 20.323V20.323C18.3108 20.323 11.3179 24.7014 4.96602 22.604C3.65683 22.1717 2.33634 21.3483 1.0911 19.9565Z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <div className="sang-bubble-container">
      {messages.map((message, index) => {
        const isLast = index === messages.length - 1;
        
        return (
          <div key={message.id} className="sang-bubble-message-anim-wrapper">
            <div className="sang-bubble-scale-wrapper">
              <div className="sang-bubble-transform-wrapper">
                <div 
                  className={`sang-bubble ${
                    message.animState === 'show' ? 'opacity-100 text-black bg-lime-400' :
                    message.animState === 'midground' ? 'opacity-50 text-black bg-lime-300 dark:bg-lime-600' :
                    'opacity-25 text-black bg-lime-100 dark:bg-lime-800'
                  }`}
                  style={{
                    transform: `scale(${
                      message.animState === 'show' ? 1 : 
                      message.animState === 'midground' ? 0.8 : 0.6
                    })`,
                    transition: 'all 0.33s cubic-bezier(0.83, 0.005, 0.725, 0.905)'
                  }}
                >
                  {isLast && <BubbleTail />}
                  <span className="sang-bubble-text">
                    {message.content}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BubbleMessages;
