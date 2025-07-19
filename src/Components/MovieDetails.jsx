// MovieDetails.js
import React from "react";

const MovieDetails = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 text-white">
      <div className="rounded-lg p-6 w-full max-w-4xl relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-white text-xl font-bold"
        >
          ✕
        </button>

        <img
          src={movie.banner || movie.src}
          alt="Banner"
          className="w-full h-64 object-cover rounded"
        />

        <h2 className="text-3xl font-bold mt-4">{movie.title}</h2>
        <p className="mt-2 text-white">{movie.description || "No description available."}</p>

        {/* Character Info */}
        {movie.characters?.length > 0 && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Characters</h3>
            <div className="flex flex-wrap gap-4">
              {movie.characters.map((char, i) => (
                <div key={i} className="text-center">
                  <img
                    src={char.image}
                    alt={char.name}
                    className="w-24 h-24 object-cover rounded-full mx-auto"
                  />
                  <p className="mt-2">{char.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            ▶ Watch Movie
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
