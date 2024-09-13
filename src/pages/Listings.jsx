import { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";
import ListingsStyles from "../styles/sass/Listings.module.scss";

const Listings = () => {
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
        <div className={ListingsStyles.listing}>
            {realEstateListing.map((listing, index) => (
                <ListingCard key={index} listing={listing} />
            ))}
        </div>
      </>
    );
};
  
export default Listings;