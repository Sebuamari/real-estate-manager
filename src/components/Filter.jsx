import { useEffect, useState } from 'react';
import FilterStyles from "../styles/sass/Filter.module.scss";
import Regions from "./Regions";
import Prices from './Prices';
import Area from './Area';
import Bedrooms from './Bedrooms';
import FilterTag from './FilterTag';

const Filter = () => {
    const [activeFilter, setActiveFilter] = useState(null);
    const [minPrice, setMinPrice] = useState(localStorage.getItem('minPrice') || null);
    const [maxPrice, setMaxPrice] = useState(localStorage.getItem('maxPrice') || null);
    const [minArea, setMinArea] = useState(localStorage.getItem('minArea') || null);
    const [maxArea, setMaxArea] = useState(localStorage.getItem('maxArea') || null);
    const [bedrooms, setBedrooms] = useState(localStorage.getItem('bedrooms') || null);

    const clearFilter = () => {
        localStorage.removeItem('minPrice');
        localStorage.removeItem('maxPrice');
        localStorage.removeItem('minArea');
        localStorage.removeItem('maxArea');
        localStorage.removeItem('bedrooms');
        localStorage.getItem('filteredListing', false)
        setMinPrice(null);
        setMaxPrice(null);
        setMinArea(null);
        setMaxArea(null);
        setBedrooms(null);
    }

    const filterListing = () => localStorage.setItem('filteredListing', true);

    // useEffect(() => {
    //     document.addEventListener('click', (e) => {
    //         if (!document.querySelector(`.${FilterStyles.filter_options}`).contains(e.target)) {
    //             console.log(e.target);
    //         }
    //     });
    // }, []);

    return (
      <div className={FilterStyles.filter_container}>
        <div className={FilterStyles.filter}>
          <div className={
              FilterStyles.filter_element + " " +
              (activeFilter ===  "regions" ? FilterStyles.filter_element_active : "")
            }>
            <p className={FilterStyles.header} onClick={() => setActiveFilter("regions")}>რეგიონი</p>
            <Regions active={activeFilter ===  "regions" && true} />
          </div>
          <div className={
              FilterStyles.filter_element + " " +
              (activeFilter ===  "price" ? FilterStyles.filter_element_active : "")
            }>
            <p className={FilterStyles.header} onClick={() => setActiveFilter("price")}>საფასო კატეგორია</p>
            <Prices active={activeFilter ===  "price" && true} filterListing={filterListing} />
          </div>
          <div className={
              FilterStyles.filter_element + " " +
              (activeFilter ===  "area" ? FilterStyles.filter_element_active : "")
            }>
            <p className={FilterStyles.header} onClick={() => setActiveFilter("area")}>ფართობი</p>
            <Area active={activeFilter ===  "area" && true} filterListing={filterListing} />
          </div>
          <div className={
              FilterStyles.filter_element + " " +
              (activeFilter ===  "bedrooms" ? FilterStyles.filter_element_active : "")
            }>
            <p className={FilterStyles.header} onClick={() => setActiveFilter("bedrooms")}>საძინებლების რაოდენობა</p>
            <Bedrooms active={activeFilter ===  "bedrooms" && true} filterListing={filterListing} />
          </div>
        </div>
        <div className={FilterStyles.filter_choices}>
            {minArea & maxArea ? <FilterTag minArea={minArea} maxArea={maxArea} /> : ""}
            {minPrice & maxPrice ? <FilterTag minPrice={minPrice} maxPrice={maxPrice} /> : ""}
            {bedrooms ? <FilterTag bedrooms={bedrooms} /> : ""}
            <span 
              className={
                FilterStyles.filter_choices_clear_button + " " +
                (minPrice & maxPrice || minArea & maxArea || bedrooms ? FilterStyles.filter_choices_clear_button_active : "")
              } 
              onClick={() => clearFilter()}>
                გასუფთავება
            </span>
        </div>
      </div>
    );
};
  
export default Filter;