import React, { useState, useEffect, useRef } from "react";
import "./PosterSlider.css"; // Your existing CSS for poster scroll

const poster = [
  { src: "image/poster-1.png" },
  { src: "image/poster-2.png" },
  { src: "image/poster-3.png" },
  { src: "image/poster-4.png" },
  { src: "image/poster-5.png" },
  { src: "image/poster-6.png" },
  { src: "image/poster-7.png" },
  { src: "image/poster-8.png" },
  { src: "image/poster-9.png" },
  { src: "image/poster-10.png" },
  { src: "image/poster-11.png" },
  { src: "image/poster-12.png" },
  { src: "image/poster-13.png" },
  { src: "image/poster-14.png" },
  { src: "image/poster-15.png" },
];

const images = [
  {
    src: "image/homebanner-1.jpg",
    title: "Avenger Endgame",
    buttonText: "Check Movie",
  },
  {
    src: "image/homebanner-2.jpg",
    title: "SpiderMan No Way Home",
    buttonText: "Check Movie",
  },
  {
    src: "image/homebanner-3.jpg",
    title: "Captain America: Brave New World",
    buttonText: "Check Movie",
  },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [transition, setTransition] = useState(true);
  const sliderRef = useRef(null);

  const extendedImages = [images[images.length - 1], ...images, images[0]];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
      setTransition(true);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentIndex === extendedImages.length - 1) {
      setTimeout(() => {
        setTransition(false);
        setCurrentIndex(1);
      }, 700);
    }

    if (currentIndex === 0) {
      setTimeout(() => {
        setTransition(false);
        setCurrentIndex(extendedImages.length - 2);
      }, 700);
    }
  }, [currentIndex, extendedImages.length]);

  const goLeft = () => {
    setCurrentIndex((prev) => prev - 1);
    setTransition(true);
  };

  const goRight = () => {
    setCurrentIndex((prev) => prev + 1);
    setTransition(true);
  };

  const scrollingPosters = [...poster, ...poster];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Banner Slider */}
      <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 -z-10">
          <div
            ref={sliderRef}
            className={`flex h-full ${
              transition ? "transition-transform duration-700 ease-in-out" : ""
            }`}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {extendedImages.map((img, index) => (
              <div key={index} className="relative w-full h-full flex-shrink-0">
                <img
                  src={img.src}
                  alt={`Slide ${index}`}
                  className="w-full h-full object-cover"
                  draggable="false"
                />
                <div
                  className="absolute top-0 left-0 h-full flex flex-col items-center justify-center text-white 
                  px-5 sm:px-8 md:px-10 z-20 w-4/5 sm:w-2/5"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(0,0,0,0.7) 90%, rgba(0,0,0,0) 100%)",
                  }}
                >
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center">
                    {img.title}
                  </h2>
                  <button className="bg-white text-black font-semibold px-4 py-2 sm:px-6 sm:py-3 rounded-full transition hover:bg-gray-200">
                    {img.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={goLeft}
          className="absolute top-1/2 left-5 -translate-y-1/2 z-40 bg-black 
          bg-opacity-50 text-white rounded-full cursor-pointer p-3 text-2xl sm:text-3xl hover:bg-opacity-75 transition"
        >
          &#8249;
        </button>

        <button
          onClick={goRight}
          className="absolute top-1/2 right-5 -translate-y-1/2 z-40 bg-black 
          bg-opacity-50 text-white rounded-full cursor-pointer p-3 text-2xl sm:text-3xl hover:bg-opacity-75 transition"
        >
          &#8250;
        </button>
      </div>

      {/* Poster Scrolling Section */}
      <div className="overflow-hidden w-full my-10 bg-black">
        <div className="flex w-max animate-poster-scroll gap-6 px-6">
          {scrollingPosters.map((img, index) => (
            <div
              key={index}
              className="min-w-[200px] h-[300px] flex justify-center items-center rounded shadow"
            >
              <img
                src={img.src}
                alt={`Poster ${index}`}
                className="h-full object-contain hover:scale-105 transition-transform cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Movie API Section with Title, Image, Video, and Description */}
      <div className="w-full my-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          {/* Movie Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-left text-white">
            Spider-Man: Homecoming
          </h2>

          {/* Image & Video Side by Side */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-[10%]">
            {/* Image */}
            <div className="w-full lg:w-[45%]">
              <img
                src="image/home-1.jpg"
                alt="Spider-Man Poster"
                className="w-full h-auto max-h-[400px] sm:max-h-[500px] md:max-h-[600px] rounded shadow-lg object-contain"
              />
            </div>

            {/* Video */}
            <div className="w-full lg:w-[45%]">
              <div className="aspect-video w-full rounded overflow-hidden shadow-lg">
                <iframe
                  className="w-full h-[210px]"
                  src="https://www.youtube.com/embed/_GqEeagsSkY?autoplay=1&mute=1"
                  title="Spider-Man: Homecoming - Official Hindi Trailer #2 | In Cinemas 7.7.17"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>

          {/* Movie Description */}
          <p className="text-base sm:text-lg md:text-xl text-white text-left leading-relaxed">
            Peter Parker balances his life as an ordinary high school student in
            Queens with his superhero alter-ego Spider-Man, and finds himself on
            the trail of a new menace prowling the skies of New York City. This
            chapter kicks off a new phase of the Marvel Cinematic Universe with
            high stakes, grounded action, and heartfelt coming-of-age themes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
