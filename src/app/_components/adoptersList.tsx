"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import PostCatForm from "./postCarForm";
import PostAdopterForm from "./postAdoptersForm";
import AdopterListItem from "./adopterListItem";
type AdoptersType = {
  id: 1;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  isActive: boolean;
};
export default function AdopterstList() {
  const [adopters, setAdopters] = useState<AdoptersType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchAdopters = async () => {
      try {
        const res = await axios.get("https://localhost:3002/api/adoptujacy");
        setAdopters(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdopters();
  }, []);
  return (
    <div className="p-6">
      Osoby:
      <div className=" grid-cols-4 grid gap-4 mt-4 ">
        {loading ? (
          <div>ładowańsko</div>
        ) : adopters.length === 0 ? (
          <div>Brak kotków</div>
        ) : (
          adopters.map((cat) => (
            <AdopterListItem adopter={cat} key={cat.id}/>
          ))
        )}
        <div
          className="cursor-pointer bg-purple-300 hover:bg-purple-400 rounded-2xl p-2 flex flex-col items-center justify-center text-xl "
          onClick={() => setShowForm(!showForm)}
        >
          Dodaj Osobe +
        </div>
      </div>
      {showForm && <PostAdopterForm />}
    </div>
  );
}
