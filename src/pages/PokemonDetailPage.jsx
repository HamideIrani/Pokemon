import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function PokemonDetailPage() {
  const routeParams = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect( () => {
    async function getPokemonDetails() {
      const pokemonResponse = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${routeParams.pokemon_name}`
      );
      setPokemon(pokemonResponse.data);
    }
    getPokemonDetails();
  }, []);

  return pokemon ? (
    <div>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} />
      <p>Types: {pokemon.types.map((typeObj) => <span>{typeObj.type.name} </span>)}</p>
      <p>Weight: {pokemon.weight} hectograms</p>
    </div>
  ) : (
    <p>Loading ...</p>
  );
}

export default PokemonDetailPage;