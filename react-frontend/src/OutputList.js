import React, { useState } from 'react';

const ItemList = ({ items = [] }) => {
  // Track checked state for each item
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (itemName) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  return (
    <div style={styles.container}>
      {items.length > 0 ? (
        <div style={styles.grid}>
          {items.map((item, index) => (
            <div 
              key={index}
              style={{
                ...styles.card,
                ...(checkedItems[item.item_name]
                  ? { 
                      opacity: 0.7,
                      borderImage: 'linear-gradient(180deg, #4CAF50 0%, #2E7D32 100%) 1',
                      backgroundColor: 'rgba(76, 175, 80, 0.05)'
                    }
                  : styles.cardUrgent)
              }}
            >
              <div style={{
                ...styles.cardHeader,
                ...(checkedItems[item.item_name] ? {} : {})
              }}>
                <h3 style={{
                  ...styles.itemName,
                  ...(checkedItems[item.item_name] ? {} : styles.itemNameUrgent)
                }}>
                  <input
                    type="checkbox"
                    checked={!!checkedItems[item.item_name]}
                    onChange={() => handleCheckboxChange(item.item_name)}
                    style={styles.checkbox}
                  />
                  {item.item_name}
                </h3>
              </div>
              
              <div style={styles.detailSection}>
                <span style={styles.label}>Description:</span>
                <p style={styles.detail}>{item.description}</p>
              </div>
              
              <div style={styles.detailSection}>
                <span style={styles.label}>Quantity:</span>
                <p style={styles.detail}>{item.quantity}</p>
              </div>
              
              {item.expiration && (
                <div style={styles.detailSection}>
                  <span style={styles.label}>Expiration:</span>
                  <p style={styles.detail}>{item.expiration}</p>
                </div>
              )}

              {item.amazon_search_link && (
                <div style={styles.detailSection}>
                  <span style={styles.label}>Amazon Link:</span>
                  <p style={styles.detail}>
                    <a href={item.amazon_search_link} target="_blank" rel="noopener noreferrer">
                      Click here to purchase
                    </a>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p style={styles.emptyMessage}>No items to display</p>
      )}
    </div>
  );
};

// Styling
const styles = {
  container: {
    maxWidth: '100vw',
    margin: '0 auto',
    padding: '10px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    rowGap: '45px',
    columnGap: '15px',
    padding: '0',
  },
  card: {
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
    padding: '16px 16px 16px 12px',
    transition: 'all 0.2s ease',
    borderLeft: '6px solid',
    borderImage: 'linear-gradient(180deg, #4CAF50 0%, #2E7D32 100%) 1',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    overflow: 'hidden',
    position: 'relative',
    color: '#232526',
  },
  cardUrgent: {
    borderLeft: '6px solid',
    borderImage: 'linear-gradient(180deg, #ff512f 0%, #e53935 100%) 1',
    background: '#fff',
    color: '#232526',
    boxShadow: '0 2px 12px rgba(255, 81, 47, 0.15)',
    position: 'relative',
    animation: 'pulse 1.2s infinite alternate',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  itemName: {
    margin: 0,
    color: '#232526',
    fontSize: '1.1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    overflowWrap: 'break-word',
    transition: 'all 0.2s ease',
  },
  itemNameUrgent: {
    color: '#e53935',
    fontWeight: 'bold',
    letterSpacing: '1px',
    textShadow: '0 1px 8px #ff512f22',
  },
  checkbox: {
    width: '20px',
    height: '20px',
    marginRight: '8px',
    cursor: 'pointer',
    accentColor: '#4CAF50',
  },
  detailSection: {
    marginBottom: '8px',
  },
  label: {
    fontWeight: '600',
    color: '#232526',
    display: 'block',
    marginBottom: '2px',
    fontSize: '0.85rem',
  },
  detail: {
    margin: '0',
    color: '#444',
    fontSize: '0.9rem',
    lineHeight: '1.4',
    overflowWrap: 'break-word',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    padding: '20px 10px',
  },
};

// Add this to your CSS (e.g., App.css) for the pulse animation:
/*
@keyframes pulse {
  from { box-shadow: 0 0 0 0 rgba(255,81,47,0.2); }
  to { box-shadow: 0 0 8px 4px rgba(255,81,47,0.12); }
}
*/

export default ItemList;