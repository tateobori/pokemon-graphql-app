import { GraphQLClient } from 'graphql-request';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables extends { [key: string]: any }>(client: GraphQLClient, query: string, variables?: TVariables, requestHeaders?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request({
    document: query,
    variables,
    requestHeaders
  });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type BaseStats = {
  __typename?: 'BaseStats';
  attack: Scalars['Int']['output'];
  defence: Scalars['Int']['output'];
  hp: Scalars['Int']['output'];
  spAttack: Scalars['Int']['output'];
  spDefence: Scalars['Int']['output'];
  speed: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type Pokemon = {
  __typename?: 'Pokemon';
  baseStats?: Maybe<BaseStats>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  pokeId: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  getPokemon?: Maybe<Pokemon>;
};


export type QueryGetPokemonArgs = {
  name: Scalars['String']['input'];
};

export type GetPokemonQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type GetPokemonQuery = { __typename?: 'Query', getPokemon?: { __typename?: 'Pokemon', pokeId: number, name: string, baseStats?: { __typename?: 'BaseStats', total: number, hp: number, attack: number, defence: number, spAttack: number, spDefence: number, speed: number } | null } | null };


export const GetPokemonDocument = `
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
    `;
export const useGetPokemonQuery = <
      TData = GetPokemonQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetPokemonQueryVariables,
      options?: UseQueryOptions<GetPokemonQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetPokemonQuery, TError, TData>(
      ['GetPokemon', variables],
      fetcher<GetPokemonQuery, GetPokemonQueryVariables>(client, GetPokemonDocument, variables, headers),
      options
    );