import React, { useEffect, useState } from "react";

const WatchLater = () => {
  const [watchList, setWatchList] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const watchListKey = `watchLaterList_${currentUser?.id || currentUser?.name}`;

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem(watchListKey)) || [];
    setWatchList(savedList);
  }, [watchListKey]);

  const removeMovie = (id) => {
    const updatedList = watchList.filter((movie) => movie.id !== id);
    setWatchList(updatedList);
    localStorage.setItem(watchListKey, JSON.stringify(updatedList));
  };

  return (
    <div className="p-20 bg-black min-h-screen">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        🎬 Watch Later List
      </h2>

      {watchList.length === 0 ? (
        <p className="text-white text-center">
          No movies in your Watch Later list.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {watchList.map((movie) => (
            <div
              key={movie.id}
              className="bg-white h-[390px] w-[290px] rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
            >
              {movie.src && (
                <div className="flex items-center justify-center h-[70%]">
                  <img
                    src={movie.src}
                    alt={movie.title}
                    className="aspect-[2/3] object-cover h-full mt-10 rounded-2xl"
                  />
                </div>
              )}

              <div className="p-3 h-[30%] flex flex-col justify-between">
                <h3 className="text-base font-semibold mb-1 text-center mt-6">{movie.title}</h3>
                {movie.year && (
                  <p className="text-sm text-gray-600 mb-2">
                    Released: {movie.year}
                  </p>
                )}
                <button
                  onClick={() => removeMovie(movie.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchLater;
