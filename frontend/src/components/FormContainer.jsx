import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className='justify-content-center mt-5'>
        <Col xs={12} md={6}>
          <div className='card p-4 rounded shadow-lg' style={{ background: 'transparent' }}>
            {children}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

FormContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormContainer;
