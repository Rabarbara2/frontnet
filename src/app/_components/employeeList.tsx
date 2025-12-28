"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
type EmployeeType = {
  id: string;
  name: string;
  surname: string;
};
export default function EmployeeList() {
  const [cats, setCats] = useState<EmployeeType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await axios.get("https://localhost:3002/api/pracownik");
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
      Pracownicy:
      <div className=" grid-cols-4 grid gap-4 mt-4 ">
        {loading ? (
          <div>ładowańsko</div>
        ) : cats.length === 0 ? (
          <div>Brak kotków</div>
        ) : (
          cats.map((cat) => (
            <Link
              key={cat.id}
              className=" bg-emerald-400 rounded-2xl p2 flex flex-col items-center"
              href={`/${cat.id}`}
            >
              <div>{cat.name || "BRAK IMIENIA"}</div>
              <div>{cat.surname || "BRAK NAZWISKA"}</div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
