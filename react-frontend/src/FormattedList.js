import React from 'react';

const FormattedList = ({ inputString }) => {
  // Function to parse the input string based on format type
  const parseList = () => {
    if (!inputString) return [];

    return inputString.split('\n').filter(line => line.trim() !== '');
  };

  const items = parseList();

  return (
    <div className="formatted-list">
      {items.length > 0 ? (
        <ul style={{ 
          listStyleType: 'disc',
          paddingLeft: '20px',
          margin: '10px 0'
        }}>
          {items.map((item, index) => (
            <li key={index} style={{ marginBottom: '5px' }}>
              {item.trim()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items to display</p>
      )}
    </div>
  );
};

export default FormattedList;