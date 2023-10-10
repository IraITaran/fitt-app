import React, { useState } from 'react';
import './LeaderBoardFilterList.css';

const LeaderBoardFilterList = ({ setSortChoice }) => {
  const [activeItem, setActiveItem] = useState({});

  const handleItemClick = (index) => {
    setActiveItem(index === activeItem ? null : index);
  };

  const LeaderBoardFilterArr = [
    { label: 'Избранное', dataAttr: 'PNL' },
    { label: 'Общий PnL', dataAttr: 'PNL' },
  ];

  return (
    <ul className="filterList">
      {LeaderBoardFilterArr.map((item, index) => (
        <li
          key={index}
          className={index === activeItem ? 'is-active' : ''}
          data-filter={item.dataAttr}
          onClick={(e) => {
            handleItemClick(index);
            index !== activeItem ? setSortChoice(e.target.dataset.filter) : setSortChoice('ROI');
          }}
          data-item={item.dataAttr}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
};

export default LeaderBoardFilterList;
