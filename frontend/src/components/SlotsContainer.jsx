import { Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

const SlotsContainer = ({ children }) => {
  return (
    <Container>
      <Row className='mt-5 mb-5 d-flex flex-wrap justify-content-center p-3' style={{ background: 'transparent', borderRadius: '10px' }}>
        {children}
      </Row>
    </Container>
  );
};

SlotsContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SlotsContainer;
