import React, { useState, useEffect } from 'react';

const Welcome = ({ onStart }) => {
  const [h1Text, setH1Text] = useState('');
  const [pText, setPText] = useState('');
  const [bText, setBText] = useState('');

  useEffect(() => {
    const fetchWelcomeTexts = async () => {
      try {
        const response = await fetch('/welcomeTexts.json');
        const data = await response.json();
        
        const randomH1 = data.h1[Math.floor(Math.random() * data.h1.length)];
        const randomP = data.p[Math.floor(Math.random() * data.p.length)];
        const randomB = data.button[Math.floor(Math.random() * data.p.length)];
        
        setH1Text(randomH1);
        setPText(randomP);
        setBText(randomB);
        
      } catch (error) {
        console.error('Error fetching welcome texts:', error);
      }
    };

    fetchWelcomeTexts();
  }, []);

  return (
    <div className="w-full max-w-screen-xl p-6 relative">
      <h1 className="text-yellow-500 text-4xl lg:text-5xl xl:text-6xl animate-flicker">{h1Text}</h1>
      <p className="text-gray-500 text-lg lg:text-xl xl:text-2xl mt-4">{pText}</p>
      <button
        className="bg-neutral-900 text-gray-200 p-4 rounded-lg shadow-lg hover:bg-neutral-950 mt-6 transform transition-all text-lg lg:text-xl xl:text-2xl"
        onClick={onStart}
      >
        {bText || "make a wish"}
      </button>
    </div>
  );
};

export default Welcome;
