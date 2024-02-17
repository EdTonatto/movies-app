import React from "react";

const MovieList = (props) => {
  return (
    <>
      {props.movies.map((movie, index) => (
        <div>
          <img src={movie.Poster} alt="movie" />
        </div>
      ))}
    </>
  );
};

export default MovieList;