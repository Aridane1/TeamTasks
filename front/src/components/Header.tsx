import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex h-[100px] items-center w-full border-b-2 border-black">
      <div className="flex items-center justify-center sm:justify-between w-full sm:w-[90%] mx-auto ">
        <div className="flex items-center">
          <img className="size-24" src="/images/TeamTaskRecortado.png" />
          <p className="text-3xl font-semibold">TeamTask</p>
        </div>
        <div className="sm:flex gap-5 hidden">
          <div className="">
            <Link to={"/home"}>Incio</Link>
          </div>
          <div className="">
            <Link to={"/createTask"}>Crear Tarea</Link>
          </div>
          <div className="">
            <Link to={"/home"}>Chat</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
