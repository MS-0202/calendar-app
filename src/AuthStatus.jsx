import React, { useEffect, useState } from "react";
import { login, logout, onAuthChange } from "./auth";

export default function AuthStatus() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthChange(setUser);
    return () => unsubscribe();
  }, []);

  if (!user) {
    return <button onClick={login}>Googleでログイン</button>;
  }
  return (
    <div>
      {user.displayName}でログイン中
      <button onClick={logout}>ログアウト</button>
    </div>
  );
}
