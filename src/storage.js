// storage.js
const API_URL = "https://script.google.com/macros/s/AKfycbydctB1bjFUWQ4XsqyRCmNhAC1VLjqINieAzZRKq8BCeK9KJT-vD25Skb6TIp_DZsO8/exec";

// 日付ごとのデータを取得
export async function loadDayData(date) {
  const res = await fetch(API_URL);
  const all = await res.json();
  // GASから返るのは配列なので、日付でフィルタ
  const filtered = all.filter(row => row.date === date);
  // { [id]: { net, gross, ... } } の形に変換
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

// 日付ごとのデータを保存
export async function saveDayData(date, data) {
  // data: { [id]: { net, gross, ... } }
  // idごとに1行ずつ送信
  for (const id of Object.keys(data)) {
    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        date,
        id,
        ...data[id],
      }),
      headers: { "Content-Type": "application/json" },
    });
  }
}

// 日付ごとのデータをリセット（全削除）
// GAS側にdelete機能がなければ、スプレッドシートから手動削除 or 上書き保存で対応
export async function resetDayData(date) {
  alert("リセットはスプレッドシートから手動で行ってください（GASのdelete機能は省略）");
}
