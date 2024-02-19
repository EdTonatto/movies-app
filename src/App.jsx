import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavorite from "./components/AddFavorites";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMoviesRequest = async (searchValue) => {
    const url = `${process.env.MOVIES_APP_OMBD_API_URL}?s=${searchValue}&apikey=${process.env.MOVIES_APP_OMDB_API_KEY}`;

    const response = await (await fetch(url)).json();

    if(response.Search)
      setMovies(response.Search);
  }

  useEffect(() => {
    getMoviesRequest(searchValue);
  }, [searchValue]);

  const addFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
  };

  return (
    <div className="container-fluid movies-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies"/>
        <SearchBox setSearchValue={setSearchValue}/>
      </div>
      <div className="row">
        <MovieList movies={movies} handleFavoriteClick={addFavoriteMovie} favoriteComponent={AddFavorite} />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favorites"/>
      </div>
      <div className="row">
        <MovieList movies={favorites} handleFavoriteClick={addFavoriteMovie} favoriteComponent={AddFavorite} />
      </div>
    </div>
  );
}

export default App;