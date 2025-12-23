import React, { useEffect, useState } from "react";
import { login, logout, onAuthChange } from "./auth";

export default function AuthStatus() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthChange(setUser);
    return () => unsubscribe();
  }, []);

  // 未ログイン時は自動でGoogleログイン画面を出す
  useEffect(() => {
    if (user === null) {
      login();
    }
  }, [user]);

  if (!user) {
    // ログイン中は何も表示しない（または「ログイン中...」など）
    return null;
  }
  return (
    <div>
      {user.displayName}でログイン中
      <button onClick={logout}>ログアウト</button>
    </div>
  );
}
