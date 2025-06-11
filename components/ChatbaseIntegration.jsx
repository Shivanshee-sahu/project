'use client';

import { useAppContext } from '@/context/AppContext';
import { useEffect, useState } from 'react';

export default function ChatbaseIntegration() {
  const { user } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      setIsOpen(false); // Close chat if user logs out
    }
  }, [user]);

  if (!user) return null;

  return (
    <>
      {/* Toggle Chat Button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 10000,
          color: 'white',
          border: 'none',
          backgroundColor:'#C71585',
          borderRadius: '9999px',
          padding: '12px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        }}
      >
        {isOpen ? 'Close Chat' : '🤖 Chat with Me'}
      </button>

      {/* Chatbase Chatbot iframe */}
      {isOpen && (
        <iframe
          src="https://www.chatbase.co/chatbot-iframe/q0V8rlUp8apPOtIveOQ0i"
          title="Chatbase Bot"
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            width: '400px',
            height: '500px',
            border: 'none',
            borderRadius: '12px',
            boxShadow: '0 0 12px rgba(0,0,0,0.2)',
            zIndex: 9999,
          }}
          allow="clipboard-write"
        />
      )}
    </>
  );
}
