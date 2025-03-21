import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon} from './utils/pokemon.js';
import Card from './components/Card/Card.js';
import Navbar from './components/Navbar/Navbar.js';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon?limit=20"
  const [loading, setLoading] = useState(true)
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");

  useEffect(()=> {
    const fetchPokemonData = async() => {
      //全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      // 各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      console.log(res);
      setNextURL(res.next)
      setLoading(false);
    };
    fetchPokemonData();
  },[]);
  
  const loadPokemon = async(data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        // console.log(pokemon);
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  // console.log(pokemonData);

  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    // console.log(data);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setLoading(false);
  };

  const handlePrevPage = async() => {
    if(!prevURL) return;

    setLoading(true);
    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previouis);
    setLoading(false);
  };

  return (
    <>
    <Navbar />
      <div className="App">
        {/* 三項演算子で表示を切り替え */}
        {loading ? (
          <h1>ロード中・・・</h1>
        ) : (
          <>
            {/* <h1>ポケモンデータを取得しました</h1> */}
            <div className='pokemonCardContainer'>
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            <div className='btn'>
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
