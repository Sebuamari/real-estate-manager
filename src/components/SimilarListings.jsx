import { useEffect, useState, useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import arrow_next from "../assets/svg/arrow_right.svg";
import arrow_prev from "../assets/svg/arrow.svg";
import ListingCard from "../components/ListingCard";
import ListingStyles from "../styles/sass/Listing.module.scss";

const SimilarListings = ({listing}) => {
  let [realEstates, setRealEstates] = useState([]);

  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${ListingStyles.next_arrow}`}
        style={{ ...style}}
        onClick={onClick}
      >
        <img src={arrow_next} alt="left arrow icon" />
      </div>
    );
  }

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${ListingStyles.prev_arrow}`}
        style={{ ...style}}
        onClick={onClick}
      >
        <img src={arrow_prev} alt="left arrow icon" />
      </div>
    );
  }

  useEffect(() => {
      const headers = { 
          'accept': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}` 
      };

      fetch('https://api.real-estate-manager.redberryinternship.ge/api/real-estates', { headers })
          .then(response => response.json())
          .then((data) => setRealEstates(data));
  }, []);

  const similarRealEstates = useMemo(() => {
    return realEstates.filter(
      (estate) =>
        estate.id !== listing.id && estate.city.region_id === listing.city.region_id
    );
  }, [realEstates, listing]);

  var settings = {
    dots: false,
    infinite: similarRealEstates.length > 4 ? true : false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  if(similarRealEstates.length === 0) {
    return null;
  }

  return (
    <div className={ListingStyles.similar}>
      <h2>ბინები მსგავს ლოკაციაზე</h2>
      <Slider {...settings}>
        {similarRealEstates.map((estate) => (
          <ListingCard key={estate.id} listing={estate} />
        ))}
      </Slider>
    </div>
  );
};
  
export default SimilarListings;