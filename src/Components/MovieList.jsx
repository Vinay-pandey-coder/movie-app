import { useEffect, useState } from "react";
import data from "./Data.json";

const trendingImages = [
  {
    src: "image/home-1.jpg",
    title: "Spider-Man Homecoming",
    badgeIndex: 0,
  },
  {
    src: "image/poster-3.png",
    title: "Joker",
    badgeIndex: 1,
  },
  {
    src: "image/poster-8.png",
    title: "Jurassic park",
    badgeIndex: 2,
  },
  {
    src: "image/poster-7.png",
    title: "SuperMan",
    badgeIndex: 3,
  },
  {
    src: "image/poster-10.png",
    title: "HouseFull 5",
    badgeIndex: 4,
  },
];

const badgeImages = [
  "https://freepngimg.com/save/129685-1-number-download-hq/2000x2588",
  "https://www.indiaparenting.com/coloring-pages/uploads/5f8977efd2b58.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Classic_alphabet_numbers_3_at_coloring-pages-for-kids-boys-dotcom.svg/1582px-Classic_alphabet_numbers_3_at_coloring-pages-for-kids-boys-dotcom.svg.png",
  "https://i.pinimg.com/originals/a4/68/7d/a4687da4ebdb7eff9713edc826564bae.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Classic_alphabet_numbers_5_at_coloring-pages-for-kids-boys-dotcom.svg/640px-Classic_alphabet_numbers_5_at_coloring-pages-for-kids-boys-dotcom.svg.png",
];

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  // Get current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const watchListKey = `watchLaterList_${currentUser?.id || currentUser?.name}`;

  useEffect(() => {
    const trendingWithFlag = trendingImages.map((item) => ({
      ...item,
      trending: true,
      id: item.title.toLowerCase().replace(/\s/g, "-"),
    }));

    const dataWithId = data.map((movie, index) => ({
      ...movie,
      id: movie.title?.toLowerCase().replace(/\s/g, "-") || index,
      trending: false,
    }));

    const allMovies = [...dataWithId, ...trendingWithFlag];
    setMovies(allMovies);
    setFilteredMovies(allMovies);
  }, []);

  // Update filteredMovies as user types
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    if (query === "") {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(query)
      );
      setFilteredMovies(filtered);
    }
  }, [searchQuery, movies]);

  const addToWatchLater = (movie) => {
    const existingList = JSON.parse(localStorage.getItem(watchListKey)) || [];
    const isAlreadySaved = existingList.some((m) => m.id === movie.id);

    if (!isAlreadySaved) {
      const updatedList = [...existingList, movie];
      localStorage.setItem(watchListKey, JSON.stringify(updatedList));
      alert("✅ Added to Watch Later");
    } else {
      alert("⚠️ Already in Watch Later list");
    }
  };

  const trendingMovies = filteredMovies.filter((movie) => movie.trending);
  const regularMovies = filteredMovies.filter((movie) => !movie.trending);

  return (
    <>
      {/* Search Box */}
      <div className="pt-24 flex justify-center">
        <div className="text-white p-6 rounded shadow-md flex gap-2">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-gray-300 text-white rounded-md focus:outline-none"
          />
        </div>
      </div>

      {/* Search Results (trending + regular together) */}
      <div className="mt-10 px-4 flex flex-wrap justify-center gap-6 relative">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie, index) => (
            <div
              key={index}
              className="relative text-white p-[30px] rounded-lg shadow-md w-58 text-center transform transition duration-300 hover:scale-105 hover:bg-white hover:text-black cursor-pointer"
            >
              {/* Badge image for trending movies */}
              {movie.trending && (
                <img
                  src={badgeImages[movie.badgeIndex] || ""}
                  alt={`Number ${movie.badgeIndex + 1}`}
                  className="absolute -left-6 top-1/2 transform -translate-y-1/2 h-[40px] w-auto z-10 rounded-full"
                />
              )}

              <img
                src={movie.src}
                alt={movie.title}
                className="object-cover h-64 w-full rounded hover:shadow-lg"
              />
              <h2 className="mt-2 text-lg font-semibold">{movie.title}</h2>
              <button
                onClick={() => addToWatchLater(movie)}
                className="mt-2 bg-green-600 px-3 py-1 rounded flex items-center overflow-hidden w-8 hover:w-32 transition-[width] duration-300 ease-in-out"
              >
                <span className="mx-auto hover:mx-0">+</span>
                <span className="ml-[9px] cursor-pointer whitespace-nowrap opacity-100 transition-opacity duration-300 text-white">
                  Watch Later
                </span>
              </button>
            </div>
          ))
        ) : (
          <p className="text-white text-xl mt-10">No movies found</p>
        )}
      </div>

      {/* Trending Movies (only show if no search query) */}
      {searchQuery === "" && (
        <div>
          <h1 className="text-3xl font-bold text-white text-center mt-12">
            Trending Movies
          </h1>

          <div className="relative flex justify-center gap-12 mt-10 flex-wrap border-b-[25px]">
            {trendingMovies.map((item, index) => (
              <div
                key={index}
                className="relative transform transition duration-300 hover:scale-105"
              >
                <img
                  src={badgeImages[item.badgeIndex] || ""}
                  alt={`Number ${item.badgeIndex + 1}`}
                  className="absolute -left-10 top-1/2 transform -translate-y-1/2 h-[60px] w-auto z-10 rounded-full"
                />

                <img
                  src={item.src}
                  alt={item.title}
                  className="w-auto h-[300px] rounded shadow-lg cursor-pointer"
                />
                <h2 className="text-white text-center mt-2 font-semibold">
                  {item.title}
                </h2>
                <div className="text-center mt-2">
                  <button
                    onClick={() => addToWatchLater(item)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    + Watch Later
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MovieList;
