import React from 'react';
import { Tldraw } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';

const WhiteboardWorkspace: React.FC = () => {
  return (
    <div className="tldraw__editor h-full w-full">
      <Tldraw persistenceKey="whiteboard_workspace" />
    </div>
  );
};

export default WhiteboardWorkspace;



