// single selection then multiple selection

import { useState } from 'react';
import data from './data';
import './styles.css';

export default function Accordion() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  // for storing multiple IDs
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(getCurrentID) {
    setSelected(getCurrentID === selected ? null : getCurrentID);
  }

  function handleMultipleSelection(getCurrentID) {
    let copyMultiple = [...multiple];
    const findIndexOfCurrentId = copyMultiple.indexOf(getCurrentID);

    if (findIndexOfCurrentId === -1) {
      copyMultiple.push(getCurrentID);
    } else {
      copyMultiple.splice(findIndexOfCurrentId, 1);
    }
    setMultiple(copyMultiple);
  }

  function toggleSelectionMode() {
    setEnableMultiSelection(!enableMultiSelection);
    // reset states if selection is switched
    setSelected(null);
    setMultiple([]);
  }

  return (
    <div className="wrapper">
      <button onClick={toggleSelectionMode}>
        {enableMultiSelection
          ? 'Enable Single-selection'
          : 'Enable Multiple-selection'}
      </button>
      <div className="accordion">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item" key={dataItem.id}>
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultipleSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {selected === dataItem.id ||
              multiple.indexOf(dataItem.id) !== -1 ? (
                <div className="content">{dataItem.answer}</div>
              ) : null}
            </div>
          ))
        ) : (
          <div>No data found </div>
        )}
      </div>
    </div>
  );
}
