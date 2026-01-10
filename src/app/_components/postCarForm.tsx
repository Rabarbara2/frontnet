import api from "@/lib/axios";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

type CatType = {
  name: string;
  race: string;
  gender: string;
  color: string;
  dateOfBirth: string;
  dateOfArival: string;
  isAdopted: boolean;
};

export default function PostCatForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm<CatType>({
    defaultValues: {
      name: "",
      race: "",
      gender: "",
      color: "",
      dateOfBirth: new Date().toISOString(),
      dateOfArival: new Date().toISOString(),
      isAdopted: false,
    },
  });

  const onSubmit: SubmitHandler<CatType> = async (data) => {
    const payload = { ...data };
    console.log("POST PAYLOAD:", payload);
    await postCar(payload);
    reset();
    window.location.reload();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-9/12 border-blue-200 text-zinc-900 p-4 space-y-4  rounded mt-2 "
    >
      <div>
        <label className="">imie:</label>
        <input
          className="border-blue-200 border rounded-xl p-1.5 w-full"
          {...register("name", { required: true })}
        />
      </div>
      <div>
        <label className="">rasa:</label>
        <input
          className="border-blue-200 border rounded-xl p-1.5 w-full"
          {...register("race", { required: true })}
        />
      </div>
      <div>
        <label className="">kolor:</label>
        <input
          className="border-blue-200 border rounded-xl p-1.5 w-full"
          {...register("color", { required: true })}
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Płeć:</label>
        <select
          className="border border-blue-200 rounded-xl p-2 w-full"
          {...register("gender", { required: "Wybierz płeć" })}
        >
          <option value="Samiec">Samiec</option>
          <option value="Samica">Samica</option>
          <option value="Inna / Nieznana">Inna / Nieznana</option>
        </select>
      </div>
      <div>
        <label className="">data urodzenia:</label>
        <input
          type="date"
          className="border-blue-200 border rounded-xl p-1.5 w-full"
          {...register("dateOfBirth", { required: true })}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-200 mx-6 text-zinc-800 px-4 py-2 rounded-2xl hover:bg-blue-300 hover:cursor-pointer text-lg"
      >
        {isSubmitting ? "Wysyłanie..." : "Dodaj kotka"}
      </button>
    </form>
  );
}

async function postCar(data: CatType) {
  const response = await api.post("/kot", data);

  return response.data;
}
