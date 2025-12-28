"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoginForm from "../_components/loginForm";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, [router]);

  return (
    <div>
      <LoginForm />
    </div>
  );
}
