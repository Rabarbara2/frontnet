"use client";

import { useEffect, useState } from "react";
import PostCatForm from "./postCarForm";
import CatListItem from "./catListItem";
import api from "@/lib/axios";

export type AdoptionType = {
  id: number;
  kotId: number;
  adoptujacyId: number;
  adoptionDate: string;
  isActive: boolean;
  adoptujacy: null;
  kot: CatType;
};

export type CatType = {
  id: number;
  name: string;
  race: string;
  gender: string;
  color: string;
  dateOfBirth: string;
  dateOfArival: string;
  isAdopted: boolean;
};

export type AdoptedCatResponse = {
  kot: CatType;
  adopcje: AdoptionType[];
};

export default function AdoptedCatList() {
  const [cats, setCats] = useState<AdoptedCatResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await api.get("/kot/adopted");
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
      Adoptowane koty:
      <div className=" grid-cols-4 grid gap-4 mt-4 ">
        {loading ? (
          <div>ładowańsko</div>
        ) : cats.length === 0 ? (
          <div>Brak kotków</div>
        ) : (
          cats.map((cat) => (
            <CatListItem
              cat={cat.kot}
              showAdopt={false}
              key={cat.kot.id}
              showEditButton={true}
            />
          ))
        )}
      </div>
    </div>
  );
}
