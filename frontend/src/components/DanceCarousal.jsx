import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import './DanceCarousel.css'; // Import your custom styles

function DanceCarousel() {
  const [index, setIndex] = useState(0);
  const [dancePhotos, setDancePhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const fetchDancePhotos = async () => {
      try {
        const response = await axios.get(
          'https://api.unsplash.com/photos/random?count=10&query=indian+dance&orientation=landscape&width=1920&height=1080',
          {
            headers: {
              Authorization: 'Client-ID VSAMTv1dlmYTzhmiP5Df7qLc4_DNCRsxnPdIdU36bko',
            },
          }
        );

        const photos = response.data.map((photo) => ({
          imageUrl: photo.urls.regular,
          author: photo.user.name,
        }));
        setDancePhotos(photos);
        setLoading(false);
      } catch (error) {
        setError('Error fetching dance photos. Please try again later.');
        setLoading(false);
        console.error('Error fetching dance photos:', error);
      }
    };

    fetchDancePhotos();
  }, []);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {dancePhotos.length > 0 && (
        <Carousel activeIndex={index} onSelect={handleSelect} className="custom-carousel">
          {dancePhotos.map((photo, idx) => (
            <Carousel.Item key={idx}>
              <img className="d-block w-100" src={photo.imageUrl} alt={`Dance Photo ${idx + 1}`} />
              <Carousel.Caption>
                <h1>Dance Mate</h1>
                <h2>{`Unleashing the Rhythm Within Where Every Step Tells a Story !!`}</h2>
                <p>{`Photo by ${photo.author}`}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
}

export default DanceCarousel;
