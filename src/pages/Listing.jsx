import { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";
import ListingStyles from "../styles/sass/Listing.module.scss";

const Listing = () => {
    let [realEstateListing, setRealEstateListing] = useState([]);

    useEffect(() => {
        const headers = { 
            'accept': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}` 
        };

        fetch('https://api.real-estate-manager.redberryinternship.ge/api/real-estates', { headers })
            .then(response => response.json())
            .then(data => setRealEstateListing(data));
    }, []);
    
    return (
      <>
        <div className={ListingStyles.listing}>
            {realEstateListing.map((listing, index) => (
                <ListingCard key={index} listing={listing} />
            ))}
        </div>
      </>
    );
};
  
export default Listing;