import FilterStyles from "../styles/sass/Filter.module.scss";
import filter_cross from "../assets/svg/filter_cross.svg";
import Button from "./Button";

const FilterTag = ({
    city,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    bedrooms
}) => {
    return (
      <div className={FilterStyles.filter_tag}>
        {city && city}
        {minPrice && maxPrice ? minPrice + " - " + maxPrice + " ₾" : ""}
        {minArea && maxArea ? minArea + " - " + maxArea + " მ²" : ""}
        {bedrooms && bedrooms}
        <img src={filter_cross} alt="cross icon" />
      </div>
    );
};
  
export default FilterTag;