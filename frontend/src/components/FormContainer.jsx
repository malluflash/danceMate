import PropTypes from 'prop-types';

const FormContainer = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-purple-pink-vertical py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden w-full pt-24 md:pt-28">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/30 rounded-full filter blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-accent/30 rounded-full filter blur-3xl opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/20 rounded-full filter blur-3xl opacity-40"></div>
      </div>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center w-full">
          <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl">
            <div className="card-gradient backdrop-blur-xl border-white/20 p-6 md:p-8 rounded-2xl w-full">
              <div className="w-full overflow-hidden">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FormContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormContainer;
