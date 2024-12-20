import React, { useState, useEffect } from 'react';

import wishInputTexts from './wishInputTexts.json';

const WishResult = ({ wishResult, onMakeAnotherWish, isThreeWishesUsed }) => {
  const [buttonText, setButtonText] = useState('');

  useEffect(() => {
    if (wishInputTexts && wishInputTexts.button) {
      const randomButtonText = wishInputTexts.button[Math.floor(Math.random() * wishInputTexts.button.length)];
      setButtonText(randomButtonText);
    }
  }, []);

  return (
    <div className="card mt-6">
      <h2 className="text-yellow-500">So you wanted...</h2>
      <p className="text-gray-300">{wishResult}</p>
      {!isThreeWishesUsed && (
        <button
          onClick={onMakeAnotherWish}
          className="bg-neutral-900 text-gray-200 p-4 rounded-lg shadow-md hover:bg-neutral-950 mt-6 text-lg lg:text-xl xl:text-2xl"
        >
          {buttonText || "make another wish"}
        </button>
      )}
      {isThreeWishesUsed && (
        <p className="text-yellow-500 text-xl lg:text-2xl xl:text-3xl mt-6">
          you have used up your three wishes...
        </p>
      )}
    </div>
  );
};

export default WishResult;
