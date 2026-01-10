import api from "@/lib/axios";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

type AdoptersType = {
  adopter: {
    id: number;
    name: string;
    surname: string;
    phoneNumber: string;
    email: string;
    isActive: boolean;
  };
};
type FormType = {
  id: number;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  isActive: boolean;
};

export default function AdopterListItem(cat: AdoptersType) {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const { register, handleSubmit, reset } = useForm<FormType>({
    defaultValues: {
      id: cat.adopter.id,
      name: cat.adopter.name,
      surname: cat.adopter.surname,
      phoneNumber: cat.adopter.phoneNumber,
      email: cat.adopter.email,
      isActive: cat.adopter.isActive,
    },
  });

  const onSubmit = async (data: FormType) => {
    try {
      const payload = {
        ...data,
      };

      await api.put(`/adoptujacy/${cat.adopter.id}`, payload);
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
    <div className=" bg-fuchsia-300 hover:bg-fuchsia-400 rounded-2xl p-2 flex flex-col items-center">
      {showEdit ? (
        <div>
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
              <label>nazwisko: </label>
              <input
                {...register("surname")}
                className="bg-pink-100 rounded p-1 w-full"
              />
            </div>
            <div>
              <label>numer telefonu: </label>
              <input
                {...register("phoneNumber")}
                className="bg-pink-100 rounded p-1 w-full"
              />
            </div>
            <div>
              <label>adres e-mail: </label>
              <input
                {...register("email")}
                className="bg-pink-100 rounded p-1 w-full"
              />
            </div>

            <div className="w-full bg-red-100 rounded-2xl p-3 text-center">
              fr?
              <div className="w-full flex justify-between mt-2">
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
            </div>
          </form>
        </div>
      ) : (
        <div>
          <div>{cat.adopter.name || "BRAK IMIENIA"}</div>
          <div>{cat.adopter.surname || "BRAK NAZWISKA"}</div>
          <div>{cat.adopter.phoneNumber || "BRAK NUMERU"}</div>
          <div>{cat.adopter.email || "BRAK MAILA"}</div>
        </div>
      )}

      {showEdit ? (
        <div className=""></div>
      ) : (
        <div
          className="text-emerald-600 p-1.5 bg-pink-100 rounded-xl mt-4 hover:bg-emerald-500 hover:text-white hover:cursor-pointer"
          onClick={() => setShowEdit(!showDelete)}
        >
          Edytuj
        </div>
      )}

      {showDelete ? (
        <div className="w-3/4 bg-red-100 rounded-2xl p-3 ">
          <div>fr?</div>
          <div className=" flex justify-between px-6">
            <div
              className="bg-red-300 rounded-xl px-2 py-1 hover:bg-red-400 hover:cursor-pointer"
              onClick={() => DeleteAdopter(cat.adopter.id)}
            >
              yup
            </div>
            <div
              className="bg-green-300 rounded-xl px-2 py-1 hover:bg-green-400 hover:cursor-pointer"
              onClick={() => setShowDelete(false)}
            >
              nah
            </div>
          </div>
        </div>
      ) : (
        <div
          className="text-red-500 p-1.5 bg-pink-100 rounded-xl mt-4 hover:bg-red-500 hover:text-white hover:cursor-pointer"
          onClick={() => setShowDelete(!showDelete)}
        >
          USUŃ
        </div>
      )}
    </div>
  );
}

async function DeleteAdopter(id: number) {
  const response = await api.delete(`adoptujacy/${id}`);
  window.location.reload();
  return response.data;
}
