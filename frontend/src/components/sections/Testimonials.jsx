import { motion } from 'framer-motion';
import { useState } from 'react';

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Dance Student",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    text: "DanceMate has completely transformed my dance journey! The variety of classes and expert instructors make learning so enjoyable. I've improved so much in just a few months.",
    rating: 5,
    danceStyle: "Bharatanatyam"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    role: "Dance School Owner",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    text: "As a dance school owner, DanceMate has helped us reach so many more students. The booking system is seamless and the platform is incredibly user-friendly. Highly recommended!",
    rating: 5,
    danceStyle: "Kathak"
  },
  {
    id: 3,
    name: "Ananya Patel",
    role: "Dance Instructor",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    text: "I love teaching on DanceMate! The platform makes it so easy to manage my classes and connect with passionate students. It's been a game-changer for my teaching career.",
    rating: 5,
    danceStyle: "Contemporary"
  },
  {
    id: 4,
    name: "Arjun Mehta",
    role: "Dance Student",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    text: "The flexibility to book classes that fit my schedule is amazing. Plus, the quality of instruction is top-notch. I've tried multiple dance forms and loved each one!",
    rating: 5,
    danceStyle: "Hip Hop"
  },
  {
    id: 5,
    name: "Meera Desai",
    role: "Dance School Owner",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    text: "DanceMate has significantly increased our student enrollment. The platform's features help us manage everything efficiently, and our students love the booking experience.",
    rating: 5,
    danceStyle: "Salsa"
  },
  {
    id: 6,
    name: "Vikram Singh",
    role: "Dance Student",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    text: "I've been using DanceMate for over a year now, and it keeps getting better! The community is supportive, and I've made great progress in my dance skills.",
    rating: 5,
    danceStyle: "Ballet"
  }
];

const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div
      className="card-gradient text-white rounded-2xl h-full flex flex-col relative overflow-hidden group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10 flex-1">
        {/* Rating Stars */}
        <div className="flex gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <motion.svg
              key={i}
              className="w-5 h-5 text-sunset"
              fill="currentColor"
              viewBox="0 0 20 20"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + i * 0.1, type: "spring" }}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </motion.svg>
          ))}
        </div>

        {/* Testimonial Text */}
        <p className="text-white/90 text-lg mb-6 leading-relaxed italic">
          "{testimonial.text}"
        </p>

        {/* Dance Style Badge */}
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-sunset/20 text-sunset rounded-full text-sm font-semibold border border-sunset/30">
            {testimonial.danceStyle}
          </span>
        </div>

        {/* Author Info */}
        <div className="flex items-center mt-auto">
          <motion.img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-sunset/50 mr-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <div>
            <h4 className="text-xl font-semibold text-white">{testimonial.name}</h4>
            <p className="text-white/70">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section id="reviews" className="py-24 md:py-32 bg-gradient-to-b from-secondary/20 via-accent/20 to-primary/20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <motion.div
          className="absolute top-10 right-20 w-80 h-80 bg-secondary rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.div
          className="absolute bottom-10 left-20 w-96 h-96 bg-primary rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        ></motion.div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block text-sm md:text-base font-semibold text-sunset bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-sunset/30"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            💬 What Our Community Says
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Loved by <span className="text-sunset">Thousands</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Don't just take our word for it. See what our students, instructors, and school owners have to say about DanceMate.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

