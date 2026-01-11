"use client";
import CatList from "../_components/catList";
import EmployeeList from "../_components/employeeList";
import AdopterstList from "../_components/adoptersList";
import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Header from "../_components/header";
import AdoptionsList from "../_components/adoptionsList";
import AdoptedCatList from "../_components/adoptedCatsList";
import Link from "next/link";

function useAuthFromLocalStorage() {
  const ROLE_CLAIM =
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

  const token = useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      window.addEventListener("storage", callback);
      return () => window.removeEventListener("storage", callback);
    },
    () => localStorage.getItem("token"),
    () => "null"
  );

  let roles: string[] = [];

  if (token && token !== "null") {
    try {
      const payload = token.split(".")[1];
      const decoded = JSON.parse(atob(payload));

      const r = decoded[ROLE_CLAIM];
      roles = r ? (Array.isArray(r) ? r : [r]) : [];
    } catch (e) {
      console.error("Invalid token", e);
      roles = [];
    }
  }

  return { token, roles };
}

export default function Home() {
  const router = useRouter();
  const { token, roles } = useAuthFromLocalStorage();

  const isReady = token !== null && token !== "null";
  const isAdmin = isReady && roles.includes("admin");

  useEffect(() => {
    if (isReady && !isAdmin) {
      router.replace("/");
    }
  }, [isReady, isAdmin, router]);

  if (!isReady || !isAdmin) return null;

  return (
    <div className="flex flex-col w-full min-h-screen bg-zinc-50">
      <Header />
      <div className="h-24" />

      <EmployeeList />
      <div className="w-full items-center justify-center flex my-6 ">
        <Link
          href={"/register"}
          className="px-3 py-2 bg-emerald-500 hover:cursor-pointer rounded text-xl w-fit hover:bg-emerald-600"
        >
          + Dodaj nowego pracownika
        </Link>
      </div>
    </div>
  );
}
