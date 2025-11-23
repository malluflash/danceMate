import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const StatCard = ({ icon, title, value, suffix, color, delay }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const interval = 20;
      const steps = duration / interval;
      const increment = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, interval);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);
  
  return (
    <motion.div 
      ref={ref}
      className="card-gradient text-white p-5 md:p-6 rounded-xl text-center relative overflow-hidden group"
      whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.3 } }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <motion.div 
          className={`inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full ${color} mb-3 text-2xl md:text-3xl`}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          {icon}
        </motion.div>
        <motion.h3 
          className="text-3xl md:text-4xl font-bold mb-1 text-sunset"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: delay + 0.2, type: "spring", stiffness: 200 }}
        >
          {count}{suffix}
        </motion.h3>
        <p className="text-sm md:text-base font-medium text-white/90">{title}</p>
      </div>
    </motion.div>
  );
};

const StatsSection = () => {
  const stats = [
    {
      icon: "🏫",
      title: "Dance Schools",
      value: 150,
      suffix: "+",
      color: "bg-primary/30",
      delay: 0
    },
    {
      icon: "👥",
      title: "Active Students",
      value: 5000,
      suffix: "+",
      color: "bg-secondary/30",
      delay: 0.1
    },
    {
      icon: "👨‍🏫",
      title: "Expert Instructors",
      value: 300,
      suffix: "+",
      color: "bg-accent/30",
      delay: 0.2
    },
    {
      icon: "💃",
      title: "Dance Styles",
      value: 25,
      suffix: "+",
      color: "bg-sunset/30",
      delay: 0.3
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-accent/10 via-primary/20 to-secondary/20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-48 h-48 bg-primary rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-accent rounded-full filter blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
            Join Our Growing <span className="text-sunset">Community</span>
          </h2>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto">
            Thousands of dancers, schools, and instructors trust DanceMate for their dance education journey
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
              suffix={stat.suffix}
              color={stat.color}
              delay={stat.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

