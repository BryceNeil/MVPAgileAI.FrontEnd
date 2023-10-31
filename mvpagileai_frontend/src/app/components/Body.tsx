"use client";
import React, { useState } from 'react';
import { FileText, HelpCircle, Info, ChevronLeft, ChevronRight } from 'react-feather';
import InterviewAILogo from './chat/InterviewAILogo';
import WorkspaceSelection from './workspace/WorkspaceSelection';


const Body: React.FC = () => {
    const [leftSize, setLeftSize] = useState(33);
    const [bottomSize, setBottomSize] = useState(33); // Changed the initial value to 33 for equal distribution
    const [isResizing, setIsResizing] = useState<number | null>(null);
    const [selectedBox, setSelectedBox] = useState<number | null>(null);  // State to keep track of the selected box


    const handleMouseMove = (e: any) => {
        if (isResizing === 1) {
            let newLeftSize = (e.clientX / window.innerWidth) * 100;
            if (newLeftSize < 10) newLeftSize = 10;
            if (newLeftSize > 90) newLeftSize = 90;
            setLeftSize(newLeftSize);
        } else if (isResizing === 2) {
            let newBottomSize = 100 - ((e.clientY / window.innerHeight) * 100); // This will make the box bigger when you drag upwards and smaller when you drag downwards
            if (newBottomSize < 10) newBottomSize = 10;
            if (newBottomSize > 90) newBottomSize = 90;
            setBottomSize(newBottomSize);
        }
    };

    return (
      <div className="flex flex-col flex-grow m-0 p-0 overflow-hidden" onMouseMove={handleMouseMove} onMouseUp={() => setIsResizing(null)}>
          <div className="flex w-full flex-grow">
              <div 
                  className={`bg-white rounded-lg overflow-hidden ${selectedBox === 1 ? 'border border-gray-200' : ''}`} 
                  style={{ flexBasis: `${leftSize}%` }}
                  onClick={() => setSelectedBox(1)}
              >
              {/* Box 1 */}
              <div className="bg-white rounded-lg overflow-hidden" style={{ flexBasis: `${leftSize}%` }}>
              <div className="flex items-center p-1 bg-gray-50 justify-between"> {/* justify-between ensures elements are spaced between start and end */}

                {/* Description button */}
                <button className="flex text-gray-900 font-semibold text-xs items-center ml-2">
                    <FileText className="w-4 h-4 mr-2" color="#3498db"/> {/* Feather icon for description */}
                    Q1 - Financial Modelling
                </button>

                {/* Placeholder for label if you want to add any in between */}
                {/* <h2 className="text-gray-500 text-xs">Question</h2> */}

                {/* Navigation arrows */}
                <div className="ml-4 flex items-center cursor-pointer hover:bg-gray-200 rounded transition-colors duration-300">
                    {/* Previous arrow */}
                    <div className="relative group p-2 cursor-pointer hover:bg-gray-300 rounded transition-colors duration-300">
                        <ChevronLeft className="text-gray-600 w-4 h-4" />
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1 text-xs bg-black text-white p-1 mt-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">Previous Question</div>
                    </div>

                    {/* Next arrow */}
                    <div className="relative group p-2 cursor-pointer hover:bg-gray-300 rounded transition-colors duration-300">
                        <ChevronRight className="text-gray-600 w-4 h-4" />
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1 text-xs bg-black text-white p-1 mt-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">Next Question</div>
                    </div>
                </div>

                </div>
                  <div className="p-4">Box 1 Content</div>
              </div>
              </div>

  
              {/* Resize handle */}
              <div className="relative cursor-ew-resize flex items-center justify-center" 
                   style={{ width: '8px' }} 
                   onMouseDown={() => setIsResizing(1)}>
                  <div className={isResizing === 1 ? "rounded w-0.5 h-full bg-blue-500" : "rounded-full w-0.5 h-8 bg-gray-300 hover:bg-transparent"}></div>
              </div>
  
              {/* Box 2 and 3 y-axis movement */}
              <div className="flex flex-col flex-grow" style={{ flexBasis: `${100 - leftSize}%` }}>
                <div 
                    className={`bg-white rounded-lg overflow-hidden ${selectedBox === 2 ? 'border border-gray-200' : ''}`} 
                    style={{ flexBasis: `${100 - leftSize}%` }}
                    onClick={() => setSelectedBox(2)}
                >
                  <div className="bg-white rounded-lg overflow-hidden" style={{ flexBasis: `${100 - bottomSize}%` }}>
                      <div className="text-center p-2 py-3 bg-gray-50">
                        <WorkspaceSelection/>
                      </div>
                      <div className="p-4">Box 2 Content</div>
                  </div>
                  </div>
  
                  {/* Y-axis Resize handle */}
                  <div className="relative cursor-ns-resize flex items-center justify-center" 
                      style={{ height: '8px' }} 
                      onMouseDown={() => setIsResizing(2)}>
                      <div className={isResizing === 2 ? "rounded w-full h-0.5 bg-blue-500" : "rounded-full w-8 h-0.5 bg-gray-300 hover:bg-transparent"}></div>
                  </div>
  
                  {/* Box 3 */}
                  <div 
                      className={`bg-white rounded-lg overflow-hidden flex-grow ${selectedBox === 3 ? 'border border-gray-200' : ''}`} 
                      style={{ flexBasis: `${bottomSize}%` }}
                      onClick={() => setSelectedBox(3)}
                  >
                    <div className="bg-white rounded-lg overflow-hidden flex-grow" style={{ flexBasis: `${bottomSize}%` }}>
                      <div className="text-center p-2 py-3 bg-gray-50">
                        <InterviewAILogo/>
                      </div>
                      <div className="p-4">Box 3 Content</div>
                    </div>
                  </div>
              </div>
          </div>
      </div>
  );
  
  

};

export default Body;
