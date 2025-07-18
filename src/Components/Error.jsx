import React from 'react';

const Error = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-black to-gray-900 text-white px-6">
      <div className="text-center animate-fade-in">
        <h1 className="text-7xl font-extrabold text-red-600 drop-shadow-lg">404</h1>
        <h2 className="text-3xl mt-4 font-bold">Oops! Page not found</h2>
        <p className="mt-2 text-gray-300">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-block mt-6 px-6 py-2 text-lg bg-red-600 hover:bg-red-700 transition-all duration-300 rounded-full font-semibold"
        >
          Go Home
        </a>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Error;
