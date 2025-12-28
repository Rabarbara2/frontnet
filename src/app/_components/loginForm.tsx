"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

type LoginForm = {
  userName: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  async function onSubmit(data: LoginForm) {
    try {
      const res = await api.post("/auth/login", data);

      localStorage.setItem("token", res.data.token);

      router.push("/");
    } catch (err) {
      console.log(err);
      alert("Błędne dane logowania");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto mt-20 space-y-4"
    >
      <h1 className="text-2xl font-bold text-center">Logowanie</h1>

      <input
        className="border p-2 w-full rounded"
        placeholder="Login"
        {...register("userName", {
          required: "Email jest wymagany",
        })}
      />
      {errors.userName && (
        <p className="text-red-500 text-sm">{errors.userName.message}</p>
      )}

      <input
        className="border p-2 w-full rounded"
        placeholder="Hasło"
        {...register("password", {
          required: "Hasło jest wymagane",
        })}
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}

      <button
        disabled={isSubmitting}
        className="bg-blue-600 text-white p-2 rounded w-full disabled:opacity-50"
      >
        {isSubmitting ? "Logowanie..." : "Zaloguj"}
      </button>
    </form>
  );
}
