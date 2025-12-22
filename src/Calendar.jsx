import React, { useState } from "react";
import { startOfMonth, endOfMonth, eachDayOfInterval, format, addMonths, subMonths } from "date-fns";

export default function Calendar({ onSelectDate }) {
  // ① 表示中の年月を管理
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // ② 表示月の開始・終了日を計算
  const start = startOfMonth(currentMonth);
  const end = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start, end });

  // ③ 月送りボタンのハンドラ
  const handlePrev = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNext = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
        <button onClick={handlePrev}>← 前月</button>
        <h2 style={{ margin: "0 16px" }}>{format(currentMonth, "yyyy年MM月")}</h2>
        <button onClick={handleNext}>翌月 →</button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {days.map((day) => (
          <button
            key={day}
            style={{
              width: "14.2%",
              padding: 8,
              margin: 1,
              border: "1px solid #ccc",
              background: "#fff",
              borderRadius: 4,
              cursor: "pointer",
            }}
            onClick={() => onSelectDate(format(day, "yyyy-MM-dd"))}
          >
            {format(day, "d")}
          </button>
        ))}
      </div>
    </div>
  );
}
