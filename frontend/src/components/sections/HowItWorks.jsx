import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Register Your Interest",
      description: "Fill out our registration form with your school details, dance forms you teach, and your expertise.",
      icon: "📝"
    },
    {
      number: "2",
      title: "Get Approved",
      description: "Our team reviews your application and verifies your credentials to ensure quality standards.",
      icon: "✅"
    },
    {
      number: "3",
      title: "Set Up Your Profile",
      description: "Create your school profile, add class schedules, set pricing, and showcase your dance forms.",
      icon: "🎨"
    },
    {
      number: "4",
      title: "Start Teaching",
      description: "Students discover and book your classes. Manage bookings, track attendance, and grow your academy.",
      icon: "🚀"
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
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <section id="how-it-works" className="py-24 md:py-28 bg-gradient-to-b from-primary/20 via-secondary/20 to-accent/20">
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
            How It <span className="text-sunset">Works</span>
          </motion.h2>
          
          <motion.p 
            className="text-lg text-white/80 text-center mb-12 max-w-2xl mx-auto"
            variants={item}
          >
            Joining DanceMate is simple. Follow these steps to get your dance school or academy on our platform.
          </motion.p>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  variants={item}
                >
                  <div className="card-gradient text-white p-6 rounded-xl h-full">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-sunset/20 flex items-center justify-center text-3xl mb-4">
                          {step.icon}
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center mb-2">
                          <span className="text-sunset text-2xl font-bold mr-2">{step.number}</span>
                          <h3 className="text-xl font-semibold">{step.title}</h3>
                        </div>
                        <p className="text-white/80">{step.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-20 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-sunset/50 to-transparent"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            className="text-center mt-12"
            variants={item}
          >
            <p className="text-white/80 mb-6">
              Ready to join our platform? Register your dance school today!
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="/register"
                className="btn btn-primary"
              >
                Get Started Now
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;

