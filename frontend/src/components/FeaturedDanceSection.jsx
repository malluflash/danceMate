import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const DanceCard = ({ image, title, description }) => (
  <motion.div 
    className="relative overflow-hidden rounded-xl group"
    whileHover={{ y: -5 }}
    transition={{ duration: 0.3 }}
  >
    <div className="aspect-w-16 aspect-h-9 overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end">
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-200 text-sm">{description}</p>
    </div>
  </motion.div>
);

const danceStyles = [
  {
    id: 1,
    title: "Bharatanatyam",
    description: "A classical Indian dance form originating from Tamil Nadu",
    image: "https://images.unsplash.com/photo-1596778402202-ebe7b9b0b988?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Kathak",
    description: "A major classical dance form of Northern India",
    image: "https://images.unsplash.com/photo-1576074972488-0e5a72cc4d4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Contemporary",
    description: "A style of expressive dance combining elements of several dance genres",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Hip Hop",
    description: "A street dance style primarily performed to hip-hop music",
    image: "https://images.unsplash.com/photo-1535525153412-5a42439a210d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Salsa",
    description: "A popular social dance originating from the Caribbean",
    image: "https://images.unsplash.com/photo-1545959570-a94084071b5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "Ballet",
    description: "A classical dance form characterized by precise movements",
    image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

function FeaturedDanceSection() {
  const [featuredDances, setFeaturedDances] = useState(danceStyles);
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full">
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-lg text-white/80">Loading...</div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDances.map((dance) => (
              <DanceCard 
                key={dance.id}
                image={dance.image}
                title={dance.title}
                description={dance.description}
              />
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-accent text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Explore All Dance Styles
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeaturedDanceSection; 