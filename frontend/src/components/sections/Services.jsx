import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      icon: "🎓",
      title: "For Students",
      description: "Discover and book classes from top dance schools. Explore various dance forms, flexible scheduling, and expert instruction.",
      features: [
        "Browse dance schools and instructors",
        "Book classes that fit your schedule",
        "Explore multiple dance forms",
        "Track your progress"
      ],
      cta: "Start Learning",
      link: "/register"
    },
    {
      icon: "🏫",
      title: "For Dance Schools",
      description: "Join our platform to reach more students, manage your classes efficiently, and grow your dance academy.",
      features: [
        "Expand your student base",
        "Easy class management",
        "Online booking system",
        "Analytics and insights"
      ],
      cta: "Register Your School",
      link: "/register"
    },
    {
      icon: "👨‍🏫",
      title: "For Instructors",
      description: "Showcase your expertise, connect with students, and build your teaching career on our platform.",
      features: [
        "Create your profile",
        "Schedule classes",
        "Manage bookings",
        "Build your reputation"
      ],
      cta: "Join as Teacher",
      link: "/register"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="services" className="pt-48 md:pt-16 pb-24 md:pb-28 bg-gradient-to-b from-accent/20 via-primary/20 to-secondary/20">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white text-center mb-4"
            variants={item}
          >
            Our <span className="text-sunset">Services</span>
          </motion.h2>
          
          <motion.p 
            className="text-lg text-white/80 text-center mb-12 max-w-2xl mx-auto"
            variants={item}
          >
            Whether you're a student looking to learn, a school wanting to grow, or an instructor seeking opportunities, 
            we have something for everyone.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="card-gradient text-white p-8 rounded-2xl relative overflow-hidden group"
                variants={item}
                whileHover={{ y: -15, scale: 1.03 }}
                transition={{ duration: 0.3 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <motion.div 
                    className="text-6xl mb-6"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2
                    }}
                  >
                    {service.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-white/90 mb-6 text-lg leading-relaxed">{service.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <motion.li 
                        key={idx} 
                        className="flex items-start text-white/95"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + idx * 0.1 }}
                      >
                        <motion.span 
                          className="text-sunset mr-3 text-xl"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            delay: idx * 0.2 
                          }}
                        >
                          ✓
                        </motion.span>
                        <span className="text-lg">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <Link
                    to={service.link}
                    className="btn btn-primary w-full text-center text-lg py-4 relative overflow-hidden group/btn"
                  >
                    <span className="relative z-10">{service.cta}</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-sunset to-accent opacity-0 group-hover/btn:opacity-100 transition-opacity"
                      animate={{
                        x: ['-100%', '100%']
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                    />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

