import PropTypes from 'prop-types';

const SlotsContainer = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-purple-pink-vertical pt-24 px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-6 my-12 p-6 rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
};

SlotsContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SlotsContainer;
