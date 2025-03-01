import PropTypes from 'prop-types';

const SlotsContainer = ({ children }) => {
  return (
    <div className="container-custom">
      <div className="flex flex-wrap justify-center gap-6 my-12 p-6 rounded-lg">
        {children}
      </div>
    </div>
  );
};

SlotsContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SlotsContainer;
