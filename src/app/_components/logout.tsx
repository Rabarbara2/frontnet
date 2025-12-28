"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-400 hover:bg-red-500 text-white p-2 text-lg rounded-xl hover:cursor-pointer"
    >
      Wyloguj się
    </button>
  );
}
