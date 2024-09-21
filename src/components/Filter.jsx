import { useState, useEffect } from 'react';
import FilterStyles from "../styles/sass/Filter.module.scss";
import Regions from "./Regions";
import Prices from './Prices';
import Area from './Area';
import Bedrooms from './Bedrooms';
import FilterTag from './FilterTag';

const Filter = ({
      onClearFilter, 
      onFilter,
      filterValues: {
        minPrice, 
        maxPrice, 
        minArea, 
        maxArea, 
        bedrooms,
        regions
      },
      setFilterValues: {
        setMinPrice,
        setMaxPrice,
        setMinArea,
        setMaxArea,
        setBedrooms,
        setRegions
      }
    }) => {
    const [activeFilter, setActiveFilter] = useState(null);

    const clearFilter = () => {
        localStorage.removeItem('minPrice');
        localStorage.removeItem('maxPrice');
        localStorage.removeItem('minArea');
        localStorage.removeItem('maxArea');
        localStorage.removeItem('bedrooms');
        localStorage.removeItem('regions');
        localStorage.setItem('filteredListing', false)
        onClearFilter(false);
        setMinPrice(null);
        setMaxPrice(null);
        setMinArea(null);
        setMaxArea(null);
        setBedrooms(null);
        setActiveFilter(null);
    }

    const updateFilter = () => {
      onFilter();
      setActiveFilter(null);
    }

    const clearRegions = (region) => {
      const updatedRegions = regions.filter((r) => r != String(region));
      setRegions(updatedRegions);
      localStorage.setItem('regions', updatedRegions);
    };
    
    const clearAreas = () => {
      setMinArea(null);
      setMaxArea(null);
    }

    const clearPrices = () => {
      setMinPrice(null);
      setMaxPrice(null);
    }

    const clearBedrooms = () => {
      setBedrooms(null);
    }

    useEffect(() => {
      const handleClickOutside = (e) => {
          const modal = document.querySelector(`.${FilterStyles.filter_options}`);
          const filter = document.querySelector(`.${FilterStyles.filter_container}`);
          
          if (modal && !modal.contains(e.target) && !filter.contains(e.target)) {
              setActiveFilter(null);
          }
      };
  
      activeFilter ? 
        document.addEventListener('click', handleClickOutside) : 
        document.removeEventListener('click', handleClickOutside);
  }, [activeFilter, setActiveFilter]);

    return (
      <div className={FilterStyles.filter_container}>
        <div className={FilterStyles.filter}>
          <div className={
              FilterStyles.filter_element + " " +
              (activeFilter ===  "regions" ? FilterStyles.filter_element_active : "")
            }>
            <p className={FilterStyles.header} onClick={() => setActiveFilter("regions")}>რეგიონი</p>
            <Regions 
              active={activeFilter ===  "regions" && true} 
              onFilter={updateFilter} 
              regions={regions}
              setRegions={setRegions}
            />
          </div>
          <div className={
              FilterStyles.filter_element + " " +
              (activeFilter ===  "price" ? FilterStyles.filter_element_active : "")
            }>
            <p className={FilterStyles.header} onClick={() => setActiveFilter("price")}>საფასო კატეგორია</p>
            <Prices 
              active={activeFilter ===  "price" && true} 
              onFilter={updateFilter} 
              filterValues={{
                minPrice, maxPrice
              }}
              setFilterValues={{
                setMinPrice, setMaxPrice
              }}
            />
          </div>
          <div className={
              FilterStyles.filter_element + " " +
              (activeFilter ===  "area" ? FilterStyles.filter_element_active : "")
            }>
            <p className={FilterStyles.header} onClick={() => setActiveFilter("area")}>ფართობი</p>
            <Area 
              active={activeFilter ===  "area" && true} 
              onFilter={updateFilter} 
              filterValues={{
                minArea, maxArea
              }}
              setFilterValues={{
                setMinArea, setMaxArea
              }}
            />
          </div>
          <div className={
              FilterStyles.filter_element + " " +
              (activeFilter ===  "bedrooms" ? FilterStyles.filter_element_active : "")
            }>
            <p className={FilterStyles.header} onClick={() => setActiveFilter("bedrooms")}>საძინებლების რაოდენობა</p>
            <Bedrooms 
              active={activeFilter ===  "bedrooms" && true} 
              onFilter={updateFilter} 
              bedrooms={bedrooms}
              setBedrooms={setBedrooms}
            />
          </div>
        </div>
        <div className={FilterStyles.filter_choices}>
            {regions && regions.length > 0 ? regions.map((region, index) => (
              <FilterTag 
                key={index}
                minArea={minArea} 
                maxArea={maxArea} 
                region={region}
                onClick={() => clearRegions(region)} 
              />
            )) : ""}
            {minArea & maxArea ? <FilterTag minArea={minArea} maxArea={maxArea} onClick={clearAreas} /> : ""}
            {minPrice & maxPrice ? <FilterTag minPrice={minPrice} maxPrice={maxPrice} onClick={clearPrices} /> : ""}
            {bedrooms ? <FilterTag bedrooms={bedrooms} onClick={clearBedrooms} /> : ""}
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