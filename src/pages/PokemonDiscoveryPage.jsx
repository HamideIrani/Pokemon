import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import PokemonBlock from "../components/PokemonBlock"


const PokemonDiscoveryPage = () => {
  const [pokeList, setPokeList] = useState(null);

  const [filter, setFilter] = useState("");

  const params = useParams()

  const navigate = useNavigate();


  useEffect(() => {
    async function getPokemons() {
      const pokeResponse = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      setPokeList(pokeResponse.data.results);
    }
    getPokemons();
    if (params.filter) {
      setFilter(params.filter);
    }
    else {
      setFilter("");
    }
  }, []);

  const updateFilter = (e) => {
    setFilter(e.target.value);
    navigate(`/${e.target.value}`);

  }

  return (
    <div>
            <input type='text' value={filter} onChange={updateFilter}/>
      {pokeList ? (
        pokeList.filter((pokeObj) => 
        pokeObj.name.startsWith(filter)).map((pokeObj, i) => 
        <PokemonBlock key={i} name={pokeObj.name} />)
        ) : (
        <p>Loading ..</p>
      )}
    </div>
  );
}

export default PokemonDiscoveryPage;