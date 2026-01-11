"use client";
import api from "@/lib/axios";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import EmployeeListItem from "./employeeListItem";
type PracownikType = {
  id: string;
  name: string;
  surname: string;
  userName: string;
  roles: [name: string];
};
export default function EmployeeList() {
  const [cats, setCats] = useState<PracownikType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await api.get("pracownik");
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
          <div>Brak pracowników</div>
        ) : (
          cats.map((cat) => <EmployeeListItem {...cat} key={cat.id} />)
        )}
      </div>
    </div>
  );
}
