const API = "/api/data";

export async function loadDayData(date) {
  const res = await fetch(`${API}?date=${date}`);
  return await res.json();
}

export async function saveDayData(date, data) {
  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, data }),
  });
}

export async function resetDayData(date) {
  await fetch(`${API}?date=${date}`, { method: "DELETE" });
}
