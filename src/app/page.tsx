"use client";
import LogoutButton from "./_components/logout";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import api from "@/lib/axios";
import Header from "./_components/header";

type UserType = {
  name: string;
  surname: string;
  id: string;
  userName: string;
};

function getUserIdFromToken(token: string) {
  const payload = token.split(".")[1];
  const decoded = JSON.parse(atob(payload));
  return decoded[
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
  ];
}

function useAuthFromLocalStorage() {
  const token = useSyncExternalStore(
    (callback) => {
      window.addEventListener("storage", callback);
      return () => window.removeEventListener("storage", callback);
    },
    () => localStorage.getItem("token"),
    () => null
  );

  return {
    token,
    userId: token ? getUserIdFromToken(token) : null,
  };
}

export default function Home() {
  const { token, userId } = useAuthFromLocalStorage();
  const [user, setUser] = useState<UserType>();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!userId) {
      setReady(true);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await api.get(`/pracownik/${userId}`);
        setUser(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setReady(true);
      }
    };

    fetchUser();
  }, [userId]);

  if (!ready) {
    return null;
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-zinc-50 over">
      <Header />
      <div className="w-full min-h-screen text-4xl font-bold flex justify-center items-center">
        {token && user
          ? zalogowan(user.name, user.surname)
          : !token
          ? "Zaloguj sie koleżko "
          : "Ładowanie..."}
      </div>
    </div>
  );
}
function zalogowan(name: string, surname: string) {
  return (
    <div className=" flex flex-col gap-8 justify-center items-center">
      Witaj {name} {surname}
      <Link
        href={"/dashboard"}
        className="p-3 px-5 rounded-xl text-lg font-normal bg-amber-300 hover:bg-amber-400"
      >
        Przejdź do panelu użytkownika
      </Link>
    </div>
  );
}
