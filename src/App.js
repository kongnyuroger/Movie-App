import React, { useEffect, useState} from "react";
import Movie from "./components/Movie";

const FEATURED_API = 'https://api.themoviedb.org/3/movie/upcoming/?api_key=f72e9b5ce93c4e6338088c039202efe7'
const IMG_API = 'http://image.tmdb.org/t/p/w1280';
const SEACH_API = 'http://api.themoviedb.org/3/search/movie/?&api_key=f72e9b5ce93c4e6338088c039202efe7&query='

function App() {
  const [ movies, setMovies ] = useState([]);
  const [ searchTerm, setsearchTerm ] = useState("");

useEffect(() => {
 getMovie(FEATURED_API)
}, []); 
 const getMovie = (API) => {
    fetch(API).then((res) => res.json()).then((data) => {
      setMovies(data.results);
     console.log(data.results);
   }); 
 }
const handleSubmit = (e) => {
   e.preventDefault();
   if(searchTerm){
      getMovie(SEACH_API + searchTerm)
      setsearchTerm('')
    }
};

const handleOnChange = (e) => {
  setsearchTerm(e.target.value)
};

  return (<>
    <header>
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder="search" className="search" value={searchTerm} onChange={handleOnChange}></input>
     </form>
   </header>
    <div className="movie_container">
    
      {movies.length > 0 && 
        movies.map((movie) => <Movie {...movie} key={movie.id}/>)}
    </div>
    </>
  );
}

export default App;