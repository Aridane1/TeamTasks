export default function Header() {
  return (
    <>
      <div className="flex w-full justify-between border border-b-gray-700/70 md:hidden">
        <div className="flex items-center justify-center w-full">
          <img className="size-24" src="/images/TeamTaskRecortado.png" />
          <h1 className="text-4xl">TeamTask</h1>
        </div>
      </div>



      {/* //pantalla gr */}
      <div className=" hidden md:flex w-full justify-between border border-b-gray-700/70 ">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <img className="size-16" src="/images/TeamTaskRecortado.png" />
            <h1 className="text-3xl">TeamTask</h1>
          </div>
          <div>
            <a className="text-2xl mx-8">Inicio</a>
            <a className="text-2xl mx-8">Crear tarea</a>
            <a className="text-2xl mx-8">Chat</a>
          </div>

          <img src="/images/icons/userIcon.svg" alt="" />
        </div>
      </div>
    </>
  );
}
