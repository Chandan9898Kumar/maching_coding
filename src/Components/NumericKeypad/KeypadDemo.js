import React, { useState } from 'react';
import NumericKeypad from './NumericKeypad';
import './KeypadDemo.css';

const KeypadDemo = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleNumberInput = (digit) => {
    setPhoneNumber(prev => prev + digit);
  };

  const handleBackspace = () => {
    setPhoneNumber(prev => prev.slice(0, -1));
  };

  const handleCall = (number) => {
    if (number) {
      alert(`Calling ${number}...`);
      // In a real app, you would integrate with phone API or WebRTC
    }
  };

  const formatPhoneNumber = (number) => {
    // Simple US phone number formatting
    const cleaned = number.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      return [match[1], match[2], match[3]].filter(Boolean).join('-');
    }
    return number;
  };

  return (
    <div className="keypad-demo">
      <div className="demo-header">
        <h1>Mobile Numeric Keypad</h1>
        <p>iOS & Android Compatible</p>
      </div>
      
      <div className="phone-mockup">
        <div className="screen">
          <div className="status-bar">
            <span className="carrier">Carrier</span>
            <span className="time">9:41 AM</span>
            <span className="battery">100%</span>
          </div>
          
          <div className="dialer-app">
            <div className="dialer-header">
              <h2>Phone</h2>
            </div>
            
            <div className="number-display-area">
              <div className="formatted-number">
                {formatPhoneNumber(phoneNumber) || 'Enter number'}
              </div>
            </div>
            
            <NumericKeypad
              value={phoneNumber}
              onNumberInput={handleNumberInput}
              onBackspace={handleBackspace}
              onCall={handleCall}
              maxLength={15}
              showCallButton={true}
            />
          </div>
        </div>
      </div>
      
      <div className="demo-info">
        <h3>Features:</h3>
        <ul>
          <li>✓ Haptic feedback (vibration on supported devices)</li>
          <li>✓ Touch-optimized for iOS and Android</li>
          <li>✓ Prevents text selection and context menus</li>
          <li>✓ Responsive design for all screen sizes</li>
          <li>✓ Proper tel input type for mobile keyboards</li>
          <li>✓ Visual feedback on key presses</li>
        </ul>
      </div>
    </div>
  );
};

export default KeypadDemo;