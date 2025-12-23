// storage.js

// ご自身のGASウェブアプリURLに差し替えてください
const API_URL = "https://script.google.com/macros/s/AKfycbxka4WiNcYmRKGB5n83_C5-yvn4O4beZtmoKVLjpx7ljcKHytfG1HMIoUxPJLWdksJh/exec";

// スプレッドシート全データ取得（GET）
export async function fetchSheetData() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("データ取得に失敗しました");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("GETエラー:", err);
    throw err;
  }
}

// 1行データ保存（POST）
export async function postSheetData(rowObj) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rowObj),
    });
    if (!res.ok) throw new Error("データ保存に失敗しました");
    const result = await res.json();
    return result;
  } catch (err) {
    console.error("POSTエラー:", err);
    throw err;
  }
}

// 日付ごとのデータ取得（DayInputForm用）
export async function loadDayData(date) {
  const all = await fetchSheetData();
  // 指定日のデータのみ抽出
  const filtered = all.filter(row => row.date === date);
  // idごとにまとめる
  const result = {};
  filtered.forEach(row => {
    result[row.id] = {
      net: row.net,
      gross: row.gross,
      tax: row.tax,
      customers: row.customers,
      payment: row.payment,
    };
  });
  return result;
}

// 日付ごとのデータ保存（DayInputForm用）
export async function saveDayData(date, data) {
  // data: { [id]: { net, gross, ... } }
  // idごとにPOST
  const promises = Object.entries(data).map(([id, fields]) =>
    postSheetData({ date, id, ...fields })
  );
  await Promise.all(promises);
}

// リセット（GAS側で削除APIを作っていない場合はダミー関数でOK）
export async function resetDayData(date) {
  // スプレッドシート連携の場合、手動削除が必要なため空実装
  return;
}
