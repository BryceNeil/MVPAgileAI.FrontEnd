import React, { useState, useRef, useEffect } from 'react';
import { Edit3, Upload, Scissors, FileText, Type, Tablet, MousePointer, ChevronDown } from 'react-feather';
import { FaRegSquare } from 'react-icons/fa';
import CanvasDraw from 'react-canvas-draw';


interface WhiteboardToolsProps {
    setIsDrawing: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedIcon: React.Dispatch<React.SetStateAction<any>>;
    selectedIcon: any;
    setBrushColor: React.Dispatch<React.SetStateAction<string>>;
    eraserSize: 'small' | 'medium' | 'large';  // <-- Add this
    setEraserSize: React.Dispatch<React.SetStateAction<'small' | 'medium' | 'large'>>;  // <-- Add this
}

const WhiteboardTools: React.FC<WhiteboardToolsProps> = ({ 
    setIsDrawing, 
    setSelectedIcon, 
    selectedIcon, 
    setBrushColor,
    eraserSize,  // <-- Destructure this prop
    setEraserSize  // <-- Destructure this prop
}) => {   // const [selectedIcon, setSelectedIcon] = useState(null);
    const [showEraserOptions, setShowEraserOptions] = useState(false); // State to toggle the eraser options
    const [selectedShape, setSelectedShape] = useState('square');
    const [showShapesOptions, setShowShapesOptions] = useState(false);
    const [textMode, setTextMode] = useState(false);
    const [texts, setTexts] = useState([]);
    const [isTextToolActive, setIsTextToolActive] = useState(false);


    const shapes = [
        { id: 'square', icon: '/fire.svg' },
        { id: 'circle', icon: '/fire.svg' },
        { id: 'triangle', icon: '/fire.svg' },
        // ... add more shapes as needed
      ];

    
      const handleCanvasClick = (e) => {
        if (textMode) {
            const rect = canvasRef.current.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const text = prompt('Enter text:');
            if (text) {
                setTexts([...texts, { x, y, text }]);
            }
        }
    };
    
    
    const handleEraserSizeClick = (size: 'small' | 'medium' | 'large') => {
        setEraserSize(size);
        setSelectedIcon('eraser');
        setIsDrawing(true);
        setBrushColor('white');
    };

    const getEraserIcon = (size: 'small' | 'medium' | 'large') => {
        const iconSize = {
            small: 8,
            medium: 12,
            large: 16
        };
        return <img src="/eraser3.svg" alt={`${size} eraser`} style={{ width: iconSize[size] + 'px', height: iconSize[size] + 'px' }} />;
    };
   
    const getIconStyle = (iconName) => {
        if (iconName === selectedIcon) {
            return 'opacity-100 bg-gray-200 p-2 rounded'; // Add bg-gray-200
        } else {
            return 'opacity-50 hover:opacity-100 hover:bg-gray-200 p-2 rounded';
        }
    };
    
    const getEvalIconStyle = (iconName) => {
        if (iconName === selectedIcon) {
            return 'opacity-100 bg-blue-200 p-2 rounded'; // Add bg-blue-200
        } else {
            return 'opacity-50 hover:opacity-100 hover:bg-blue-200 p-2 rounded';
        }
    };
    
    const getSecondaryDeviceIconStyle = (iconName) => {
        if (iconName === selectedIcon) {
            return 'opacity-100 bg-green-200 p-2 rounded'; // Add bg-green-200
        } else {
            return 'opacity-50 hover:opacity-100 hover:bg-green-200 p-2 rounded';
        }
    };

    const handleIconClick = (iconName: string) => {
        setSelectedIcon(iconName);
        if (iconName === 'pen') {
            setIsDrawing(true);
            setBrushColor('black'); 
        } else if (iconName === 'eraser') {
            setIsDrawing(true);
            setBrushColor('white'); 
            // canvasRef.current.lines = [];  // Clear the entire canvas (optional, use with caution) 
        } else if (iconName === 'textHeight') {
            setIsDrawing(false);
            setTextMode(true);
        } else {
            setIsDrawing(false);
        }
    };

    {isTextToolActive && (
        <div 
            contentEditable={true} 
            style={{ position: 'absolute', border: '1px solid black', minWidth: '100px', minHeight: '20px' }}
            onBlur={(e) => {
                // Logic to convert text to an image and draw it on the canvas
                // (You might need a library or utility function to do this)
                setIsTextToolActive(false); 
            }}
        ></div>
    )}

    return (
        <div>
            <div className="bg-gray-50 rounded m-4 px-1 py-2 mr-4 flex ">
                <div className="flex flex-col space-y-2">
                    {/* Drawing Tools */}
                    <div className="mb-2">
                        <div className={getIconStyle('pointer')} onClick={() => handleIconClick('pointer')}>
                            <MousePointer size={16} />
                        </div>
                        <div className={getIconStyle('pen')} onClick={() => handleIconClick('pen')}>
                            <Edit3 size={16} />
                        </div>
                        <div className={`relative ${getIconStyle('eraser')}`} onMouseEnter={() => { setShowEraserOptions(true); }} onMouseLeave={() => { setShowEraserOptions(false); }}>
                            <img src="/eraser3.svg" alt="Eraser" style={{ width: '16px', height: '16px' }} />
                            {showEraserOptions && (
                                <div className="absolute top-0 left-8 text-gray-500 text-xs bg-gray-50 border border-gray-300 rounded min-w-max"> 
                                    <div className={`flex items-center w-full px-3 py-1.5 cursor-pointer hover:bg-gray-150 space-x-2.5 ${eraserSize === 'small' ? 'bg-gray-200' : ''}`} onClick={() => handleEraserSizeClick('small')}>
                                        <img src="/eraser3.svg" alt="Small Eraser" style={{ width: '10px', height: '10px' }} />
                                        <span className="text-xs">Small</span>
                                    </div>
                                    <div className={`flex items-center w-full px-3 py-1.5 cursor-pointer hover:bg-gray-150 space-x-2.5 ${eraserSize === 'medium' ? 'bg-gray-200' : ''}`} onClick={() => handleEraserSizeClick('medium')}>
                                        <img src="/eraser3.svg" alt="Medium Eraser" style={{ width: '12px', height: '12px' }} />
                                        <span className="text-xs">Medium</span>
                                    </div>
                                    <div className={`flex items-center w-full px-3 py-1.5 cursor-pointer hover:bg-gray-150 space-x-2.5 ${eraserSize === 'large' ? 'bg-gray-200' : ''}`} onClick={() => handleEraserSizeClick('large')}>
                                        <img src="/eraser3.svg" alt="Large Eraser" style={{ width: '14px', height: '14px' }} />
                                        <span className="text-xs">Large</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* <div className={getIconStyle('square')} onClick={() => handleIconClick('square')}>
                            <FaRegSquare size={16} />
                        </div> */}
                        {/* <div className="relative" onMouseEnter={() => { setShowShapesOptions(true); }} onMouseLeave={() => { setShowShapesOptions(false); }}>
                            <img src="/fire.svg" alt="Shapes" style={{ width: '16px', height: '16px' }} />
                            {showShapesOptions && (
                                <div className="absolute top-0 left-8 text-gray-500 text-xs bg-gray-50 border border-gray-300 rounded grid grid-cols-2 gap-2"> 
                                    {shapes.map(shape => (
                                        <div 
                                            key={shape.id} 
                                            className={`flex items-center justify-center p-2 cursor-pointer hover:bg-gray-150 ${selectedShape === shape.id ? 'bg-gray-200' : ''}`}
                                            onClick={() => setSelectedShape(shape.id)}>
                                            <img src={shape.icon} alt={shape.id} style={{ width: '14px', height: '14px' }} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div> */}
                        <div className={getIconStyle('textHeight')} onClick={() => handleIconClick('textHeight')}>
                            <Type size={16} />
                        </div>
                        <div className={getIconStyle('upload')} onClick={() => handleIconClick('upload')}>
                            <Upload size={16} />
                        </div>
                    </div>
        
                    {/* Separator */}
                    <div className="border-b border-gray-300 my-2"></div>
        
                    {/* Evaluation Tools */}
                    <div>
                        <div className={getEvalIconStyle('fileText')} onClick={() => handleIconClick('fileText')}>
                            <FileText color="#3498db" size={16} />
                        </div>
                    </div>

                    {/* Separator */}
                    <div className="border-b border-gray-300 my-2"></div>
        
                    <div>
                        <div className={getSecondaryDeviceIconStyle('tablet')} onClick={() => setSelectedIcon('tablet')}>
                            <Tablet color="#2da15e" size={16} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );    
};

const WhiteboardWorkspace: React.FC = () => {
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [brushColor, setBrushColor] = useState('black'); // <-- Add this state for brush color
    const [eraserSize, setEraserSize] = useState<'small' | 'medium' | 'large'>('medium'); // <-- Add this
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    const [canvasWidth, setCanvasWidth] = useState(0);
    const [canvasHeight, setCanvasHeight] = useState(0);

    const eraserRadius = {
        small: 5,
        medium: 10,
        large: 20,
    };

    useEffect(() => {
        if (containerRef.current) {
            setCanvasWidth(containerRef.current.offsetWidth);
            setCanvasHeight(containerRef.current.offsetHeight);
        }
    }, [isDrawing]);

    return (
        <div className="h-full w-full text-black flex">
            <div className="flex-grow relative" ref={containerRef}>
                {/* Conditional rendering of CanvasDraw based on the selected tool */}
                {isDrawing && (
                    <CanvasDraw
                        hideGrid={true}
                        ref={canvasRef}
                        canvasWidth={canvasWidth}
                        canvasHeight={canvasHeight}
                        brushColor={brushColor}
                        brushRadius={selectedIcon === 'eraser' ? eraserRadius[eraserSize] : 1}
                        lazyRadius={1}
                    />
                )}
                {/* Place WhiteboardTools on top of the canvas */}
                <div className="absolute top-0 left-0 z-10">
                <WhiteboardTools 
                    setIsDrawing={setIsDrawing} 
                    setSelectedIcon={setSelectedIcon}
                    selectedIcon={selectedIcon}
                    setBrushColor={setBrushColor}
                    eraserSize={eraserSize}  // <-- Pass it as prop
                    setEraserSize={setEraserSize}  // <-- Pass it as prop
                />
                </div>
            </div>
        </div>
    );    
}

export default WhiteboardWorkspace;
