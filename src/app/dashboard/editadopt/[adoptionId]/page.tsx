"use client";

import CatListItem from "@/app/_components/catListItem";
import Header from "@/app/_components/header";
import api from "@/lib/axios";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type CatType = {
  id: number;
  name: string;
  race: string;
  gender: string;
  color: string;
  dateOfBirth: string;
  dateOfArival: string;
  isAdopted: boolean;
};
type AdoptersType = {
  id: 1;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  isActive: boolean;
};
type AdopcjaType = {
  id: number;
  kotId: number;
  adoptujacyId: number;
  AdoptionDate: string;
  isActive: boolean;
  kot: CatType;
  adoptujacy: AdoptersType;
};
type AdopcjaDTO = {
  id: number;
  kotId: number;
  adoptujacyId: number;
};

export default function Page() {
  const { adoptionId } = useParams<{ adoptionId: string }>();

  const [adopcja, setAdopcja] = useState<AdopcjaType>();
  const [ready, setReady] = useState(false);
  const [adopters, setAdopters] = useState<AdoptersType[]>([]);
  const [cats, setCats] = useState<CatType[]>([]);
  const [chosenOne, setChosenOne] = useState<AdoptersType>();
  const [chosenKot, setChosenKot] = useState<CatType>();
  const router = useRouter();

  useEffect(() => {
    const fetchCat = async () => {
      try {
        console.log(localStorage.getItem("token"));
        const res = await api.get(`/adopcja/${adoptionId}`);
        setAdopcja(res.data);
        setChosenOne(res.data.adoptujacy);
        setChosenKot(res.data.kot);
      } catch (err) {
        console.error(err);
      } finally {
        setReady(true);
      }
    };
    fetchCat();
  }, [adoptionId]);

  useEffect(() => {
    const fetchAdopters = async () => {
      try {
        const res = await api.get("/adoptujacy");
        setAdopters(res.data);
      } catch (err) {
        console.error(err);
      } finally {
      }
    };
    fetchAdopters();
  }, []);
  useEffect(() => {
    const fetchKoty = async () => {
      try {
        const res = await api.get("/kot");
        let koty = res.data as CatType[];

        if (adopcja?.kot) {
          koty = [adopcja.kot, ...koty];
        }

        setCats(koty);
      } catch (err) {
        console.error(err);
      }
    };
    fetchKoty();
  }, [adopcja]);

  if (!ready) {
    return <div>Ładowanko</div>;
  }
  if (!adopcja) {
    return (
      <div>
        <div className="m-5 flex flex-col gap-5 w-fit items-center">
          <div>nie znaleziono takiej adopcji</div>
          <Link
            className="p-1 px-2 bg-amber-100 rounded hover:bg-amber-200"
            href={"/"}
          >
            Wróć na stronę główną
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="h-18" />
      <div className="w-full flex gap-5 p-2">
        <div className="w-1/2">
          <div className="mt-6">kotki: </div>
          <div className=" grid-cols-3 grid gap-4 mt-4">
            {cats.map((cat) => (
              <div key={cat.id} onClick={() => setChosenKot(cat)}>
                <CatListItem
                  cat={cat}
                  showAdopt={false}
                  showEditButton={false}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-2/4">
          <div></div>
          <div className="p-6">
            Osoby:
            <div className=" grid-cols-3 grid gap-4 mt-4 ">
              {adopters.length === 0 ? (
                <div>Brak osób adoptujących</div>
              ) : (
                adopters.map((cat) => (
                  <div
                    key={cat.id}
                    className="bg-fuchsia-300 p-6 rounded-2xl hover:cursor-pointer hover:bg-fuchsia-400"
                    onClick={() => setChosenOne(cat)}
                  >
                    <div>{cat.name || "BRAK IMIENIA"}</div>
                    <div>{cat.surname || "BRAK NAZWISKA"}</div>
                    <div>{cat.phoneNumber || "BRAK NUMERU"}</div>
                    <div>{cat.email || "BRAK MAILA"}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full text-center flex justify-center text-lg p-6">
        {chosenOne &&
          chosenKot &&
          potwierdzenie(chosenKot, chosenOne, router, adopcja.id)}
      </div>
    </div>
  );
}

function potwierdzenie(
  kotek: CatType,
  chosenOne: AdoptersType,
  router: AppRouterInstance,
  adopcjaid: number
) {
  const handlePost = async () => {
    const data: AdopcjaDTO = {
      id: adopcjaid,
      kotId: kotek.id,
      adoptujacyId: chosenOne.id,
    };
    const success = await postAdopcja(data);
    if (success) {
      router.push("/dashboard");
    }
  };
  return (
    <div>
      Kot {kotek.name} będzie adoptowany przez {chosenOne.name}{" "}
      {chosenOne.surname}.
      <div className="p-2">
        <div>Czy potwierdzasz?</div>
        <div className=" flex gap-8 justify-center p-2">
          <div
            className="px-3 rounded p-2 bg-green-300 w-fit hover:cursor-pointer hover:bg-green-400"
            onClick={handlePost}
          >
            Tak
          </div>
          <div
            className="px-3 rounded p-2 bg-red-300 w-fit hover:cursor-pointer hover:bg-red-400"
            onClick={() => router.push("/dashboard")}
          >
            Nie
          </div>
        </div>
      </div>
    </div>
  );
}

async function postAdopcja(dto: AdopcjaDTO) {
  const data = {
    id: dto.id,
    kotId: dto.kotId,
    adoptujacyId: dto.adoptujacyId,
  };

  try {
    const response = await api.put("/adopcja", data);

    if (response.status === 200) {
      alert("Dodano adopcję!");
      return 1;
    } else {
      alert(response.status);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(
        error.response?.data?.message ||
          `Wystąpił błąd ${error.code} podczas dodawania adopcji`
      );
    } else {
      alert("Nieznany błąd");
    }
  }
}
