import React, { useState } from 'react';
import { File, Edit2, Code, Plus } from 'react-feather';

const WorkpsaceButton = ({ label, id, selectedId, onSelect, Icon, selectedColor }) => {
  const isSelected = selectedId === id;
  
  return (
    <button 
      className={`flex text-xs items-center mr-4 ${isSelected ? 'text-gray-900 font-semibold' : 'text-gray-400'}`}
      onClick={() => onSelect(id)}
    >
      <Icon className={`w-4 h-4 mr-2 ${isSelected ? 'text-black' : ''}`} color={isSelected ? selectedColor : '#ccc'} />
      {label}
    </button>
  );
};

const WorkspaceSelection = () => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="flex justify-start">
      <WorkpsaceButton id={1} label="Excel" selectedId={selectedId} onSelect={setSelectedId} Icon={File} selectedColor="#2ecc71" />
      <WorkpsaceButton id={2} label="Whiteboard" selectedId={selectedId} onSelect={setSelectedId} Icon={Edit2} selectedColor="#9b59b6" />
      <WorkpsaceButton id={3} label="Code" selectedId={selectedId} onSelect={setSelectedId} Icon={Code} selectedColor="#3498db" />
      <WorkpsaceButton id={4} label="Plugins" selectedId={selectedId} onSelect={setSelectedId} Icon={Plus} selectedColor="#e67e22" />

      {/* Add more as needed */}
    </div>
  );
};

export default WorkspaceSelection;
