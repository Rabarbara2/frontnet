"use client";
import api from "@/lib/axios";
import { useEffect, useState } from "react";
import AdoptionsListItem from "./adoptionsListItem";

type AdoptionType = {
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

export default function AdoptionsList() {
  const [cats, setCats] = useState<AdoptionType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await api.get("/adopcja");
        setCats(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCats();
  }, []);
  return (
    <div className="p-6">
      Adopcje:
      <div className=" grid-cols-4 grid gap-4 mt-4 ">
        {loading ? (
          <div>ładowańsko</div>
        ) : cats.length === 0 ? (
          <div>Brak kotków</div>
        ) : (
          cats.map((cat) => <AdoptionsListItem adoption={cat} key={cat.id} />)
        )}
      </div>
    </div>
  );
}
