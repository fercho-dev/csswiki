import { Resource, Filtro } from '../types';
import { ResourceCard } from './ResourceCard';
import { useState, useEffect } from 'react';

export function ResourceGallery({ dataList, activeFilters }: { dataList: Resource[], activeFilters: Filtro[]}) {
  useEffect(() => {
    if (activeFilters.length > 0) {
      setResourcesList(dataList.filter((resource: Resource) => activeFilters.includes(resource.filter as Filtro)))
    } else {
      setResourcesList(dataList)
    }
  }, [activeFilters])

  const [resourcesList, setResourcesList] = useState<Resource[]>(dataList)

  return (
    <section className='my-4 px-4'>
      <div className='grid gap-4 items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
        {resourcesList.map((resource: Resource, index: number) => (
          <ResourceCard key={index} {...resource} />
        ))}
      </div>
    </section>
  )
}
