import React, { useState, useCallback } from 'react';
import './NumericKeypad.css';

const NumericKeypad = ({ 
  onNumberInput, 
  onBackspace, 
  onCall, 
  value = '', 
  maxLength = 15,
  showCallButton = true 
}) => {
  const [activeKey, setActiveKey] = useState(null);

  // Keypad layout matching mobile phones
  const keypadLayout = [
    [
      { number: '1', letters: '' },
      { number: '2', letters: 'ABC' },
      { number: '3', letters: 'DEF' }
    ],
    [
      { number: '4', letters: 'GHI' },
      { number: '5', letters: 'JKL' },
      { number: '6', letters: 'MNO' }
    ],
    [
      { number: '7', letters: 'PQRS' },
      { number: '8', letters: 'TUV' },
      { number: '9', letters: 'WXYZ' }
    ],
    [
      { number: '*', letters: '' },
      { number: '0', letters: '+' },
      { number: '#', letters: '' }
    ]
  ];

  // Simulate haptic feedback
  const triggerHapticFeedback = useCallback(() => {
    if (navigator.vibrate) {
      navigator.vibrate(50); // 50ms vibration
    }
  }, []);

  // Handle key press with haptic feedback
  const handleKeyPress = useCallback((key) => {
    triggerHapticFeedback();
    setActiveKey(key);
    
    if (onNumberInput && value.length < maxLength) {
      onNumberInput(key);
    }
    
    // Reset active state after animation
    setTimeout(() => setActiveKey(null), 150);
  }, [onNumberInput, value.length, maxLength, triggerHapticFeedback]);

  // Handle backspace
  const handleBackspace = useCallback(() => {
    triggerHapticFeedback();
    setActiveKey('backspace');
    
    if (onBackspace) {
      onBackspace();
    }
    
    setTimeout(() => setActiveKey(null), 150);
  }, [onBackspace, triggerHapticFeedback]);

  // Handle call button
  const handleCall = useCallback(() => {
    triggerHapticFeedback();
    setActiveKey('call');
    
    if (onCall) {
      onCall(value);
    }
    
    setTimeout(() => setActiveKey(null), 150);
  }, [onCall, value, triggerHapticFeedback]);

  // Prevent text selection and context menu on mobile
  const preventDefaults = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  return (
    <div className="numeric-keypad">
      {/* Display area */}
      <div className="keypad-display">
        <input
          type="tel"
          value={value}
          readOnly
          className="number-display"
          placeholder="Enter phone number"
        />
      </div>

      {/* Keypad grid */}
      <div className="keypad-grid">
        {keypadLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="keypad-row">
            {row.map((key) => (
              <button
                key={key.number}
                className={`keypad-key ${activeKey === key.number ? 'active' : ''}`}
                onTouchStart={preventDefaults}
                onTouchEnd={(e) => {
                  preventDefaults(e);
                  handleKeyPress(key.number);
                }}
                onClick={() => handleKeyPress(key.number)}
                onContextMenu={preventDefaults}
              >
                <span className="key-number">{key.number}</span>
                {key.letters && (
                  <span className="key-letters">{key.letters}</span>
                )}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="keypad-actions">
        <button
          className={`action-btn backspace-btn ${activeKey === 'backspace' ? 'active' : ''}`}
          onTouchStart={preventDefaults}
          onTouchEnd={(e) => {
            preventDefaults(e);
            handleBackspace();
          }}
          onClick={handleBackspace}
          onContextMenu={preventDefaults}
          disabled={!value}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z"/>
          </svg>
        </button>

        {showCallButton && (
          <button
            className={`action-btn call-btn ${activeKey === 'call' ? 'active' : ''}`}
            onTouchStart={preventDefaults}
            onTouchEnd={(e) => {
              preventDefaults(e);
              handleCall();
            }}
            onClick={handleCall}
            onContextMenu={preventDefaults}
            disabled={!value}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default NumericKeypad;