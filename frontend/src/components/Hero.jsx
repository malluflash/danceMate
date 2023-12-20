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
          The Dance Mate App is a groundbreaking online platform dedicated to enhancing the dance education experience.
          With a focus on accessibility, interactivity, and community building. this web application
          revolutionizes the world of dance instruction, catering to both dance enthusiasts and <b>professionals alike!</b>
          
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