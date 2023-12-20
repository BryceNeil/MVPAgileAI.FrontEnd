import React from 'react';

const RubricBlock = () => {
 

  return (
    <div className="p-4 text-black dark:text-gray-50">
      <h2 className="text-xl font-bold mb-2">Question {'5'}</h2>
      <p className="mb-4">{'So what up wit it tho?'}</p>
      <h3 className="text-lg font-semibold mb-3">Marking Criteria</h3>
      <div>
          <div key={0} className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="font-medium">{'10'}</span>
              {/* <span className="font-medium">Weight: {item.weight * 100}%</span> */}
              <span className="font-medium">User Score: {10}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-blue-600 h-2.5 rounded-full"></div>
            </div>
            <span className="font-medium text-icongray text-xs pb-10">{'description'}</span>

          </div>
      </div>
    </div>
  );
};

export default RubricBlock;