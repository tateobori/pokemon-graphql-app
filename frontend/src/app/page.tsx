"use client"

import PokemonSearch from "@/components/PokemonSearch";
import PokemonSelector from "@/components/PokemonSelector";
import { useEffect, useState } from "react";


export default function Home() {

  const [inputName, setInputName] = useState("") 

  useEffect(() => {
    console.log(inputName)
  }, [inputName])
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className='text-2xl font-bold text-color-red'>
        ポケモンアプリ
      </h1>
      <PokemonSelector setInputName={setInputName} />
      <PokemonSearch name={inputName} />
    </main>
  )
}
