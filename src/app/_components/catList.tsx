"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import PostCatForm from "./postCarForm";
import CatListItem from "./catListItem";
import api from "@/lib/axios";
import { BlockList } from "net";
type CatsType = {
  id: number;
  name: string;
  race: string;
  gender: string;
  color: string;
  dateOfBirth: string;
  dateOfArival: string;
  isAdopted: boolean;
};

type propType = {
  showAdopt: boolean;
};
export default function CatList({ showAdopt }: propType) {
  const [cats, setCats] = useState<CatsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await api.get("/kot");
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
      Koty:
      <div className=" grid-cols-4 grid gap-4 mt-4 ">
        {loading ? (
          <div>ładowańsko</div>
        ) : cats.length === 0 ? (
          <div>Brak kotków</div>
        ) : (
          cats.map((cat) => (
            <CatListItem
              cat={cat}
              showAdopt={showAdopt}
              key={cat.id}
              showEditButton={true}
            />
          ))
        )}
        <div
          className="cursor-pointer bg-rose-300 hover:bg-rose-400 rounded-2xl p-2 flex flex-col items-center justify-center text-xl "
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Anuluj -" : "Dodaj kot +"}
        </div>
      </div>
      {showForm && <PostCatForm />}
    </div>
  );
}
