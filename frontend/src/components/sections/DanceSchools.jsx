  import { useState, useEffect } from 'react';
  import { motion, AnimatePresence } from 'framer-motion';
  import axios from 'axios';
  import { BuildingOfficeIcon, MapPinIcon, EnvelopeIcon, PhoneIcon, XMarkIcon } from '@heroicons/react/24/outline';
  import { Link } from 'react-router-dom';

  // Dummy dance school data with dance forms
  const dummySchools = [
    {
      _id: '1',
      name: 'Elite Dance Academy',
      city: 'AECS Layout',
      contactNumber: '+91 9845000000',
      description: 'Premier dance academy offering world-class training in multiple dance forms with experienced instructors.',
      danceForms: ['Contemporary', 'Ballet', 'Hip-Hop', 'Jazz', 'Tap']
    },
    {
      _id: '2',
      name: 'Bollywood Beats Studio',
      city: 'HSR Layout',
      contactNumber: '+91 9845000001',
      description: 'Specialized in Bollywood, Bhangra, and Indian classical dance forms. Experience the vibrant colors of Indian dance.',
      danceForms: ['Bollywood', 'Bhangra', 'Kathak', 'Bharatanatyam', 'Garba']
    },
    {
      _id: '3',
      name: 'Latin Rhythms Dance School',
      city: 'Koramangala',
      contactNumber: '+91 9845000002',
      description: 'Passionate about Latin dance! Learn Salsa, Bachata, Cha-Cha, and more from professional dancers.',
      danceForms: ['Salsa', 'Bachata', 'Cha-Cha', 'Tango', 'Samba']
    },
    {
      _id: '4',
      name: 'Urban Movement Studio',
      city: 'Bellandur',
      contactNumber: '+91 9845000003',
      description: 'Modern urban dance studio focusing on street styles, breaking, and freestyle dance forms.',
      danceForms: ['Breaking', 'Popping', 'Locking', 'Krumping', 'House Dance']
    },
    {
      _id: '5',
      name: 'Classical Ballet Institute',
      city: 'Indiranagar',
      contactNumber: '+91 9845000004',
      description: 'Traditional ballet training with a focus on technique, grace, and classical repertoire.',
      danceForms: ['Classical Ballet', 'Pointe', 'Character Dance', 'Pas de Deux']
    },
    {
      _id: '6',
      name: 'Fusion Dance Collective',
      city: 'BTM Layout',
      contactNumber: '+91 9845000005',
      description: 'Innovative dance collective combining multiple styles to create unique fusion performances.',
      danceForms: ['Contemporary Fusion', 'Modern Dance', 'Lyrical', 'Acro Dance', 'Jazz Funk']
    }
  ];

  const DanceSchools = () => {
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSchool, setSelectedSchool] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
      fetchSchools();
    }, []);

    const fetchSchools = async () => {
      try {
        const response = await axios.get('/api/schools/public');
        // Merge API schools with dummy data, prioritizing API data
        const mergedSchools = response.data.length > 0 ? response.data : dummySchools;
        // Add dance forms to schools that don't have them
        const schoolsWithForms = mergedSchools.map(school => {
          if (!school.danceForms) {
            const dummySchool = dummySchools.find(d => d.name === school.name);
            return { ...school, danceForms: dummySchool?.danceForms || ['Contemporary', 'Ballet', 'Jazz'] };
          }
          return school;
        });
        // If no API schools, use dummy data
        setSchools(response.data.length > 0 ? schoolsWithForms : dummySchools);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching schools:', error);
        // Use dummy data if API fails
        setSchools(dummySchools);
        setLoading(false);
      }
    };

    const handleExploreSchool = (school) => {
      setSelectedSchool(school);
      setShowModal(true);
    };

    const handleRegisterInterest = () => {
      // Navigate to registration with school info
      window.location.href = `/register?school=${selectedSchool?._id}&schoolName=${encodeURIComponent(selectedSchool?.name || '')}`;
    };

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
      <section id="dance-schools" className="pt-32 md:pt-24 pb-24 md:pb-28 bg-gradient-to-b from-secondary/20 via-accent/20 to-primary/20">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
          >
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-4"
              variants={item}
            >
              Our <span className="text-sunset relative inline-block">
                Dance Schools
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
              className="text-xl text-white/90 text-center mb-16 max-w-3xl mx-auto leading-relaxed"
              variants={item}
            >
              Discover amazing dance schools and academies on our platform. Each school offers unique 
              dance forms and expert instruction from world-class teachers.
            </motion.p>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sunset"></div>
              </div>
            ) : schools.length === 0 ? (
              <motion.div 
                className="text-center py-12"
                variants={item}
              >
                <BuildingOfficeIcon className="h-16 w-16 text-white/30 mx-auto mb-4" />
                <p className="text-white/70 text-lg">No schools available at the moment. Check back soon!</p>
              </motion.div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={container}
              >
                {schools.slice(0, 6).map((school, index) => (
                  <motion.div
                    key={school._id}
                    className="card-gradient text-white p-6 rounded-2xl relative overflow-hidden group"
                    variants={item}
                    whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.3 } }}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                    <div className="flex items-center mb-4">
                        <motion.div
                          animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.2
                          }}
                        >
                          <BuildingOfficeIcon className="h-10 w-10 text-sunset mr-3" />
                        </motion.div>
                        <h3 className="text-xl font-bold">{school.name}</h3>
                    </div>
                    
                    {school.description && (
                      <p className="text-white/80 mb-4 text-sm line-clamp-2">
                        {school.description}
                      </p>
                    )}
                    
                    <div className="space-y-2 mb-4">
                      {school.city && (
                        <div className="flex items-center text-sm text-white/70">
                          <MapPinIcon className="h-4 w-4 mr-2 text-white/50" />
                          {school.city}
                        </div>
                      )}
                      {school.email && (
                        <div className="flex items-center text-sm text-white/70">
                          <EnvelopeIcon className="h-4 w-4 mr-2 text-white/50" />
                          <span className="truncate">{school.email}</span>
                        </div>
                      )}
                      {school.contactNumber && (
                        <div className="flex items-center text-sm text-white/70">
                          <PhoneIcon className="h-4 w-4 mr-2 text-white/50" />
                          {school.contactNumber}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
                      <motion.button
                        onClick={() => handleExploreSchool(school)}
                        className="text-sunset hover:text-sunset/80 text-sm font-semibold inline-flex items-center group/btn"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        Explore Dance Forms
                        <motion.span
                          className="ml-2"
                          animate={{ x: [0, 5, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          →
                        </motion.span>
                      </motion.button>
                    </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {schools.length > 6 && (
              <motion.div 
                className="text-center mt-8"
                variants={item}
              >
                <Link
                  to="/register"
                  className="btn btn-outline border-white/30 text-white hover:bg-white/20"
                >
                  View All Schools
                </Link>
              </motion.div>
            )}

            {/* School Details Modal */}
            <AnimatePresence>
              {showModal && selectedSchool && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                  onClick={() => setShowModal(false)}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-gradient-to-br from-primary/95 via-secondary/95 to-accent/95 rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-2">{selectedSchool.name}</h3>
                        <div className="flex items-center text-white/80 text-sm">
                          <MapPinIcon className="h-4 w-4 mr-2 text-sunset" />
                          {selectedSchool.city}
                        </div>
                      </div>
                      <button
                        onClick={() => setShowModal(false)}
                        className="text-white/60 hover:text-white transition-colors"
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>

                    {selectedSchool.description && (
                      <p className="text-white/90 mb-6">{selectedSchool.description}</p>
                    )}

                    <div className="mb-6">
                      <h4 className="text-xl font-semibold text-white mb-4">Dance Forms Offered</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {selectedSchool.danceForms?.map((form, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white/10 rounded-lg p-3 text-center text-white border border-white/20"
                          >
                            {form}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {selectedSchool.email && (
                        <div className="flex items-center text-white/80">
                          <EnvelopeIcon className="h-5 w-5 mr-3 text-sunset" />
                          {selectedSchool.email}
                        </div>
                      )}
                      {selectedSchool.contactNumber && (
                        <div className="flex items-center text-white/80">
                          <PhoneIcon className="h-5 w-5 mr-3 text-sunset" />
                          {selectedSchool.contactNumber}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={handleRegisterInterest}
                        className="btn btn-primary flex-1 text-center"
                      >
                        Register Interest
                      </button>
                      <button
                        onClick={() => setShowModal(false)}
                        className="btn btn-outline border-white/30 text-white hover:bg-white/20 flex-1"
                      >
                        Close
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    );
  };

  export default DanceSchools;

