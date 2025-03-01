import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

function DanceCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dancePhotos, setDancePhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === dancePhotos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? dancePhotos.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const fetchDancePhotos = async () => {
      try {
        const response = await axios.get(
          'https://api.unsplash.com/photos/random?count=10&query=indian+dance&orientation=landscape&width=1920&height=1080',
          {
            headers: {
              Authorization: 'Client-ID VSAMTv1dlmYTzhmiP5Df7qLc4_DNCRsxnPdIdU36bko',
            },
          }
        );

        const photos = response.data.map((photo) => ({
          imageUrl: photo.urls.regular,
          author: photo.user.name,
        }));
        setDancePhotos(photos);
        setLoading(false);
      } catch (error) {
        setError('Error fetching dance photos. Please try again later.');
        setLoading(false);
        console.error('Error fetching dance photos:', error);
      }
    };

    fetchDancePhotos();
  }, []);

  // Auto-advance slides
  useEffect(() => {
    if (dancePhotos.length > 0) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [dancePhotos, currentIndex]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {loading && (
        <div className="flex justify-center items-center h-full">
          <div className="text-lg text-primary">Loading...</div>
        </div>
      )}
      
      {error && (
        <div className="flex justify-center items-center h-full">
          <div className="text-lg text-error">{error}</div>
        </div>
      )}
      
      {dancePhotos.length > 0 && (
        <>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${dancePhotos[currentIndex].imageUrl})` }}
              >
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4 text-center">
                  <motion.h1 
                    className="text-5xl md:text-6xl font-bold mb-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    Dance Mate
                  </motion.h1>
                  <motion.h2 
                    className="text-xl md:text-2xl max-w-3xl mb-8"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    Unleashing the Rhythm Within Where Every Step Tells a Story !!
                  </motion.h2>
                  <motion.p 
                    className="text-sm opacity-80"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    Photo by {dancePhotos[currentIndex].author}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors duration-200 focus:outline-none"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors duration-200 focus:outline-none"
            aria-label="Next slide"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
            {dancePhotos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                  idx === currentIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default DanceCarousel;
