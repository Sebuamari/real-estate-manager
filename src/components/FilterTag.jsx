import { useState, useEffect } from "react";
import FilterStyles from "../styles/sass/Filter.module.scss";
import filter_cross from "../assets/svg/filter_cross.svg";

const FilterTag = ({
    region,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    bedrooms,
    onClick
}) => {
    const [regionName, setRegionName] = useState("");

    useEffect(() => {
        const headers = { 
            'accept': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}` 
        };

        fetch('https://api.real-estate-manager.redberryinternship.ge/api/regions', { headers })
            .then(response => response.json())
            .then(data => {
                setRegionName(region != "" ? data.filter(r => r.id == region)[0].name : "");
            })
    }, []);

    return (
      <div className={FilterStyles.filter_tag}>
        {region && regionName}
        {minPrice && maxPrice ? minPrice + " - " + maxPrice + " ₾" : ""}
        {minArea && maxArea ? minArea + " - " + maxArea + " მ²" : ""}
        {bedrooms && bedrooms}
        <img src={filter_cross} alt="cross icon" onClick={onClick} />
      </div>
    );
};
  
export default FilterTag;