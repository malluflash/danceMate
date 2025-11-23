import { motion } from 'framer-motion';

const AboutUs = () => {
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
    show: { opacity: 1, y: 0 }
  };

  const features = [
    {
      icon: "🎓",
      title: "Expert Instructors",
      description: "Learn from certified professionals with years of experience in various dance forms"
    },
    {
      icon: "🌐",
      title: "Global Reach",
      description: "Connect with dance schools and students from around the world"
    },
    {
      icon: "📅",
      title: "Flexible Scheduling",
      description: "Book classes that fit your schedule with our easy-to-use booking system"
    },
    {
      icon: "💬",
      title: "Community Driven",
      description: "Join a vibrant community of dancers sharing their passion and growth"
    },
    {
      icon: "📊",
      title: "Progress Tracking",
      description: "Monitor your dance journey with detailed progress reports and analytics"
    },
    {
      icon: "🔒",
      title: "Secure Platform",
      description: "Your data and payments are protected with industry-standard security"
    }
  ];

  return (
    <section id="about" className="pt-12 md:pt-16 pb-20 md:pb-24 bg-gradient-to-b from-primary/20 via-secondary/20 to-accent/20 scroll-mt-20">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
          className="max-w-6xl mx-auto"
        >
          {/* Main Heading */}
          <motion.div className="text-center mb-12 md:mb-14" variants={item}>
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
              variants={item}
            >
              About <span className="text-sunset relative inline-block">
                DanceMate
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sunset to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-lg md:text-xl text-white/90 mb-6 leading-relaxed max-w-3xl mx-auto"
              variants={item}
            >
              DanceMate is a revolutionary platform that bridges the gap between dance enthusiasts 
              and professional dance schools, academies, and instructors. We're committed to making 
              quality dance education accessible to everyone, everywhere.
            </motion.p>
          </motion.div>

          {/* Story Section */}
          <motion.div 
            className="mb-12 md:mb-14"
            variants={item}
          >
            <div className="card-gradient text-white p-6 md:p-8 rounded-2xl">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center">Our Story</h3>
              <div className="space-y-4 text-white/90 text-lg leading-relaxed">
                <p>
                  Founded with a vision to transform dance education, DanceMate emerged from a simple observation: 
                  talented dancers and passionate learners were struggling to find quality instruction, while 
                  exceptional dance schools and instructors were looking for ways to reach more students.
                </p>
                <p>
                  We recognized that the traditional barriers of location, scheduling, and information were 
                  preventing the dance community from reaching its full potential. DanceMate was created to 
                  break down these barriers, creating a seamless connection between students and instructors 
                  while providing tools that make dance education more accessible, organized, and enjoyable.
                </p>
                <p>
                  Today, we're proud to be a trusted platform where thousands of dancers, from beginners to 
                  professionals, discover new styles, improve their skills, and connect with a global community 
                  that shares their passion for movement and expression.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Mission, Vision, Values */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-14"
            variants={container}
          >
            <motion.div 
              className="card-gradient text-white p-6 rounded-2xl relative overflow-hidden group"
              variants={item}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="text-xl font-bold mb-2">Our Mission</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  To democratize dance education and connect passionate learners with exceptional instructors, 
                  making world-class dance training accessible to everyone regardless of location or background.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="card-gradient text-white p-6 rounded-2xl relative overflow-hidden group"
              variants={item}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-sunset/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-4xl mb-3">🌟</div>
                <h3 className="text-xl font-bold mb-2">Our Vision</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  To become the leading global platform for dance education, fostering a vibrant, inclusive 
                  community where every dancer can find their rhythm and every instructor can share their art.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="card-gradient text-white p-6 rounded-2xl relative overflow-hidden group"
              variants={item}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-4xl mb-3">💫</div>
                <h3 className="text-xl font-bold mb-2">Our Values</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  We stand for <strong className="text-sunset">excellence</strong> in instruction, 
                  <strong className="text-sunset"> accessibility</strong> for all, building a strong 
                  <strong className="text-sunset"> community</strong>, and nurturing 
                  <strong className="text-sunset"> passion</strong> for the art of dance.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* What Makes Us Different */}
          <motion.div 
            className="mb-12 md:mb-14"
            variants={item}
          >
            <motion.h3 
              className="text-2xl md:text-3xl font-bold text-white text-center mb-6 md:mb-8"
              variants={item}
            >
              What Makes Us <span className="text-sunset">Different</span>
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="card-gradient text-white p-6 rounded-xl relative overflow-hidden group"
                  variants={item}
                  whileHover={{ y: -5, scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="text-4xl mb-3">{feature.icon}</div>
                    <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                    <p className="text-white/80 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            className="text-center"
            variants={item}
          >
            <div className="card-gradient text-white p-6 md:p-8 rounded-2xl">
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Join the DanceMate Community</h3>
              <p className="text-base md:text-lg text-white/90 mb-5 md:mb-6 max-w-2xl mx-auto">
                Whether you're a student looking to learn, a teacher ready to inspire, or a school 
                wanting to grow, DanceMate is here to support your dance journey. Together, we're 
                building a future where dance education knows no boundaries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={() => {
                    const element = document.getElementById('dance-schools');
                    if (element) {
                      const headerOffset = 80;
                      const elementPosition = element.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                    } else {
                      window.location.href = '/#dance-schools';
                    }
                  }}
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Dance Schools
                </motion.button>
                <motion.button
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) {
                      const headerOffset = 80;
                      const elementPosition = element.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                    } else {
                      window.location.href = '/#contact';
                    }
                  }}
                  className="btn btn-outline"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;

