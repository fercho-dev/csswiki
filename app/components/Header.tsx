import Link from "next/link";

export function Header() {
  return (
    <div className="z-10 flex py-4 px-5 md:px-10 bg-white border-b text-white justify-between fixed top-0 left-0 right-0">
      <p className="flex space-x-2 items-center font-bold text-black cursor-default text-lg">
        <Link href="/">CSS Wiki</Link>
      </p>
      <div className="items-center flex space-x-7 cursor-pointer">
        <Link href="/add" className="text-white text-bold px-4 py-2 rounded bg-purple-500 hover:bg-purple-600 transition duration-300 hover:scale-105">Agregar</Link>
      </div>
    </div>
  );
}