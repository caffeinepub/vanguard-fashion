import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

const slides = [
  {
    image: '/assets/generated/hero-1.dim_1920x1080.png',
    title: 'Bold. Fearless. Vanguard.',
    subtitle: 'Discover fashion that celebrates your authentic self',
  },
  {
    image: '/assets/generated/hero-2.dim_1920x1080.png',
    title: 'Artistic Expression',
    subtitle: 'Where creativity meets couture',
  },
  {
    image: '/assets/generated/hero-3.dim_1920x1080.png',
    title: 'Cutting-Edge Design',
    subtitle: 'Fashion forward, always',
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
          </div>
          <div className="relative h-full flex items-center justify-center text-center px-4">
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light tracking-wide animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
                {slide.subtitle}
              </p>
            </div>
          </div>
        </div>
      ))}

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
        onClick={goToNext}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'w-12 bg-[#a932bd]' : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
