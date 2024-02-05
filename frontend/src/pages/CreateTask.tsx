export default function CreateTask() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-7xl mt-8">Tareas</h1>
      <form className="flex flex-col w-fit mt-10">
        <label className="text-3xl my-2">Titulo</label>
        <input
          className="border-1 border-gray-300 rounded-full text-3xl p-2 m-2 w-80 h-14"
          type="text"
        />
        <label className="text-3xl my-2">Descripcion</label>
        <textarea className="border-1 h-40 border-gray-300 rounded-3xl text-3xl p-2 m-2 w-80"></textarea>
        <label className="text-3xl my-2">Etiquetas</label>
        <input
          className="border-1 border-gray-300 rounded-full p-2 m-2 w-80 text-3xl h-14"
          type="text"
        />
        <label className="text-3xl my-2">Colaboradores</label>
        <select className="border-1 text-2xl border-gray-300 rounded-full p-2 m-2 w-80 h-14">
          <option>Hola</option>
        </select>
        <button
          className="mt-8 border-2 border-gray-300 p-2 m-2 rounded-full text-4xl text-white bg-navbar"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
}
