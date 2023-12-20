import { Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import "../App.css";

import SlotsContainer from './SlotsContainer';


const Hero = () => {
  return (
    <SlotsContainer>
        <Card className=' align-items-center hero-card bg-light bg-gradient'>
        
            
          <h1 className='p-5 text-center mb-3 mt-5 text-dark'>Welcome to Dance Mate !</h1>
          <h4 className='text-center mb-3 mt-5 text-dark'>
          The Dance Mate App stands out as an innovative online platform committed to elevating the dance education journey.
          Prioritizing accessibility, interactivity, and community development,
          this web application transforms the landscape of dance instruction,
          serving the needs of both dance enthusiasts and professionals!
          
          </h4>
         
          <div className='mt-5 pt-5 text-center' >
        <LinkContainer to='/login' className='p-3'>
          <button type="button" size='lg' className="btn btn-outline-dark mb-5">
           Get started
            </button>
        </LinkContainer>
          </div>
    
        </Card>
      
    </SlotsContainer>
  );
};

export default Hero;