import React, { useEffect, useState } from "react";
const data = [
  {
    id: 1,
    title: "Bet on the thrill, not just the game.",
    image:
      "/assets/Betting1.avif",
  },
  {
    id: 2,
    title: "Get ready for the grand slam of bets! ",
    image:
"/assets/Betting2.avif",  },
  {
    id: 3,
    title: "The upcoming tournament is like a chessboard. ",
    image:
"/assets/Betting3.avif",  },
];


const Carousel = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="flex flex-col lg:flex-row w-full h-[calc(100vh-6rem)] lg:h-[calc(100vh-9rem)] bg-fuchsia-50 overflow-hidden">
      {/* TEXT CONTAINER */}
      <div   className="flex-1  flex items-center justify-center flex-col gap-8 bg-gradient-to-r from-slate-950 to-gray-950 font-bold p-4 md:p-10">
        <h1 className="text-5xl text-center uppercase bg-gradient-to-r from-teal-500 via-violet-600 to-sky-600 bg-clip-text text-transparent md:text-6xl xl:text-7xl">
          {data[currentSlide].title}
        </h1>
        <button className="bg-gradient-to-r from-sky-600  transition-transition ease-in-out duration-200 delay-200 text-white py-4 px-8 hover:scale-105 hover:bg-emerald-500  rounded">
          Place Bet Now
        </button>
      </div>
      {/* IMAGE CONTAINER */}
      <div  className="w-full flex-1   relative overflow-hidden">
        <img
        
          src={data[currentSlide].image}
          alt=""
          layout="fill"
          objectFit="cover"
          className="h-full w-full"
        />
      </div>
    </div>
  );
};

export default Carousel;