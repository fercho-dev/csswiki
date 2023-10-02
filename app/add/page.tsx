import { Header } from '../components/Header'
import { CustomForm } from '../components/AddForm';

export default function Add() {

  return (
    <main className="flex min-h-screen flex-col items-center pt-20 md:pt-24">
      <Header />
      <CustomForm />
    </main>
  )
}