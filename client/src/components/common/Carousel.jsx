
const Carousel = () => {
  return (
    <>
   <div className="carousel w-full">
  <div id="item1" className="carousel-item w-full">
    <img src="/assets/Betting1.avif" className="w-full h-96" />
  </div> 
  <div id="item2" className="carousel-item w-full">
    <img src="/assets/Betting2.avif" className="w-full h-96" />
  </div> 
  <div id="item3" className="carousel-item w-full">
    <img src="/assets/Betting3.avif" className="w-full h-96" />
  </div> 
  <div id="item4" className="carousel-item w-full">
    <img src="/assets/Betting4.avif" className="w-full h-96" />
  </div>
</div> 
<div className="flex justify-center w-full py-2 gap-2">
  <a href="#item1" className="btn btn-xs">1</a> 
  <a href="#item2" className="btn btn-xs">2</a> 
  <a href="#item3" className="btn btn-xs">3</a> 
  <a href="#item4" className="btn btn-xs">4</a>
</div>
</>
  )
}

export default Carousel