import React from 'react';

const A4Page = () => {
  const styles = {
    page: {
      width: '210mm',
      minHeight: '297mm',
      backgroundColor: '#fff',
      boxShadow: '0 0 10px rgba(0,0,0,.3)',
      margin: 'auto',
      padding: '20mm',
    },
  };

  return (
    <div style={styles.page}>
      <h1>Meu modelo de papel A4</h1>
      <p>Aqui está o conteúdo do meu modelo de papel A4.</p>
    </div>
  );
};

export default A4Page;