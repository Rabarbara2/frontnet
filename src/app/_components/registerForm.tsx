"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

type RegisterForm = {
  userName: string;
  password: string;
  name: string;
  surname: string;
};

export default function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>();

  async function onSubmit(data: RegisterForm) {
    try {
      await api.post("/auth/register", data);

      alert("Rejestracja przebiegła pomyślnie!");
      router.back();
    } catch (err) {
      console.error(err);
      alert("Coś poszło nie tak podczas rejestracji");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto mt-20 space-y-4"
    >
      <h1 className="text-2xl font-bold text-center">
        Rejestracja nowego pracownika
      </h1>

      <input
        className="border p-2 w-full rounded"
        placeholder="Imię"
        {...register("name", { required: "Imię jest wymagane" })}
      />
      {errors.name && (
        <p className="text-red-500 text-sm">{errors.name.message}</p>
      )}

      <input
        className="border p-2 w-full rounded"
        placeholder="Nazwisko"
        {...register("surname", { required: "Nazwisko jest wymagane" })}
      />
      {errors.surname && (
        <p className="text-red-500 text-sm">{errors.surname.message}</p>
      )}

      <input
        className="border p-2 w-full rounded"
        placeholder="Login"
        {...register("userName", { required: "Login jest wymagany" })}
      />
      {errors.userName && (
        <p className="text-red-500 text-sm">{errors.userName.message}</p>
      )}

      <input
        type="password"
        className="border p-2 w-full rounded"
        placeholder="Hasło"
        {...register("password", { required: "Hasło jest wymagane" })}
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}

      <button
        disabled={isSubmitting}
        className="bg-green-600 text-white p-2 rounded w-full disabled:opacity-50"
      >
        {isSubmitting ? "Rejestracja..." : "Zarejestruj"}
      </button>
    </form>
  );
}
