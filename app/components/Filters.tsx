import { FilterPin } from './FilterPin'
import { Filtro } from '../types'
import { MouseEventHandler } from 'react'

export function Filters({ filters, activeFilters, setActiveFilters }: { filters: Filtro[], activeFilters: Filtro[], setActiveFilters: Function }) {
  const handleFilterClick: MouseEventHandler<HTMLDivElement> = (e: any) => {
    e.preventDefault()
    const filter = e.target.innerText
    //solo puede haber un filtro activo a la vez
    if (activeFilters.includes(filter)) {
      setActiveFilters([])
    } else {
      setActiveFilters([filter])
    }

    //pueden haber varios filtros activos a la vez
    // if (activeFilters.includes(filter)) {
    //   setActiveFilters(activeFilters.filter((activeFilter: Filtro) => activeFilter !== filter))
    // } else {
    //   setActiveFilters([...activeFilters, filter])
    // }
  }

  return (
    <section className='px-6 w-full md:px-10'>
      <details className='md:hidden my-4'>
        <summary className='text-gray-600 font-medium text-sm'>Filtros</summary>
        <div className='flex flex-wrap gap-4 px-4 my-4'>
          {filters.map((filter: Filtro, index: number) => (
            <FilterPin key={index} text={filter} isActive={activeFilters.includes(filter)} handleFilterClick={handleFilterClick} />
          ))}
        </div>
      </details>

      <div className='hidden md:flex flex-wrap justify-center gap-4 px-8 my-4'>
        {filters.map((filter: Filtro, index: number) => (
          <FilterPin key={index} text={filter} isActive={activeFilters.includes(filter)} handleFilterClick={handleFilterClick} />
        ))}
      </div>
    </section>
  )
}