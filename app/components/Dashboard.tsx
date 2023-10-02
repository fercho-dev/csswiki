'use client'

import { Filters } from './Filters'
import { ResourceGallery } from './ResourceGallery'
import { filters } from '../data'
import { Filtro, Resource } from '../types'
import { useState } from 'react'

export function Dashboard({ resourcesList }: { resourcesList: Resource[]}) {
  const [activeFilters, setActiveFilters] = useState<Filtro[]>([])
  
  return (
    <>
      <Filters filters={filters} activeFilters={activeFilters} setActiveFilters={setActiveFilters}/>
      <ResourceGallery dataList={resourcesList} activeFilters={activeFilters}/>
    </>
  )
}