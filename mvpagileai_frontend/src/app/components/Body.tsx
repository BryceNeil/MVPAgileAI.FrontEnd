"use client";
import React, { useState } from 'react';
import { FileText, HelpCircle, Info, ChevronLeft, ChevronRight } from 'react-feather';
import InterviewAILogo from './chat/InterviewAILogo';
import WorkspaceSelection from './workspace/WorkspaceSelection';
import QuestionNavigator from './question/QuestionNavigator';
import QuestionBox from './question/QuestionBox';
import CodeWorkspace from './workspace/CodeWorkspace';
import WhiteboardWorkspace from './workspace/WhiteboardWorkspace';
import TablesWorkspace from './workspace/TablesWorkspace';
import Plugins from './workspace/Plugins';
import InterviewBody from './chat/InterviewBody';

const Body: React.FC = () => {
    const [leftSize, setLeftSize] = useState(33);
    const [bottomSize, setBottomSize] = useState(33); // Changed the initial value to 33 for equal distribution
    const [isResizing, setIsResizing] = useState<number | null>(null);
    const [selectedBox, setSelectedBox] = useState<number | null>(null);  // State to keep track of the selected box
    const [selectedId, setSelectedId] = useState(null);

    const mapIdToWorkspace = (id) => {
      switch(id) {
        case 1: return 'Tables';
        case 2: return 'Whiteboard';
        case 3: return 'Code';
        case 4: return 'Plugins';
        default: return null;
      }
    }

    const selectedWorkspace = mapIdToWorkspace(selectedId);
    const NavbarHeight = '64px'; // Replace with the actual height of your navbar


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
      <div className="flex flex-col flex-grow m-0 p-0 overflow-hidden dark:bg-darkestgray" onMouseMove={handleMouseMove} onMouseUp={() => setIsResizing(null)}>
        <div className="flex w-full flex-grow">
          <div 
            className={`rounded-lg overflow-hidden ${selectedBox === 1 ? 'border border-gray-200 dark:border-medgray' : ''} dark:bg-darkgray`} 
            style={{ flexBasis: `${leftSize}%`, maxHeight: `calc(100vh - ${NavbarHeight})`}}
            onClick={() => setSelectedBox(1)}
          >
            {/* Box 1 */}
            <div className="rounded-lg flex flex-col h-full bg-white dark:bg-darkgray" style={{ flexBasis: `${leftSize}%` }}>
              <QuestionNavigator/>
              <QuestionBox/>
            </div>
          </div>
    
          {/* Resize handle */}
          <div className="relative cursor-ew-resize flex items-center justify-center" 
              style={{ width: '8px' }} 
              onMouseDown={() => setIsResizing(1)}>
            <div className={isResizing === 1 ? "rounded w-0.5 h-full bg-blue-500" : "rounded-full w-0.5 h-8 bg-gray-300 hover:bg-transparent dark:bg-icongray"}></div>
          </div>
    
          {/* Box 2 and 3 y-axis movement */}
          <div className="flex flex-col flex-grow" style={{ flexBasis: `${100 - leftSize}%` }}>
            <div 
              className={`rounded-lg overflow-hidden ${selectedBox === 2 ? 'border border-gray-200 dark:border-medgray' : ''} bg-white dark:bg-darkgray`} 
              style={{ flexBasis: `${100 - leftSize}%` }}
              onClick={() => setSelectedBox(2)}
            >
              <div className="w-full h-full overflow-hidden flex flex-col dark:bg-darkgray" style={{ flexBasis: `${100 - bottomSize}%` }}>
                <div className="text-center p-2 py-3 bg-gray-50 dark:bg-semidarkgray">
                  <WorkspaceSelection selectedId={selectedId} setSelectedId={setSelectedId} />
                </div>
    
                <div className="flex-grow overflow-auto">
                  {selectedWorkspace === 'Tables' && <TablesWorkspace />}
                  {selectedWorkspace === 'Whiteboard' && <WhiteboardWorkspace />}
                  {selectedWorkspace === 'Code' && <CodeWorkspace />}
                  {selectedWorkspace === 'Plugins' && <Plugins />}
                </div>
              </div>
            </div>
    
            {/* Y-axis Resize handle */}
            <div className="relative cursor-ns-resize flex items-center justify-center" 
              style={{ height: '8px' }} 
              onMouseDown={() => setIsResizing(2)}>
              <div className={isResizing === 2 ? "rounded w-full h-0.5 bg-blue-500" : "rounded-full w-8 h-0.5 bg-gray-300 hover:bg-transparent dark:bg-icongray"}></div>
            </div>
    
            {/* Box 3 */}
            <div 
              className={`rounded-lg overflow-hidden flex-grow ${selectedBox === 3 ? 'border border-gray-200 dark:border-medgray' : ''} dark:bg-darkgray`} 
              style={{ flexBasis: `${bottomSize}%` }}
              onClick={() => setSelectedBox(3)}
            >
              <div className="flex flex-col h-full flex-grow bg-white dark:bg-darkgray rounded-lg overflow-hidden" style={{ flexBasis: `${bottomSize}%` }}>
                <div className="text-center p-2 py-3 bg-gray-50 dark:bg-semidarkgray">
                  <InterviewAILogo/>
                </div>
                <div className="flex-grow p-0">
                  <InterviewBody/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    
  
  

};

export default Body;
