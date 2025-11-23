import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center bg-gradient-purple-pink-vertical overflow-hidden relative">
      {/* Animated background gradient overlay with movement */}
      <div 
        className="absolute inset-0 bg-gradient-purple-pink-vertical opacity-90 z-0"
        style={{
          backgroundPosition: `${mousePosition.x / 50}px ${mousePosition.y / 50}px`
        }}
      ></div>
      
      {/* Enhanced decorative animated circles with more movement */}
      <motion.div 
        className="absolute top-20 left-10 w-96 h-96 bg-primary/40 rounded-full filter blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-accent/40 rounded-full filter blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      ></motion.div>
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/30 rounded-full filter blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      ></motion.div>
      
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-sunset/60 rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
          }}
        />
      ))}
      
      <div className="container-custom relative z-10 py-20">
        <motion.div 
          className="text-center max-w-5xl mx-auto"
          initial="hidden"
          animate="show"
          variants={container}
        >
          <motion.div
            variants={item}
            className="mb-6"
          >
            <motion.span
              className="inline-block text-sm md:text-base font-semibold text-sunset bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-sunset/30"
              animate={floatingAnimation}
            >
              ✨ Transform Your Dance Journey Today
            </motion.span>
          </motion.div>

          <motion.h1 
            className="mb-6 font-bold text-white drop-shadow-2xl leading-tight"
            variants={item}
          >
            <motion.span
              className="block text-5xl md:text-6xl lg:text-7xl mb-2"
              animate={{
                textShadow: [
                  "0 0 20px rgba(255, 211, 213, 0.5)",
                  "0 0 30px rgba(255, 211, 213, 0.8)",
                  "0 0 20px rgba(255, 211, 213, 0.5)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Welcome to <span className="text-sunset drop-shadow-2xl relative inline-block">
                Dance Mate
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sunset to-transparent"
                  animate={{
                    scaleX: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </span>
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto mb-12 drop-shadow-lg leading-relaxed font-light"
            variants={item}
          >
            An innovative online platform committed to elevating your dance education journey.
            <br className="hidden md:block" />
            <span className="text-sunset font-medium">Experience accessible, interactive, and community-driven</span> dance instruction
            that transforms the way you learn and grow.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center mb-20"
            variants={item}
          >
            <motion.button
              onClick={() => {
                const element = document.getElementById('dance-schools');
                if (element) {
                  const headerOffset = 80;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                  window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
              }}
              className="btn btn-primary text-lg px-8 py-4 relative overflow-hidden group"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 211, 213, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Explore Dance Schools</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-sunset to-accent opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
            </motion.button>
            <motion.button
              onClick={() => {
                const element = document.getElementById('how-it-works');
                if (element) {
                  const headerOffset = 80;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                  window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
              }}
              className="btn btn-outline text-lg px-8 py-4 border-2"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 211, 213, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              Register Your School
            </motion.button>
          </motion.div>
          
          {/* Enhanced Features Section */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
            variants={container}
          >
            <motion.div 
              className="card-gradient text-white relative overflow-hidden group"
              variants={item}
              whileHover={{ y: -15, scale: 1.03, transition: { duration: 0.3 } }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <motion.div 
                  className="text-sunset text-5xl mb-4"
                  animate={floatingAnimation}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                </motion.div>
                <h3 className="text-2xl font-bold mb-3 text-white">Personalized Learning</h3>
                <p className="text-white/90 text-lg">Tailored dance programs that match your skill level and goals</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="card-gradient text-white relative overflow-hidden group"
              variants={item}
              whileHover={{ y: -15, scale: 1.03, transition: { duration: 0.3 } }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-sunset/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <motion.div 
                  className="text-sunset text-5xl mb-4"
                  animate={floatingAnimation}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                </motion.div>
                <h3 className="text-2xl font-bold mb-3 text-white">Expert Instructors</h3>
                <p className="text-white/90 text-lg">Learn from professional dancers with years of experience</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="card-gradient text-white relative overflow-hidden group"
              variants={item}
              whileHover={{ y: -15, scale: 1.03, transition: { duration: 0.3 } }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <motion.div 
                  className="text-sunset text-5xl mb-4"
                  animate={floatingAnimation}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                </motion.div>
                <h3 className="text-2xl font-bold mb-3 text-white">Flexible Schedule</h3>
                <p className="text-white/90 text-lg">Book classes that fit your schedule and lifestyle</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;