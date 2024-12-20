import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WishInput = () => {
  const [wish, setWish] = useState('');
  const [result, setResult] = useState('');
  const [wishCount, setWishCount] = useState(0);
  const [placeholderText, setPlaceholderText] = useState('');
  const [h2Text, setH2Text] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [muttonText, setMuttonText] = useState('');

  useEffect(() => {
    const fetchTexts = async () => {
      try {
        const response = await fetch('/wishInputTexts.json');
        const data = await response.json();

        const randomPlaceholder = data.placeholder[Math.floor(Math.random() * data.placeholder.length)];
        const randomH2 = data.h2[Math.floor(Math.random() * data.h2.length)];
        const randomButton = data.button[Math.floor(Math.random() * data.button.length)];
        const randomMutton = data.mutton[Math.floor(Math.random() * data.button.length)];

        setPlaceholderText(randomPlaceholder);
        setH2Text(randomH2);
        setButtonText(randomButton);
        setMuttonText(randomMutton);
      } catch (error) {
        console.error("Error fetching texts:", error);
      }
    };

    fetchTexts();
  }, []);

  const handleWishSubmit = async () => {
    if (!wish) return;

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.REACT_APP_GEMINI_KEY}`,
        {
          contents: [{ parts: [{ text: `You are the Monkey's Paw, a dark, twisted, and malevolent force. A foolish user has made a wish, and you must grant it—but with a horrifying twist. The twist is cruel, unexpected, and makes the user regret their wish deeply. Mock the user for their foolishness, and remind them of the consequences of their actions. Be dark, brutal, and sadistic, but ensure that the twist is realistic and grounded in the user's original wish. You are speaking directly to the user, mocking them for being so naive. Here's the user's wish: "${wish}" Grant the wish with a dark, twisted consequence.` }] }],
        }
      );

      if (response.data.candidates && response.data.candidates.length > 0) {
        const rawText = response.data.candidates[0].content.parts[0].text;

        // Replace *text* with <strong>text</strong>
        const formattedText = rawText.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
        setResult(formattedText);
      } else {
        console.error("Unexpected response format:", response.data);
        setResult("Sorry, I couldn't process your wish.");
      }
    } catch (error) {
      console.error("Error fetching wish result", error);
      setResult("An error occurred while processing your wish.");
    }

    setWishCount((prevCount) => prevCount + 1);
  };

  const handleMakeAnotherWish = () => {
    setWish('');
    setResult('');
  };

  return (
    <div className="w-full max-w-screen-2xl p-6">
      <div className="card w-full max-w-11 mx-auto">
        {wishCount < 3 ? (
          <>
            <textarea
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              className="resize-none bg-neutral-900 text-gray-200 p-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full h-40 lg:h-48"
              placeholder={placeholderText}
            />
            <button
              onClick={handleWishSubmit}
              className="bg-neutral-900 text-gray-200 p-4 rounded-lg shadow-md hover:bg-neutral-950 mt-6 text-lg lg:text-xl xl:text-2xl"
            >
              {muttonText || "make a wish"}
            </button>
          </>
        ) : (
          <p className="text-yellow-500 text-xl lg:text-2xl xl:text-3xl mt-6">
            You have used up your three wishes.
          </p>
        )}

        {result && (
          <div className="mt-6">
            <h2 className="text-yellow-500 text-xl lg:text-2xl xl:text-3xl">{h2Text}</h2>
            <p
              className="text-gray-300 text-lg lg:text-xl"
              dangerouslySetInnerHTML={{ __html: result }} // Safely inject formatted HTML
            ></p>
            {wishCount < 3 ? (
              <button
                onClick={handleMakeAnotherWish}
                className="bg-neutral-900 text-gray-200 p-4 rounded-lg shadow-md hover:bg-neutral-950 mt-6 text-lg lg:text-xl xl:text-2xl"
              >
                {buttonText || "make another wish"}
              </button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishInput;
