import { useState, useEffect } from 'react';
import { Quote, RotateCw } from 'lucide-react';
import { getRandomQuote } from '../data/quotes';

export const InspirationalQuote = () => {
  const [currentQuote, setCurrentQuote] = useState('');

  useEffect(() => {
    setCurrentQuote(getRandomQuote());
  }, []);

  const handleNewQuote = () => {
    setCurrentQuote(getRandomQuote());
  };

  return (
    <div className="lg:block bg-gradient-to-r from-orange-50 to-blue-50 rounded-lg p-6 mb-6 border border-orange-100">
      <div className="flex items-center justify-center space-x-3">
        <Quote className="h-6 w-6 text-orange-500 flex-shrink-0" />
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700 italic mb-2">
            "{currentQuote.text}"
          </p>
          <p className="text-sm text-gray-500">
            — {currentQuote.author}
          </p>
        </div>
        <button 
          onClick={handleNewQuote}
          className="text-orange-500 hover:text-orange-600 cursor-pointer text-sm font-medium underline flex-shrink-0 ml-4"
        >
          <RotateCw />
        </button>
      </div>
    </div>
  );
};