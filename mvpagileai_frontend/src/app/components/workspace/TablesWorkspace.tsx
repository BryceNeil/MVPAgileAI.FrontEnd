import React, { useRef, useEffect, useState } from 'react';
import Handsontable from 'handsontable';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css';
import { X, Check } from 'react-feather';
import { HyperFormula } from 'hyperformula';

const hfOptions = {
  licenseKey: 'gpl-v3'
};

// Create a HyperFormula instance using sample data
// const hfInstance = HyperFormula.buildFromArray([
//   ['10', '20', '3.14159265359', '=SUM(A1:C1)'],
//   ...Array.from({ length: 999 }).map(() => Array.from({ length: 26 }).map(() => ''))
// ], hfOptions);

const hfInstance = HyperFormula.buildFromArray([
    ...Array.from({ length: 1000 }).map(() => Array.from({ length: 26 }).map(() => ''))
  ], hfOptions);
  

const TablesWorkspace: React.FC = () => {
  const hotRef = useRef(null);
  const [selectedCell, setSelectedCell] = useState('A1');
  const [formula, setFormula] = useState('');

  useEffect(() => {
    if (hotRef.current) {
      const hotInstance = hotRef.current.hotInstance;
  
      hotInstance.addHook('afterChange', (changes) => {
        if (changes) {
          for (let change of changes) {
            const [row, col, oldVal, newVal] = change;
            hfInstance.setCellContents({ sheet: 0, row, col }, newVal);
          }
        }
      })
      ;
  
      hotInstance.addHook('afterSelectionEnd', (row, col) => {
        const cellName = Handsontable.helper.spreadsheetColumnLabel(col) + (row + 1);
        setSelectedCell(cellName);
      });
    }
  }, []);
  
  
  return (
    <div className="h-full w-full">
      <div className="bg-gray-50 p-4 flex items-center text-sm">
        <input 
          type="text"
          className="mr-4 rounded p-1 bg-gray-200 text-gray-500"
          value={selectedCell}
          readOnly
        />
                <span className="mr-4">
                    <button className="bg-gray-200 px-2 py-1 mr-2 rounded" disabled><X className="text-gray-500" size={16}/></button>
                    <button className="bg-gray-200 px-2 py-1 rounded" disabled><Check className="text-gray-500" size={16}/></button>
                </span>
                <img 
                    src="/function2.svg" 
                    alt="Function Logo" 
                    className={`mr-2 w-6 h-6 text-gray-500'}`} 
                    style={{width: '16px', height: '16px'}}
                />
                <input 
                    type="text" 
                    placeholder="Enter formula..." 
                    className="flex-grow text-gray-500 bg-gray-200 rounded p-1"
                    value={formula}
                    onChange={(e) => setFormula(e.target.value)}
                    onFocus={() => {
                        document.querySelectorAll('.bg-gray-300').forEach(el => el.removeAttribute('disabled'));
                    }}
                    onBlur={() => {
                        document.querySelectorAll('.bg-gray-300').forEach(el => el.setAttribute('disabled', 'true'));
                    }}
                />
            </div>
            <div className="h-full w-full">
                <HotTable
                ref={hotRef}
                data={hfInstance.getSheetValues(0)}
                formulas={{ engine: hfInstance }}
                colHeaders={true}
                rowHeaders={true}
                width="100%"
                height="calc(60vh - 64px)"
                autoRowSize={true}
                autoColSize={true}
                viewportColumnRenderingOffset={50}
                viewportRowRenderingOffset={50}
                licenseKey="non-commercial-and-evaluation"
                // stretchH="all"  // Stretch columns to fit the entire width of the table
                minRows={2000}  // Increase the number of rows to 2000 for scrolling
                // ... other options ...
                />
            </div>
        </div>
    );
}

export default TablesWorkspace;
