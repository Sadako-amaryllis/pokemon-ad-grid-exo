import { useQuery } from 'react-query';

const BASE_URL = 'https://pokeapi.co/api/v2';

export interface Pokemon {
  id: number;
  name: string;
  type: string;
  sprites: {
    front_default: string;
  };
  size: number;
}

export const getPokemons = async () => {
  const response = await fetch(`${BASE_URL}/pokemon?limit=100`);
  const data = await response.json();

  const pokemonDetails = await Promise.all(
    data.results.map(async (pokemon: { url: string }) => {
      const response = await fetch(pokemon.url);
      return response.json();
    })
  );

  const pokemons: Pokemon[] = data.results.map((pokemon: { name: string }, index: number) => ({
    id: index + 1,
    name: pokemon.name,
    type: pokemonDetails[index]?.types[0]?.type?.name || 'Unknown',
    sprites: {
      front_default: pokemonDetails[index]?.sprites?.front_default || '',
    },
  }));

  return pokemons;
};

export const useGetPokemons = () => {
  return useQuery<Pokemon[]>('pokemons', getPokemons);
};