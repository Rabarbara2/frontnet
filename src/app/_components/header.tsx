import Link from "next/link";
import LogoutButton from "./logout";
import { useSyncExternalStore } from "react";

function isTokenExpired(token: string) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  } catch {
    return true;
  }
}

function useAuthFromLocalStorage() {
  const token = useSyncExternalStore(
    (callback) => {
      window.addEventListener("storage", callback);
      return () => window.removeEventListener("storage", callback);
    },
    () => {
      const token = localStorage.getItem("token");

      if (token && isTokenExpired(token)) {
        localStorage.removeItem("token");
        return null;
      }

      return token;
    },
    () => null
  );

  return { token };
}

export default function Header() {
  const { token } = useAuthFromLocalStorage();
  return (
    <div className="w-full p-6 font-semibold bg-amber-200 h-fit flex justify-between absolute">
      <Link className="text-center text-4xl" href={"/"}>
        Schronisko 2
      </Link>

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
  );
}
