"use client";
import LogoutButton from "./_components/logout";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import api from "@/lib/axios";

type UserType = {
  name: string;
  surname: string;
  isActive: boolean;
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: string;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: string;
  lockoutEnabled: string;
  accessFailedCount: number;
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
      <div className="w-full p-6 font-semibold bg-amber-200 h-fit flex justify-between absolute">
        <div className="text-center text-4xl">Schronisko 2</div>

        <div className="flex gap-4 font-normal">
          <div className="w-fit">{token && <LogoutButton />}</div>
          {!token && (
            <Link
              className="bg-blue-500 text-white p-2 text-lg rounded-xl hover:bg-blue-600 hover:cursor-pointer"
              href={"/login"}
            >
              Zaloguj się
            </Link>
          )}
        </div>
      </div>

      <div className="w-full min-h-screen text-4xl font-bold flex justify-center items-center">
        {token && user
          ? `Witaj ${user.name} ${user.surname}`
          : !token
          ? "Zaloguj sie koleżko"
          : "Ładowanie..."}
      </div>
    </div>
  );
}
