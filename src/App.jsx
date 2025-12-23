import AuthStatus from "./AuthStatus";
import React, { useState } from "react";
import Calendar from "./Calendar";
import DayInputForm from "./DayInputForm";

export default function App() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: 16 }}>
      {/* ここでログインUIを表示 */}
      <AuthStatus />
      {!selectedDate ? (
        <Calendar onSelectDate={setSelectedDate} />
      ) : (
        <DayInputForm date={selectedDate} onBack={() => setSelectedDate(null)} />
      )}
    </div>
  );
}
