import React, { useState } from 'react';
import Welcome from './components/Welcome';
import WishInput from './components/WishInput';

function App() {
  const [isWishing, setIsWishing] = useState(false);

  return (
    <div className="dark-bg text-white min-h-screen flex items-center justify-center w-full">
      {/* gitHub Logo */}
      <a
        href="https://github.com/arindal1/MonkeysPaw"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-6 right-6"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/128/13053/13053484.png"
          alt="GitHub Logo"
          className="w-12 h-12 animate-logo hover:scale-110 transition-all duration-300"
        />
      </a>
      <div className="w-full max-w-screen-xl p-6">
        {!isWishing ? (
          <Welcome onStart={() => setIsWishing(true)} />
        ) : (
          <WishInput />
        )}
      </div>
    </div>
  );
}

export default App;
