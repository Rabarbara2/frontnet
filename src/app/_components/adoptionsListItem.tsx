import api from "@/lib/axios";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { mainModule } from "process";
import { useState } from "react";
import { set } from "react-hook-form";

type AdoptionType = {
  adoption: {
    id: number;
    kotId: number;
    adoptujacyId: number;
    adoptionDate: string;
    isActive: boolean;
    adoptujacy: {
      id: number;
      name: string;
      surname: string;
      phoneNumber: string;
      email: string;
      isActive: boolean;
    };
    kot: {
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
  showEdit: boolean;
  showDelete: boolean;
};

const handleDelete = async (id: number) => {
  try {
    const res = await api.delete(`/adopcja/${id}`);

    if (res.status === 200 || res.status === 204) {
      alert("Adopcja została cofnięta");
      window.location.reload();
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.response?.status);
    } else {
      alert("Nieznany błąd");
    }
  }
};

export default function AdoptionsListItem({
  adoption,
  showEdit,
  showDelete,
}: AdoptionType) {
  const [miau, setmiau] = useState(false);

  return (
    <div className="bg-orange-200 rounded-2xl p-4 flex flex-col gap-1">
      <div>
        <div className="font-semibold">Adoptujący:</div>
        <div>imię: {adoption.adoptujacy.name || "BRAK DANYCH"}</div>
        <div>nazwisko: {adoption.adoptujacy.surname || "BRAK DANYCH"}</div>
        <div>
          nr telefonu: {adoption.adoptujacy.phoneNumber || "BRAK DANYCH"}
        </div>
        <div>adres e-mail: {adoption.adoptujacy.email || "BRAK DANYCH"}</div>
      </div>
      <div>
        <div className="font-semibold">Kot:</div>
        <div>imię: {adoption.kot.name || "BRAK DANYCH"}</div>
        <div>płeć: {adoption.kot.gender || "BRAK DANYCH"}</div>
        <div>kolor: {adoption.kot.color || "BRAK DANYCH"}</div>
        <div>rasa: {adoption.kot.race || "BRAK DANYCH"}</div>
      </div>
      <div className="font-semibold">
        data adopcji: {adoption.adoptionDate.slice(0, 10) || "BRAK DANYCH"}
      </div>
      {showEdit && (
        <Link
          href={`/dashboard/editadopt/${adoption.id}`}
          className="p-2 px-4 bg-amber-400 hover:bg-amber-300 rounded-xl w-fit"
        >
          Edytuj
        </Link>
      )}
      {showDelete && !miau && (
        <button
          onClick={() => setmiau(true)}
          className="p-2 px-4 mt-4 bg-red-400 hover:bg-amber-300 rounded-xl w-fit hover:cursor-pointer"
        >
          USUŃ
        </button>
      )}
      {showDelete && miau && (
        <div className="p-4 bg-orange-100 rounded-2xl">
          fr?
          <div className="flex justify-between p-2">
            <button
              onClick={() => setmiau(false)}
              className="p-2 px-4 bg-green-200 hover:bg-green-300  hover:cursor-pointer rounded-xl w-fit"
            >
              nah
            </button>
            <button
              onClick={() => handleDelete(adoption.id)}
              className="p-2 px-4 bg-red-200 hover:bg-red-300 rounded-xl w-fit hover:cursor-pointer"
            >
              yup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
