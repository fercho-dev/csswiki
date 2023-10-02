import { Header } from './components/Header'
import { HeroText } from './components/HeroText'
import { fetchData } from './data'
import { Resource } from './types'
import { Dashboard } from './components/Dashboard'

export default async function Home() {
  const resourcesList: Resource[] = await fetchData();

  return (
    <main className="flex min-h-screen flex-col items-center pt-20 md:pt-24">
      <Header />
      <HeroText />
      <Dashboard resourcesList={resourcesList}/>
    </main>
  )
}
