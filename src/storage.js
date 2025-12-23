// storage.js

// 環境変数からAPI_URLを取得（ローカルも本番も対応）
const API_URL = process.env.REACT_APP_API_URL;

// スプレッドシート全データ取得（GET）
export async function fetchSheetData() {
  console.log("API_URL:", API_URL); // fetch前にURL確認
  try {
    const res = await fetch(API_URL);
    const text = await res.text(); // fetch直後にレスポンス内容確認
    console.log("fetch結果:", text);
    if (!res.ok) throw new Error("データ取得に失敗しました");
    const data = JSON.parse(text); // ここでJSON変換
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
