export default function Chat() {
  return (
    <div>
      <header className="bg-navbar h-24 flex items-center justify-between">
        <a>
          <img src="/images/icons/returnIcon.svg" />
        </a>
        <p className="text-5xl text-white">El bicho</p>
        <img src="/images/icons/userIcon.svg" />
      </header>
      <div className="bg-navbar h-24 fixed w-full top-[90.5%] flex items-center justify-center">
        <input className="w-[90%] rounded-full h-14" />
      </div>
    </div>
  );
}
