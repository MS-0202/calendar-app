import { promises as fs } from "fs";
const DATA_FILE = "./data.json";

export default async function handler(req, res) {
  const { method, body, query } = req;
  let all = {};
  try {
    const json = await fs.readFile(DATA_FILE, "utf8");
    all = JSON.parse(json);
  } catch {
    all = {};
  }

  if (method === "GET") {
    // ?date=yyyy-MM-dd で取得
    const { date } = query;
    res.status(200).json(date ? (all[date] || null) : all);
  } else if (method === "POST") {
    // { date, data }
    const { date, data } = body;
    all[date] = data;
    await fs.writeFile(DATA_FILE, JSON.stringify(all));
    res.status(200).json({ ok: true });
  } else if (method === "DELETE") {
    // ?date=yyyy-MM-dd でリセット
    const { date } = query;
    delete all[date];
    await fs.writeFile(DATA_FILE, JSON.stringify(all));
    res.status(200).json({ ok: true });
  } else {
    res.status(405).end();
  }
}
