import React from 'react';

const LoadingSkeleton = ({ type = 'card', count = 1, darkMode = false }) => {
  const skeletonStyle = {
    background: darkMode 
      ? 'linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%)'
      : 'linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
    borderRadius: '8px'
  };

  const cardSkeletonStyle = {
    ...skeletonStyle,
    height: '200px',
    marginBottom: '1rem'
  };

  const lineSkeletonStyle = {
    ...skeletonStyle,
    height: '16px',
    marginBottom: '8px'
  };

  const renderCardSkeleton = () => (
    <div style={{
      background: darkMode ? '#1f2937' : 'white',
      borderRadius: '16px',
      padding: '1.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{
          ...skeletonStyle,
          width: '50px',
          height: '50px',
          borderRadius: '50%'
        }} />
        <div style={{ flex: 1 }}>
          <div style={{ ...lineSkeletonStyle, width: '60%', height: '20px' }} />
          <div style={{ ...lineSkeletonStyle, width: '40%', height: '14px' }} />
        </div>
      </div>
      
      {/* Content */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ ...lineSkeletonStyle, width: '100%' }} />
        <div style={{ ...lineSkeletonStyle, width: '80%' }} />
        <div style={{ ...lineSkeletonStyle, width: '90%' }} />
      </div>
      
      {/* Footer */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <div style={{ ...skeletonStyle, width: '80px', height: '32px' }} />
        <div style={{ ...skeletonStyle, width: '80px', height: '32px' }} />
      </div>
    </div>
  );

  const renderTableSkeleton = () => (
    <div style={{
      background: darkMode ? '#1f2937' : 'white',
      borderRadius: '16px',
      padding: '1.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Table Header */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{ ...lineSkeletonStyle, height: '20px' }} />
        ))}
      </div>
      
      {/* Table Rows */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '1rem', 
          marginBottom: '0.75rem',
          paddingBottom: '0.75rem',
          borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`
        }}>
          {[1, 2, 3, 4].map(j => (
            <div key={j} style={{ ...lineSkeletonStyle, height: '16px' }} />
          ))}
        </div>
      ))}
    </div>
  );

  const renderDashboardSkeleton = () => (
    <div>
      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} style={{
            background: darkMode ? '#1f2937' : 'white',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ flex: 1 }}>
                <div style={{ ...lineSkeletonStyle, width: '60%', height: '14px' }} />
                <div style={{ ...lineSkeletonStyle, width: '40%', height: '24px' }} />
              </div>
              <div style={{ ...skeletonStyle, width: '40px', height: '40px', borderRadius: '8px' }} />
            </div>
          </div>
        ))}
      </div>
      
      {/* Chart Area */}
      <div style={{
        background: darkMode ? '#1f2937' : 'white',
        borderRadius: '16px',
        padding: '1.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        height: '400px'
      }}>
        <div style={{ ...lineSkeletonStyle, width: '30%', height: '24px', marginBottom: '2rem' }} />
        <div style={{ ...skeletonStyle, width: '100%', height: '300px' }} />
      </div>
    </div>
  );

  const skeletons = Array.from({ length: count }).map((_, index) => {
    switch (type) {
      case 'card':
        return <div key={index}>{renderCardSkeleton()}</div>;
      case 'table':
        return <div key={index}>{renderTableSkeleton()}</div>;
      case 'dashboard':
        return <div key={index}>{renderDashboardSkeleton()}</div>;
      case 'line':
        return <div key={index} style={{ ...lineSkeletonStyle, width: '100%' }} />;
      default:
        return <div key={index}>{renderCardSkeleton()}</div>;
    }
  });

  return (
    <>
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {skeletons}
      </div>
    </>
  );
};

export default LoadingSkeleton;