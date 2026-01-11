"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import RegisterForm from "../_components/registerForm";

export default function Page() {
  const router = useRouter();

  return (
    <div>
      <RegisterForm />
    </div>
  );
}
