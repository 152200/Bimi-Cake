import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Write = () => {

const navigate = useNavigate();
const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [showGuide, setShowGuide] = useState(false);
  const [guideText, setGuideText] = useState(''); 

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleNext = () => {
    navigate('../toppings');
  };

  return (
    <div className='flex flex-col align-middle'>Write



       {/* Progress Dots */}
       <div className="flex justify-center gap-2 mt-8 mb-8">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${i === 4 ? 'bg-[#bd8989]' : 'bg-gray-300'}`}
            />
          ))}
        </div>

        {/* Write on the Cake */}
      <div className="w-full max-w-md space-y-1 mx-auto mt-6 mb-6">
        <label className="flex items-center text-gray-500">
          <span className="mr-2">✏️</span> Write on the cake
        </label>
        <input
          type="text"
          maxLength="40"
          placeholder="e.g. Happy birthday"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <div className="text-sm text-gray-400 text-right">{text.length}/40</div>
      </div>

      {/* Upload Section */}
      <div className="w-full max-w-md p-4 border-2 border-dashed rounded-md text-center mx-auto mt-6 mb-6">
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="text-gray-400">
            <div className="text-3xl">+</div>
            <div className="mt-2">Upload something to print 🎂</div>
          </div>
        </label>
        {file && (
          <div className="mt-2 text-sm text-gray-500">
            Selected file: {file.name}
          </div>
        )}
      </div>
      <div className="text-pink-500 mx-auto">+4 <span className='text-3xl'>₪</span></div>
      <div className="text-gray-500 text-center">
        We will make sure to place it in the right position on the cake.
      </div>

      {/* Additional Guide */}
      <div className="w-full max-w-md  mx-auto mt-6 mb-6">
        <button
          className="flex items-center justify-between w-full px-4 py-2 text-left bg-gray-100 rounded-md"
          onClick={() => setShowGuide(!showGuide)}
        >
          <span>📋 Additional guide</span>
          <span>{showGuide ? "▲" : "▼"}</span>
        </button>
        {showGuide && (
          <input
          className="mt-2 p-2 text-sm text-gray-500 bg-gray-50 rounded-md w-full" 
          placeholder='Here you can add instructions or extra guidance.'
          value={guideText}a
          onChange={(e) => { setGuideText(e.target.value)}}
          /> 
        )}
      </div>



      {/* Next Button */}
      <button 
        onClick={handleNext}
        className="w-full mt-8 bg-[#E5C1C1] text-white py-3 rounded-lg font-semibold hover:bg-[#d8b4b4] transition-colors"
      >
        Previous
      </button>
    </div>
  )
}

export default Write