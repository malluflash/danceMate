import { motion } from 'framer-motion';

const Benefits = () => {
  const benefits = [
    {
      icon: "👥",
      title: "Reach More Students",
      description: "Connect with thousands of dance enthusiasts looking for quality instruction in your area."
    },
    {
      icon: "📊",
      title: "Easy Management",
      description: "Streamlined booking system, class scheduling, and student management all in one place."
    },
    {
      icon: "💰",
      title: "Increase Revenue",
      description: "Fill more classes and maximize your studio's potential with our booking platform."
    },
    {
      icon: "⭐",
      title: "Build Reputation",
      description: "Get reviews and ratings from students to build trust and attract more learners."
    },
    {
      icon: "📱",
      title: "Modern Platform",
      description: "Professional online presence with easy-to-use tools for both you and your students."
    },
    {
      icon: "🎯",
      title: "Targeted Marketing",
      description: "Reach students specifically interested in the dance forms you teach."
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="benefits" className="py-24 md:py-28 bg-gradient-to-b from-accent/20 via-primary/20 to-secondary/20">
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
            Benefits for <span className="text-sunset">Dance Schools</span>
          </motion.h2>
          
          <motion.p 
            className="text-lg text-white/80 text-center mb-12 max-w-2xl mx-auto"
            variants={item}
          >
            Join DanceMate and unlock a world of opportunities to grow your dance academy and reach more students.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="card-gradient text-white p-6 rounded-xl"
                variants={item}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-white/80">{benefit.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            variants={item}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="/register"
                className="btn btn-primary"
              >
                Register Your School
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;

