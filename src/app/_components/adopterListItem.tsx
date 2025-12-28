import axios from "axios";
import { useState } from "react";

type AdoptersType = {
  adopter: {
    id: 1;
    name: string;
    surname: string;
    phoneNumber: string;
    email: string;
    isActive: boolean;
  };
};

export default function AdopterListItem(cat: AdoptersType) {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div className=" bg-fuchsia-300 hover:bg-fuchsia-400 rounded-2xl p-2 flex flex-col items-center">
      <div>{cat.adopter.name || "BRAK IMIENIA"}</div>
      <div>{cat.adopter.surname || "BRAK NAZWISKA"}</div>
      <div>{cat.adopter.phoneNumber || "BRAK NUMERU"}</div>
      <div>{cat.adopter.email || "BRAK MAILA"}</div>
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
          className="text-red-500 p-1.5 bg-pink-100 rounded-xl m-6 hover:bg-red-500 hover:text-white hover:cursor-pointer"
          onClick={() => setShowDelete(!showDelete)}
        >
          USUŃ
        </div>
      )}
    </div>
  );
}

async function DeleteAdopter(id: number) {
  const response = await axios.delete(
    `https://localhost:3002/api/adoptujacy/${id}`
  );
  window.location.reload();
  return response.data;
}
