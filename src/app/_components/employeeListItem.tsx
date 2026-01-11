import api from "@/lib/axios";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type FormType = {
  id: string;
  name: string;
  surname: string;
  userName: string;
};
type RoleFormType = {
  user: string;
  role: string;
};

type PracownikType = {
  id: string;
  name: string;
  surname: string;
  userName: string;
  roles: [name: string];
};

export default function EmploListItem(pracownik: PracownikType) {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAddRoles, setShowAddRoles] = useState(false);
  const [showRemoveRoles, setShowRemoveRoles] = useState(false);
  const [availableRoles, setAvailableRoles] = useState<
    { name: string; id: string }[]
  >([]);

  const { register, handleSubmit, reset } = useForm<FormType>({
    defaultValues: {
      id: pracownik.id,
      name: pracownik.name,
      surname: pracownik.surname,
      userName: pracownik.userName,
    },
  });
  const {
    register: registerAddRole,
    handleSubmit: handleSubmitAddRole,
    reset: resetAddRole,
  } = useForm<RoleFormType>({
    defaultValues: {
      user: pracownik.userName,
    },
  });
  const {
    register: registerRemoveRole,
    handleSubmit: handleSubmitRemoveRole,
    reset: resetRemoveRole,
  } = useForm<RoleFormType>({
    defaultValues: {
      user: pracownik.userName,
    },
  });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get("/Admin/roles");
        setAvailableRoles(response.data);
      } catch (err) {
        console.error("Nie udało się pobrać ról:", err);
      }
    };

    fetchRoles();
  }, []);

  const onSubmit = async (data: FormType) => {
    try {
      const payload = {
        ...data,
      };

      await api.put(`/pracownik/${pracownik.id}`, payload);
      alert("Zapisano zmiany!");
      setShowEdit(false);
      reset(data);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Błąd przy zapisie!");
    }
  };
  const onAddRole = async (data: RoleFormType) => {
    try {
      const payload = {
        ...data,
      };

      await api.post(`/Admin/assign-role`, payload);
      alert("Zapisano zmiany!");
      setShowAddRoles(false);
      resetAddRole(data);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Błąd przy zapisie!");
    }
  };
  const onRemoveRole = async (data: RoleFormType) => {
    try {
      await api.delete("/Admin/unassign-role", {
        data: {
          user: data.user,
          role: data.role,
        },
      });
      alert("Zapisano zmiany!");
      setShowRemoveRoles(false);
      resetRemoveRole(data);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Błąd przy zapisie!");
    }
  };

  return (
    <div className="bg-emerald-300 hover:bg-emerald-400 rounded-2xl p-2 flex flex-col items-center w-full">
      {/* 🔹 FORMULARZ EDYCJI */}
      {showEdit ? (
        <div className="w-full">
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
              <label>login: </label>
              <input
                {...register("userName")}
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
        /* 🔹 PODGLĄD PRACOWNIKA */
        <div className="w-full p-4">
          <div>imię: {pracownik.name || "BRAK IMIENIA"}</div>
          <div>nazwisko: {pracownik.surname || "BRAK NAZWISKA"}</div>
          <div>login: {pracownik.userName || "BRAK LOGINU"}</div>
        </div>
      )}

      {/* 🔹 GUZIKI EDYTUJ I USUŃ */}
      <div className="flex justify-around w-full mt-2">
        {/* Edytuj */}
        {showEdit ? null : (
          <div
            className="text-emerald-600 p-1.5 bg-pink-100 rounded-xl hover:bg-emerald-500 hover:text-white hover:cursor-pointer"
            onClick={() => setShowEdit(true)}
          >
            Edytuj
          </div>
        )}

        {/* Usuń */}
        {showDelete ? null : (
          <div
            className="text-red-500 p-1.5 bg-pink-100 rounded-xl hover:bg-red-500 hover:text-white hover:cursor-pointer"
            onClick={() => setShowDelete(true)}
          >
            USUŃ
          </div>
        )}
      </div>

      {/* 🔹 POTWIERDZENIE USUNIĘCIA */}
      {showDelete && (
        <div className="w-full bg-red-100 rounded-2xl p-3 mt-3">
          <div>fr?</div>
          <div className="flex justify-between px-6 mt-2">
            <div
              className="bg-red-300 rounded-xl px-2 py-1 hover:bg-red-400 hover:cursor-pointer"
              onClick={() => DeleteAdopter(pracownik.id)}
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
      )}

      {/* 🔹 ROLE PRACOWNIKA */}
      <div className="p-4 w-full">
        role:
        <div className="flex flex-col items-center gap-2 mt-2">
          {pracownik.roles.map((rola) => (
            <div key={rola} className="px-2 py-1 w-fit bg-amber-300 rounded">
              {rola}
            </div>
          ))}
        </div>
        <div className="flex justify-around p-6">
          <div
            className="px-3 py-1.5 bg-orange-300 rounded hover:bg-orange-400 hover:cursor-pointer"
            onClick={() => {
              setShowAddRoles(true);
              setShowRemoveRoles(false);
            }}
          >
            nadaj rolę
          </div>
          <div
            className="px-3 py-1.5 bg-blue-200 rounded hover:bg-blue-300 hover:cursor-pointer"
            onClick={() => {
              setShowRemoveRoles(true);
              setShowAddRoles(false);
            }}
          >
            usuń rolę
          </div>
        </div>
        {showAddRoles && (
          <form
            onSubmit={handleSubmitAddRole(onAddRole)}
            className="flex flex-col gap-3 p-2 w-full"
          >
            <div>
              <label>Wybierz rolę do nadania: </label>
              <select
                {...registerAddRole("role")}
                className="bg-pink-100 rounded p-1 w-full"
                defaultValue=""
              >
                <option value="" disabled>
                  Wybierz rolę
                </option>
                {availableRoles.map((r) => (
                  <option key={r.id} value={r.name}>
                    {r.name}
                  </option>
                ))}
              </select>
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
                  onClick={() => setShowAddRoles(false)}
                >
                  nah
                </div>
              </div>
            </div>
          </form>
        )}
        {showRemoveRoles && (
          <form
            onSubmit={handleSubmitRemoveRole(onRemoveRole)}
            className="flex flex-col gap-3 p-2 w-full"
          >
            <div>
              <label>wybierz rolę do usunięcia: </label>
              <select
                {...registerRemoveRole("role")}
                className="bg-pink-100 rounded p-1 w-full"
                defaultValue=""
              >
                <option value="" disabled>
                  Wybierz rolę
                </option>
                {pracownik.roles.map((rola) => (
                  <option key={rola} value={rola}>
                    {rola}
                  </option>
                ))}
              </select>
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
                  onClick={() => setShowRemoveRoles(false)}
                >
                  nah
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

async function DeleteAdopter(id: string) {
  const response = await api.delete(`pracownik/${id}`);
  window.location.reload();
  return response.data;
}
