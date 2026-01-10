"use client";

import LogoutButton from "../_components/logout";
import CatList from "../_components/catList";
import EmployeeList from "../_components/employeeList";
import AdopterstList from "../_components/adoptersList";
import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Header from "../_components/header";
import AdoptionsList from "../_components/adoptionsList";

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

  useEffect(() => {
    if (token === null) {
      router.replace("/");
    }
  }, [token, router]);

  if (token === "null" || token === null) return null;

  return (
    <div className="flex flex-col w-full min-h-screen bg-zinc-50">
      <Header />
      <div className="h-24" />

      {(roles.includes("opiekun") ||
        roles.includes("weterynarz") ||
        roles.includes("admin")) && (
        <CatList
          showAdopt={roles.includes("opiekun") || roles.includes("admin")}
        />
      )}
      {roles.includes("admin") && <EmployeeList />}
      {(roles.includes("admin") || roles.includes("opiekun")) && (
        <AdopterstList />
      )}
      {(roles.includes("admin") || roles.includes("opiekun")) && (
        <AdoptionsList />
      )}
    </div>
  );
}
