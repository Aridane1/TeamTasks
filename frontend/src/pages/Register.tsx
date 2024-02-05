export default function Register() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-8xl mt-14">Inicio</h1>
      <img className="size-48 mt-10" src="images/TeamTaskRecortado.png" />

      <div className="flex flex-col items-center">
        <form className="flex flex-col w-fit mt-10">
          <label className="text-3xl my-2">Nombre de usuario</label>
          <input
            className="border-1 border-gray-300 rounded-full p-2 m-2 w-80 h-14"
            type="text"
          />
          <label className="text-3xl my-2">Correo</label>
          <input
            className="border-1 border-gray-300 rounded-full p-2 m-2 w-80 h-14"
            type="text"
          />
          <label className="text-3xl my-2">Contraseña</label>
          <input
            className="border-1 border-gray-300 rounded-full p-2 m-2 w-80 h-14"
            type="text"
          />
          <button
            className="mt-8 border-2 border-gray-300 p-2 m-2 rounded-full text-4xl text-white bg-navbar"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
