import React, { useState, useEffect } from "react";
import { loadDayData, saveDayData, resetDayData } from "./storage";

const IDS = ["101", "111", "102", "112", "103", "113", "104", "114", "106"];
const FIELDS = [
  { key: "net", label: "純売(税抜)" },
  { key: "gross", label: "総売上(税込)" },
  { key: "tax", label: "税合計" },
  { key: "customers", label: "客数" },
  { key: "payment", label: "納金額" },
];

export default function DayInputForm({ date, onBack }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    loadDayData(date).then((d) => {
      setData(d || {});
      setLoading(false);
    });
  }, [date]);

  function handleChange(id, field, value) {
    const newData = {
      ...data,
      [id]: { ...data[id], [field]: value.replace(/[^0-9.]/g, "") },
    };
    setData(newData);
  }

  function getTotal(field) {
    return IDS.reduce((sum, id) => sum + Number(data[id]?.[field] || 0), 0);
  }

  // 保存後すぐカレンダーに戻す
  async function handleSave() {
    setLoading(true);
    onBack(); // 先に画面を戻す
    await saveDayData(date, data);
    setLoading(false);
    alert("保存しました");
  }

  async function handleReset() {
    setLoading(true);
    await resetDayData(date);
    setData({});
    setLoading(false);
    alert("リセットしました（スプレッドシート連携の場合は手動削除が必要な場合があります）");
  }

  const totalRow = {};
  FIELDS.forEach((f) => (totalRow[f.key] = getTotal(f.key)));

  if (loading) return <div>読込中...</div>;

  return (
    <div>
      <button onClick={onBack}>← カレンダーに戻る</button>
      <h3>{date}</h3>
      <button
        onClick={handleReset}
        style={{ marginBottom: 8, background: "#f88", color: "#fff" }}
      >
        この日の入力をリセット
      </button>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>識別番号</th>
              {FIELDS.map((f) => (
                <th key={f.key}>{f.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {IDS.map((id) => (
              <tr key={id}>
                <td>{id}</td>
                {FIELDS.map((f) => (
                  <td key={f.key}>
                    <input
                      type="number"
                      value={data[id]?.[f.key] || ""}
                      onChange={(e) =>
                        handleChange(id, f.key, e.target.value)
                      }
                      style={{ width: 70 }}
                      inputMode="numeric"
                    />
                  </td>
                ))}
              </tr>
            ))}
            <tr style={{ background: "#f0f0f0", fontWeight: "bold" }}>
              <td>合計</td>
              {FIELDS.map((f) => (
                <td key={f.key}>{totalRow[f.key]}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <button onClick={handleSave} style={{ marginTop: 16, width: "100%" }}>
        保存
      </button>
    </div>
  );
}
