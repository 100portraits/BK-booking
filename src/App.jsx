// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AcceptanceScreen from './components/AcceptanceScreen';
import BookingProcessScreen from './components/BookingProcessScreen';
import UserInfoScreen from './components/UserInfoScreen';
import CalendarScreen from './components/CalendarScreen';
import ConfirmationScreen from './components/ConfirmationScreen';
import AvailableSlots from './components/AvailableSlots';
import ThankYouScreen from './components/ThankYouScreen';
import DisclaimerScreen from './components/DisclaimerScreen'; // Add this import
import DiscBrakeDisclaimerScreen from './components/DiscBrakeDisclaimerScreen';
import WheelTruingDisclaimerScreen from './components/WheelTruingDisclaimerScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AcceptanceScreen />} />
        <Route path="/booking" element={<BookingProcessScreen />} />
        <Route path="/userinfo" element={<UserInfoScreen />} />
        <Route path="/disclaimer" element={<DisclaimerScreen />} /> {/* Add this line */}
        <Route path="/calendar" element={<CalendarScreen />} />
        <Route path="/timeslots" element={<AvailableSlots />} />
        <Route path="/confirmation" element={<ConfirmationScreen />} />
        <Route path="/thank-you" element={<ThankYouScreen />} />
        <Route path="/disc-brake-disclaimer" element={<DiscBrakeDisclaimerScreen />} />
        <Route path="/wheel-truing-disclaimer" element={<WheelTruingDisclaimerScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
