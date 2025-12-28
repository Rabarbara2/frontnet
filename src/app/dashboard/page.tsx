import Link from "next/link";
import LogoutButton from "../_components/logout";
import CatList from "../_components/catList";
import EmployeeList from "../_components/employeeList";
import AdopterstList from "../_components/adoptersList";

export default function Home() {
  const token = localStorage.getItem("token");

  return (
    <div className="flex flex-col w-full min-h-screen bg-zinc-50 over">
      <div className="w-full p-6 font-semibold bg-amber-200 h-fit flex justify-between">
        <div className=" text-center text-4xl">Schronisko 2</div>

        <div className="flex gap-4  font-normal ">
          <div className="w-fit ">{token && <LogoutButton />}</div>
          {!token && (
            <Link
              className=" bg-blue-500  text-white p-2 text-lg rounded-xl  hover:bg-blue-600 hover:cursor-pointer"
              href={"/login"}
            >
              Zaloguj się
            </Link>
          )}
        </div>
      </div>
      <CatList />
      <EmployeeList />
      <AdopterstList />
    </div>
  );
}
