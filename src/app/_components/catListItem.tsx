import api from "@/lib/axios";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

type CatsType = {
  cat: {
    id: number;
    name: string;
    race: string;
    gender: string;
    color: string;
    dateOfBirth: string;
    dateOfArival: string;
    isAdopted: boolean;
  };
};

type CatFormData = {
  name: string;
  race: string;
  color: string;
  gender: string;
  dateOfArival: string;
  dateOfBirth: string;
};

export default function CatListItem({ cat }: CatsType) {
  const [showEdit, setShowEdit] = useState(false);

  const { register, handleSubmit, reset } = useForm<CatFormData>({
    defaultValues: {
      name: cat.name,
      race: cat.race,
      color: cat.color,
      gender: cat.gender,
      dateOfArival: cat.dateOfArival.slice(0, 10),
      dateOfBirth: cat.dateOfBirth.slice(0, 10),
    },
  });

  const onSubmit = async (data: CatFormData) => {
    try {
      const payload = {
        ...data,
        dateOfArival: new Date(data.dateOfArival).toISOString(),
        dateOfBirth: new Date(data.dateOfBirth).toISOString(),
        isAdopted: cat.isAdopted,
      };

      await api.put(`/kot/${cat.id}`, payload);
      alert("Zapisano zmiany!");
      setShowEdit(false);
      reset(data);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Błąd przy zapisie!");
    }
  };

  return (
    <div className=" bg-pink-300 hover:bg-pink-400 rounded-2xl p-2 flex flex-col items-center">
      {showEdit ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 p-2 w-full"
        >
          <div>
            <label>imię: </label>
            <input
              {...register("name")}
              className="bg-pink-100 rounded p-1 w-full"
            />
          </div>
          <div>
            <label>rasa: </label>
            <input
              {...register("race")}
              className="bg-pink-100 rounded p-1 w-full"
            />
          </div>
          <div>
            <label>kolor: </label>
            <input
              {...register("color")}
              className="bg-pink-100 rounded p-1 w-full"
            />
          </div>
          <div>
            <label>płeć: </label>
            <input
              {...register("gender")}
              className="bg-pink-100 rounded p-1 w-full"
            />
          </div>
          <div className="flex flex-col">
            <label>data przyjęcia: </label>
            <input
              type="date"
              {...register("dateOfArival")}
              className="bg-pink-100 rounded p-1 w-full"
            />
          </div>
          <div className="flex flex-col">
            <label>data urodzenia: </label>
            <input
              type="date"
              {...register("dateOfBirth")}
              className="bg-pink-100 rounded p-1 w-full"
            />
          </div>

          <div className="w-full bg-red-100 rounded-2xl p-3 flex justify-between mt-2">
            <button
              type="submit"
              className="bg-green-300 rounded-xl px-4 py-1 hover:bg-green-400 cursor-pointer"
            >
              yup
            </button>
            <div
              className="bg-red-300 rounded-xl px-4 py-1 hover:bg-red-400 cursor-pointer"
              onClick={() => setShowEdit(false)}
            >
              nah
            </div>
          </div>
        </form>
      ) : (
        <div className="w-full">
          <div>imię: {cat.name || "BRAK DANYCH"}</div>
          <div>rasa: {cat.race || "BRAK DANYCH"}</div>
          <div>kolor: {cat.color || "BRAK DANYCH"}</div>
          <div>płeć: {cat.gender || "BRAK DANYCH"}</div>
          <div>data przyjęcia: {cat.dateOfArival.slice(0, 10)}</div>
          <div>data urodzenia: {cat.dateOfBirth.slice(0, 10)}</div>
        </div>
      )}

      {!showEdit && (
        <div
          className=" p-1.5 bg-pink-100 rounded-xl m-6 hover:bg-fuchsia-500 hover:text-white hover:cursor-pointer"
          onClick={() => setShowEdit(true)}
        >
          Edytuj
        </div>
      )}
    </div>
  );
}
