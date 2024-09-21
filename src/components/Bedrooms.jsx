import FilterStyles from "../styles/sass/Filter.module.scss";
import Button from "./Button";

const Bedrooms = ({
      active, 
      onFilter,
      bedrooms,
      setBedrooms
    }) => {

    return (
      <div className={
            FilterStyles.filter_options + " " +
            (active && FilterStyles.filter_options_active)
        }>
        <p>საძინებლების რაოდენობა</p>
        <div className={FilterStyles.filter_options_bedrooms_choices}>
          <span 
            value="1" 
            className={
              FilterStyles.filter_options_bedrooms_choices_element + " " +
              (bedrooms == "1" ? FilterStyles.filter_options_bedrooms_choices_element_selected : "")
            } 
            onClick={(e) => setBedrooms(e.target.attributes.value.value)}>
            1
          </span>
          <span 
            value="2" 
            className={
              FilterStyles.filter_options_bedrooms_choices_element + " " +
              (bedrooms == "2" ? FilterStyles.filter_options_bedrooms_choices_element_selected : "")
            } 
            onClick={(e) => setBedrooms(e.target.attributes.value.value)}>
            2
          </span>
          <span 
            value="3" 
            className={
              FilterStyles.filter_options_bedrooms_choices_element + " " +
              (bedrooms == "3" ? FilterStyles.filter_options_bedrooms_choices_element_selected : "")
            } 
            onClick={(e) => setBedrooms(e.target.attributes.value.value)}>
            3
          </span>
        </div>
        <Button text={"არჩევა"} isFilled={true} onClick={onFilter} />
      </div>
    );
};
  
export default Bedrooms;