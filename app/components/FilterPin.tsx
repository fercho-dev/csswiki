import { Filtro } from "../types";
import { MouseEventHandler } from "react";

export function FilterPin({ text, isActive, handleFilterClick }: { text: Filtro, isActive: boolean, handleFilterClick: MouseEventHandler<HTMLDivElement> }) {
  const clasess = `${isActive ? 'bg-indigo-100' : 'bg-gray-50'} flex items-center text-gray-600 cursor-pointer py-1.5 px-3 rounded shadow-sm border whitespace-nowrap border-gray-300 hover:border-gray-400`
  
  return (
    <div className={clasess} onClick={handleFilterClick}>
      <span>{text}</span>
    </div>
  )
}