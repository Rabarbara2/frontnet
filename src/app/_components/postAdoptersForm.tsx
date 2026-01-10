import api from "@/lib/axios";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

type AdopterType = {
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  isActive: boolean;
};

export default function PostAdopterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm<AdopterType>({
    defaultValues: {
      isActive: true,
    },
  });

  const onSubmit: SubmitHandler<AdopterType> = async (data) => {
    const payload = { ...data };
    console.log("POST PAYLOAD:", payload);
    await postCar(payload);
    reset();
    window.location.reload();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-11/12 border border-blue-200 text-zinc-800 p-4 space-y-4  rounded mt-2 "
    >
      <div>
        <label className="">imie:</label>
        <input
          className="border-blue-200 border rounded-xl p-1.5 w-full"
          {...register("name", { required: true })}
        />
      </div>
      <div>
        <label className="">nazwisko:</label>
        <input
          className="border-blue-200 border rounded-xl p-1.5 w-full"
          {...register("surname", { required: true })}
        />
      </div>
      <div>
        <label className="">numer telefonu:</label>
        <input
          className="border-blue-200 border rounded-xl p-1.5 w-full"
          {...register("phoneNumber", { required: true })}
        />
      </div>
      <div>
        <label className="">e-mail:</label>
        <input
          className="border-blue-200 border rounded-xl p-1.5 w-full"
          {...register("email", { required: true })}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-200 mx-6 text-zinc-800 px-4 py-2 rounded-2xl hover:bg-blue-300 hover:cursor-pointer text-lg"
      >
        {isSubmitting ? "Wysyłanie..." : "Dodaj osobe"}
      </button>
    </form>
  );
}

async function postCar(data: AdopterType) {
  const response = await api.post("/adoptujacy", data);
  return response.data;
}
