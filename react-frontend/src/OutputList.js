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
                  ? { opacity: 0.5, borderLeft: '4px solid #4CAF50' }
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
    gap: '12px',
    padding: '0',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    padding: '14px 12px',
    transition: 'all 0.3s ease',
    borderLeft: '4px solid #4a90e2',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    overflowWrap: 'break-word',
  },
  cardUrgent: {
    borderLeft: '6px solid #e53935',
    backgroundColor: '#fff5f5',
    color: '#b71c1c',
    boxShadow: '0 2px 12px rgba(229,57,53,0.08)',
    animation: 'pulse 1.2s infinite alternate',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  itemName: {
    margin: 0,
    color: '#2c3e50',
    fontSize: '1.1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    overflowWrap: 'break-word',
  },
  itemNameUrgent: {
    color: '#e53935',
    fontWeight: 'bold',
    letterSpacing: '1px',
  },
  checkbox: {
    width: '16px',
    height: '16px',
    margin: 0,
    cursor: 'pointer',
  },
  detailSection: {
    marginBottom: '8px',
  },
  label: {
    fontWeight: '600',
    color: '#4a4a4a',
    display: 'block',
    marginBottom: '2px',
    fontSize: '0.85rem',
  },
  detail: {
    margin: '0',
    color: '#666',
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

// Add this to your CSS (e.g., in App.css) for the pulse animation:
/*
@keyframes pulse {
  from { box-shadow: 0 0 0 0 rgba(229,57,53,0.2); }
  to { box-shadow: 0 0 8px 4px rgba(229,57,53,0.12); }
}
*/

export default ItemList;