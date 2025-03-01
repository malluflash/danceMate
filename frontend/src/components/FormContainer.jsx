import PropTypes from 'prop-types';

const FormContainer = ({ children }) => {
  return (
    <div className="container-custom py-8">
      <div className="flex justify-center">
        <div className="w-full md:w-2/3 lg:w-1/2">
          <div className="card">
            {children}
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
