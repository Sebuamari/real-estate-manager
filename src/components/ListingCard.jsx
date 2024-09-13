import { useEffect, useState } from "react";
import ListingCardStyles from "../styles/sass/ListingCard.module.scss";
import space from "../assets/svg/area.svg";
import bed from "../assets/svg/bed.svg";
import sign from "../assets/svg/sign.svg";
import pin from "../assets/svg/pin.svg";

const ListingCard = ({
  listing: {
    address,
    area,
    bedrooms,
    city,
    city_id,
    id,
    image,
    is_rental,
    price, 
    zip_code,
  }
}) => {
    
    return (
      <div className={ListingCardStyles.listing_card}>
        <p className={ListingCardStyles.listing_card__tag}>{is_rental ? "ქირავდება" : "იყიდება"}</p>
        <img className={ListingCardStyles.listing_card__image} src={image} alt="Real estate property" />
        <div className={ListingCardStyles.listing_card__info}>
          <p className={ListingCardStyles.listing_card__price}>
            {price.toLocaleString().split(",").join(" ")} 
            ₾
          </p>
          <p className={ListingCardStyles.listing_card__address}>  
            <img src={pin} alt="Pin icon" />
            {address}
          </p>
          <div className={ListingCardStyles.listing_card__details}>
            <p>
              <img src={bed} alt="Bed icon" />
              {bedrooms}
            </p>
            <p>
              <img src={space} alt="Area icon" />
              {area}
            </p>
            <p>
              <img src={sign} alt="Sign icon" />
              {zip_code}
            </p>
          </div>
        </div>
      </div>
    );
};
  
export default ListingCard;