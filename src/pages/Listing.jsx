import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import arrow from "../assets/svg/arrow.svg";
import space from "../assets/svg/area.svg";
import bed from "../assets/svg/bed.svg";
import sign from "../assets/svg/sign.svg";
import pin from "../assets/svg/pin.svg";
import SimilarListings from "../components/SimilarListings";
import ListingDelete from "../components/ListingDelete";
import Agent from "../components/Agent";
import ListingStyles from "../styles/sass/Listing.module.scss";

const Listing = () => {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleteListing, setDeleteListing] = useState(false);

    useEffect(() => {
        const headers = { 
            'accept': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}` 
        };

        fetch(`https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`, { headers })
            .then(response => response.json())
            .then(data => {
                setListing(data);
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        deleteListing ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto";
    }, [deleteListing])

    if (loading) return <p>Loading...</p>;
    if (!listing) return <p>Listing not found</p>;
    
    return (
        <div className={ListingStyles.listing_page}>
            <Link to="/" className={ListingStyles.back_arrow}><img src={arrow} alt="arrow icon" /></Link>
            <div className={ListingStyles.listing}>
                <div className={ListingStyles.listing__image_container}>
                    <p className={ListingStyles.tag}>
                        {listing.is_rental ? "ქირავდება" : "იყიდება"}
                    </p>
                    <img src={listing.image} alt="Real estate view" />
                    <p>გამოქვეყნების თარიღი {new Date(listing.created_at).toLocaleDateString()}</p>
                </div>
                <div className={ListingStyles.listing__details}>
                    <p className={ListingStyles.listing__details_price}>
                        {listing.price.toLocaleString().split(",").join(" ")} 
                        ₾
                    </p>
                    <p className={ListingStyles.listing_detail}>  
                        <img width={22} height={22} src={pin} alt="Pin icon" />
                        {listing.city.name}, {listing.address}
                    </p>
                    <p className={ListingStyles.listing_detail}>
                        <img width={22} height={22} src={space} alt="Area icon" />
                        ფართი {listing.area}
                    </p>
                    <p className={ListingStyles.listing_detail}>
                        <img width={22} height={22} src={bed} alt="Bed icon" />
                        საძინებელი {listing.bedrooms}
                    </p>
                    <p className={ListingStyles.listing_detail}>
                        <img width={22} height={22} src={sign} alt="Sign icon" />
                        საფოსტო ინდექსი {listing.zip_code}
                    </p>
                    <p className={ListingStyles.listing__details_descripiton}>{listing.description}</p>
                    <Agent agent={listing.agent} />
                    <button onClick={() => setDeleteListing(true)}>ლისტინგის წაშლა</button>
                </div>
            </div>
            <SimilarListings listing={listing}/>
            {deleteListing && <ListingDelete id={id} onClick={() => setDeleteListing(false)} />}
        </div>
    );
};
  
export default Listing;