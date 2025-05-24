import React from 'react';

const ItemList = ({ items = [] }) => {
  // Default empty array if items is undefined
  
  return (
    <div style={styles.container}>
      {items.length > 0 ? (
        <div style={styles.grid}>
          {items.map((item, index) => (
            <div key={index} style={styles.card}>
              <h3 style={styles.itemName}>{item.item_name}</h3>
              
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
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    padding: '10px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    borderLeft: '4px solid #4a90e2',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
  },
  itemName: {
    margin: '0 0 15px 0',
    color: '#2c3e50',
    fontSize: '1.4rem',
    borderBottom: '1px solid #eee',
    paddingBottom: '8px',
  },
  detailSection: {
    marginBottom: '12px',
  },
  label: {
    fontWeight: '600',
    color: '#4a4a4a',
    display: 'block',
    marginBottom: '4px',
    fontSize: '0.9rem',
  },
  detail: {
    margin: '0',
    color: '#666',
    fontSize: '0.95rem',
    lineHeight: '1.5',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    padding: '40px 20px',
  },
};

export default ItemList;