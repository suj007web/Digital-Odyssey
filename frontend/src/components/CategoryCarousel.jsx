import React from 'react';
import { Button } from "./ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Code, Palette, Database, Server, Smartphone, Brain, Cloud, Layout } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const categories = [
    { name: "Frontend Developer", icon: Layout },
    { name: "Backend Developer", icon: Server },
    { name: "Full Stack Developer", icon: Code },
    { name: "Data Scientist", icon: Database },
    { name: "Machine Learning Engineer", icon: Brain },
    { name: "DevOps Engineer", icon: Cloud },
    { name: "UI/UX Designer", icon: Palette },
    { name: "Software Engineer", icon: Code },
    { name: "System Administrator", icon: Server },
    { name: "Mobile App Developer", icon: Smartphone }
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (query)=>{
    dispatch(setSearchedQuery(query))
    navigate("/browse")
  }
  return (
    <div className="bg-black p-4">
      <Carousel 
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-xl mx-auto"
      >
        <CarouselContent className="-ml-2">
          {categories.map((cat, idx) => (
            <CarouselItem key={idx} className="pl-2 basis-1/2 sm:basis-1/3 md:basis-1/4">
              <Button 
                onClick={()=>{searchJobHandler(cat.name)}}
                className="w-full h-full py-2 px-3 rounded-full bg-gray-800 text-gray-200 border border-gray-700 hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2" 
                variant="outline"
              >
                {React.createElement(cat.icon, { size: 16, className: "text-blue-400" })}
                <span className="text-xs font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                  {cat.name}
                </span>
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex -left-10 text-gray-400 hover:text-blue-500 transition duration-200" />
        <CarouselNext className="hidden sm:flex -right-10 text-gray-400 hover:text-blue-500 transition duration-200" />
      </Carousel>
    </div>
  );
}

export default CategoryCarousel;