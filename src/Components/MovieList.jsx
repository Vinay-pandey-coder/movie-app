// MovieList.js
import { useEffect, useState } from "react";
import data from "./Data.json";
import MovieDetails from "./MovieDetails";

const trendingImages = [
  {
    src: "image/home-1.jpg",
    title: "Spider-Man Homecoming",
    badgeIndex: 0,
    banner: "",
    description: "Peter Parker balances high school life and superhero duties.",
    characters: [
      { name: "Peter Parker", image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSS7Aqzzyn43SzMfs09CW9l6y08xzjblJStKWoT4FTyi4gOqWB-6RN5Hjh6UDRZ8nqMf3Lxj47Uw4idaouJJxbuvd9SC2fgsDs-Oq8q8Ls" },
      { name: "Tony Stark", image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTZ_qHCcHpWzYETHFr6Elihc9ApvVm2dzU7-iB14l6Pbwjnv24kI_VEpRpMhUs-YqgghO1kToPwRZQneJrbz_Jya3t4h0pTfU8p_Kpdiw" },
    ],
  },
  {
    src: "image/poster-3.png",
    title: "Joker",
    badgeIndex: 1,
    banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-sIRUSy5ptR8wsM772eHI_FQrkDkNwtTU1w&s",
    description: "A mentally troubled stand-up comedian embarks on a violent path.",
    characters: [{ name: "Arthur Fleck", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdT21cAMdWtigkkn3pgUUMoHmulkcEZklJXuYMXz5zRl1mrySKFUJsGf-VE7Mmy5S68E5UpJDKfAtohi9s30I_pw" }],
  },
  {
    src: "image/poster-8.png",
    title: "Jurassic park",
    badgeIndex: 2,
    banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnShSlLvWjfZ1sfwz_3W4TaTwrLsqN3CQ0uw&s",
    description: "Dinosaurs run loose in a theme park. Chaos ensues.",
    characters: [{name: "Laura Dern", image : "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQQIYmCBE-7dCJIROBiIejAg75GM4FyHX92Orp0CQVOj6LcM6-sl4aR1E89Sxn3KEYVf5HiHzbYu6b7auk"}],
  },
  {
    src: "image/poster-7.png",
    title: "SuperMan",
    badgeIndex: 3,
    banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzqMdN7ftG6qQDeyYYyOhJ9Zkzj0naH-NGwg&s",
    description: "Clark Kent fights for justice as Superman.",
    characters: [      {
        name: "David Corenswet",
        image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSYN5kpI3xV_yZUdXGSRc0I8CNzZYzMkWBO0EepisttGLQdtXxKlX-0_U-rq-0eVk596lL6RQAJ0otS4E0dU0RRog"
      }],
  },
  {
    src: "image/poster-10.png",
    title: "HouseFull 5",
    badgeIndex: 4,
    banner: "https://images.moneycontrol.com/static-mcnews/2025/06/20250606050545_Housefull-5-twitter-review.jpg?impolicy=website&width=770&height=431",
    description: "A chaotic comedy of errors and mistaken identities.",
    characters: [{name:"Akshay Kumar", image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR23vZi5CLdOfEIptcvJgh08KKCHoc3hATWOFfNO6rMRxgguFPnEHKqUxagxHqdhKuIftQtTB6BbrkKJR5rszd1-g"}],
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
  const [selectedMovie, setSelectedMovie] = useState(null);

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
    setFilteredMovies(dataWithId);
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    if (query === "") {
      const regularMovies = movies.filter((movie) => !movie.trending);
      setFilteredMovies(regularMovies);
    } else {
      const filtered = movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(query) && !movie.trending
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

  const trendingMovies = movies.filter((movie) => movie.trending);

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
            className="px-4 py-2 border border-gray-300 text-white bg-transparent rounded-md focus:outline-none"
          />
        </div>
      </div>

      {/* Search Results - Only Regular Movies */}
      <div className="mt-10 px-4 flex flex-wrap justify-center gap-6 relative">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie, index) => (
            <div
              key={index}
              className="relative text-white p-[30px] rounded-lg shadow-md w-58 text-center transform transition duration-300 hover:scale-105 hover:bg-white hover:text-black cursor-pointer"
            >
              <img
                src={movie.src}
                alt={movie.title}
                onClick={() => setSelectedMovie(movie)}
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

      {/* Trending Movies */}
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
                  onClick={() => setSelectedMovie(item)}
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

      {/* Poster Detail Modal */}
      {selectedMovie && (
        <MovieDetails movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </>
  );
};

export default MovieList;
