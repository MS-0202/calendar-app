// 日付ごとのデータをlocalStorageに保存・取得
const KEY = "calendar-app-data";

export function loadDayData(date) {
  const all = JSON.parse(localStorage.getItem(KEY) || "{}");
  return all[date] || null;
}

export function saveDayData(date, data) {
  const all = JSON.parse(localStorage.getItem(KEY) || "{}");
  all[date] = data;
  localStorage.setItem(KEY, JSON.stringify(all));
}

// リセット機能を追加
export function resetDayData(date) {
  const all = JSON.parse(localStorage.getItem(KEY) || "{}");
  delete all[date];
  localStorage.setItem(KEY, JSON.stringify(all));
}
