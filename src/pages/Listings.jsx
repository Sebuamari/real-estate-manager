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
    const [addAgentActive, setAddAgentActive] = useState(false);
    const [regions, setRegions] = useState(localStorage.getItem("regions")?.split(',').map(String) || []);
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    const [minArea, setMinArea] = useState(null);
    const [maxArea, setMaxArea] = useState(null);
    const [bedrooms, setBedrooms] = useState(null);

    useEffect(() => {
        const headers = { 
            'accept': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}` 
        };

        fetch('https://api.real-estate-manager.redberryinternship.ge/api/real-estates', { headers })
            .then(response => response.json())
            .then(data => {
                setRealEstateListing(data);
                setFilteredListings(data);
            });
    }, []);

    const applyFilters = () => {
        const filtered = realEstateListing.filter(listing => {
            const priceCondition = (!minPrice || listing.price >= minPrice) && (!maxPrice || listing.price <= maxPrice);
            const areaCondition = (!minArea || listing.area >= minArea) && (!maxArea || listing.area <= maxArea);
            const bedroomCondition = !bedrooms || listing.bedrooms === Number(bedrooms);
            const regionsCondition = !regions || regions.includes(listing.region_id);

            return priceCondition && areaCondition && bedroomCondition && regionsCondition;
        });

        setFilteredListings(filtered);
    };

    useEffect(() => {
        applyFilters();
    }, [realEstateListing, regions, minPrice, maxPrice, minArea, maxArea, bedrooms]);

    return (
        <div className={ListingsStyles.listing_container}>
            <div className={ListingsStyles.listing_actions}>
                <Filter 
                    onClearFilter={() => {
                        setMinPrice(null);
                        setMaxPrice(null);
                        setMinArea(null);
                        setMaxArea(null);
                        setBedrooms(null);
                        setRegions(null);
                        setFilteredListings(realEstateListing);
                    }} 
                    onFilter={applyFilters} 
                    filterValues={{ minPrice, maxPrice, minArea, maxArea, bedrooms, regions }}
                    setFilterValues={{ setMinPrice, setMaxPrice, setMinArea, setMaxArea, setBedrooms, setRegions }}
                />
                <div className={ListingsStyles.listing_actions_buttons}>
                    <Button 
                        text="ლისტინგის დამატება" 
                        isFilled={true} 
                        onClick={() => navigate("/add-real-estate")} 
                        plusButton={true} 
                    />
                    <Button 
                        text="აგენტის დამატება" 
                        isFilled={false} 
                        onClick={() => setAddAgentActive(true)} 
                        plusButton={true} 
                    />
                </div>
            </div>
            <div className={ListingsStyles.listing}>
                {filteredListings.length === 0 ? (
                    <h1>აღნიშნული მონაცემებით განცხადება არ იძებნება</h1>
                ) : (
                    filteredListings.map((listing, index) => (
                        <ListingCard key={index} listing={listing} />
                    ))
                )}
            </div>
            {addAgentActive && <AddAgent onClick={() => setAddAgentActive(false)} />}
        </div>
    );
};

export default Listings;