import { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";
import Filter from "../components/Filter";
import Button from "../components/Button";
import ListingsStyles from "../styles/sass/Listings.module.scss";
import AddAgent from "../components/AddAgent";
import { useNavigate } from "react-router-dom";

const Listings = () => {
    const navigate = useNavigate();
    let [realEstateListing, setRealEstateListing] = useState([]);
    let [addAgentActive, setAddAgentActive] = useState(false);

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
      <div className={ListingsStyles.listing_container}>
        <div className={ListingsStyles.listing_actions}>
            <Filter />
            <div className={ListingsStyles.listing_actions_buttons}>
                <Button 
                    text="ლისტინგის დამატება" 
                    isFilled={true} 
                    onClick={() => navigate("/add-real-estate")} 
                    plusButton={true} />
                <Button 
                    text="აგენტის დამატება" 
                    isFilled={false} 
                    onClick={() => setAddAgentActive(true)} 
                    plusButton={true} />
            </div>
        </div>
        <div className={ListingsStyles.listing}>
            {realEstateListing.map((listing, index) => (
                <ListingCard key={index} listing={listing} />
            ))}
        </div>
        {addAgentActive && <AddAgent onClick={() => setAddAgentActive(false)} />}
      </div>
    );
};
  
export default Listings;