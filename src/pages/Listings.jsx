import { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";
import Filter from "../components/Filter";
import Button from "../components/Button";
import ListingsStyles from "../styles/sass/Listings.module.scss";
import AddAgent from "../components/AddAgent";
import { useNavigate } from "react-router-dom";

const Listings = () => {
    const navigate = useNavigate();
    const [realEstateListing, setRealEstateListing] = useState([]);
    const [filteredListings, setFilteredListings] = useState([]);
    const [filteredListing, setFilteredListing] = useState(localStorage.getItem('filteredListing') || false);
    const [addAgentActive, setAddAgentActive] = useState(false);
    const [minPrice, setMinPrice] = useState(localStorage.getItem('minPrice') || null);
    const [maxPrice, setMaxPrice] = useState(localStorage.getItem('maxPrice') || null);
    const [minArea, setMinArea] = useState(localStorage.getItem('minArea') || null);
    const [maxArea, setMaxArea] = useState(localStorage.getItem('maxArea') || null);
    const [bedrooms, setBedrooms] = useState(localStorage.getItem('bedrooms') || null);

    useEffect(() => {
        const headers = { 
            'accept': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}` 
        };

        fetch('https://api.real-estate-manager.redberryinternship.ge/api/real-estates', { headers })
            .then(response => response.json())
            .then(data => {
                setRealEstateListing(data);
            });
    }, []);

    const applyFilters = () => {
        const filtered = realEstateListing.filter(listing => {
            const priceCondition = (listing.price >= minPrice) && (listing.price <= maxPrice);
            const areaCondition = (listing.area >= minArea) && (listing.area <= maxArea);
            const bedroomCondition = listing.bedrooms === Number(bedrooms);

            return priceCondition || areaCondition || bedroomCondition;
        });

        setFilteredListings(filtered);
    };

    useEffect(() => {
        if (filteredListing) {
            applyFilters();
        }
    }, [realEstateListing, filteredListing, minPrice, maxPrice, minArea, maxArea, bedrooms]);
    
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
            { filteredListing && filteredListings.length === 0 ?
                <h1>აღნიშნული მონაცემებით განცხადება არ იძებნება</h1> :
                filteredListing && filteredListings.length > 0 ?
                filteredListings.map((listing, index) => (
                    <ListingCard key={index} listing={listing} />
                )) :
                realEstateListing.map((listing, index) => (
                    <ListingCard key={index} listing={listing} />
                ))
            }
        </div>
        {addAgentActive && <AddAgent onClick={() => setAddAgentActive(false)} />}
      </div>
    );
};
  
export default Listings;