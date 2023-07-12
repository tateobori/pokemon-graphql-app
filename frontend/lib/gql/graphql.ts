/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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


export const GetPokemonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPokemon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPokemon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pokeId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"baseStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"hp"}},{"kind":"Field","name":{"kind":"Name","value":"attack"}},{"kind":"Field","name":{"kind":"Name","value":"defence"}},{"kind":"Field","name":{"kind":"Name","value":"spAttack"}},{"kind":"Field","name":{"kind":"Name","value":"spDefence"}},{"kind":"Field","name":{"kind":"Name","value":"speed"}}]}}]}}]}}]} as unknown as DocumentNode<GetPokemonQuery, GetPokemonQueryVariables>;