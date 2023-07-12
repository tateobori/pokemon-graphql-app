"use client"

import React from 'react'
import { GetPokemonQuery, GetPokemonQueryVariables } from '../../lib/gql/graphql'
import { gql, useQuery } from '@apollo/client';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line } from 'recharts';
import { BaseStats } from '../../lib/generated/client';
type PokemonSearchProps = {
  name: string
}


const GetPokemonDocument = gql`
query GetPokemon($name: String!) {
  getPokemon(name: $name) {
    pokeId
    name
    baseStats {
      total
      hp
      attack
      defence
      spAttack
      spDefence
      speed
    }
  }
}
`

const PokemonStatRadarChart = ({ hp, attack, defence, spAttack, spDefence, speed }: BaseStats) => {

  const stat = [
    { subject: "HP", A: hp, fullMark: 200 },
    { subject: "こうげき", A: attack, fullMark: 20 },
    { subject: "ぼうぎょ", A: defence, fullMark: 200 },
    { subject: "とくこう", A: spAttack, fullMark: 200 },
    { subject: "とくぼう", A: spDefence, fullMark: 200 },
    { subject: "すばやさ", A: speed, fullMark: 200 },
  ]
  return (
    <ResponsiveContainer width={500} height={500} >
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={stat}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis />
        <Radar name="PokemonStats" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  )
}
const PokemonSearch = ({ name }: PokemonSearchProps) => {


  const { data, error, loading } = useQuery<GetPokemonQuery, GetPokemonQueryVariables>(GetPokemonDocument, { variables: { name: name } })

  if (loading) return <>ロード中</>
  if (error) return <div>{error.message}</div>
  if (!data?.getPokemon?.baseStats || data?.getPokemon.baseStats.hp === 0) return <div>該当するポケモンは存在しません</div>
  const pokemon = data.getPokemon



  return (
    <div className='flex flex-row justify-center items-center'>
      <div>

        <table className='border border-blue-600  divide-y divide-blue-600 '>
          <tbody className='divide-y divide-blue-600'>

            <tr>
              <th className='bg-blue-200'>{pokemon?.name}の種族値</th>
            </tr>
            <tr>
              <td className='bg-blue-100'>HP</td>
              <td>{pokemon.baseStats?.hp}</td>
            </tr>
            <tr>
              <td className='bg-blue-100'>こうげき</td>
              <td>{pokemon.baseStats?.attack}</td>
            </tr>
            <tr>
              <td className='bg-blue-100'>ぼうぎょ</td>
              <td>{pokemon.baseStats?.defence}</td>
            </tr>
            <tr>
              <td className='bg-blue-100'>とくこう</td>
              <td>{pokemon.baseStats?.spAttack}</td>
            </tr>
            <tr>
              <td className='bg-blue-100'>とくぼう</td>
              <td>{pokemon?.baseStats?.spDefence}</td>
            </tr>
            <tr>
              <td className='bg-blue-100'>すばやさ</td>
              <td>{pokemon?.baseStats?.speed}</td>
            </tr>
            <tr>
              <td className='bg-blue-100'>合計</td>
              <td>{pokemon?.baseStats?.total}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <PokemonStatRadarChart
          hp={pokemon?.baseStats!.hp}
          attack={pokemon?.baseStats!.attack}
          defence={pokemon?.baseStats!.defence}
          spAttack={pokemon?.baseStats!.spAttack}
          spDefence={pokemon?.baseStats!.spDefence}
          speed={pokemon?.baseStats!.speed}
          total={pokemon?.baseStats!.total} />
      </div>
    </div>
  )
}



export default PokemonSearch
