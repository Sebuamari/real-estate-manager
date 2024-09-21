import { useState } from "react";
import FilterStyles from "../styles/sass/Filter.module.scss";
import Button from "./Button";

const Prices = ({   
        active, 
        onFilter,
        filterValues: {
            minPrice,
            maxPrice
        },
        setFilterValues: {
            setMinPrice,
            setMaxPrice
        }
    }) => {
    const [errorMessage, setErrorMessage] = useState(null);

    const updateMinPrice = (newValue) => {
        if(/^\d*$/.test(newValue)) {
            newValue = parseInt(newValue) ? parseInt(newValue) : "";
            if (maxPrice && newValue > maxPrice) {
                setErrorMessage("გთხოვთ შეიყვანოთ ვალიდური რიცხვები");
            } else {
                setMinPrice(newValue);
                localStorage.setItem('minPrice', newValue);
                setErrorMessage(null);
            }
        }
    }

    const updateMaxPrice = (newValue) => {
        if(/^\d*$/.test(newValue)) {
            newValue = parseInt(newValue) ? parseInt(newValue) : "";
            if (minPrice && newValue < minPrice) {
                setErrorMessage("გთხოვთ შეიყვანოთ ვალიდური რიცხვები");
            } else {
                setMaxPrice(newValue);
                localStorage.setItem('maxPrice', newValue);
                setErrorMessage(null);
            }
        }
    }

    return (
      <div className={
            FilterStyles.filter_options + " " +
            (active && FilterStyles.filter_options_active)
        }>
        <p>ფასის მიხედვით</p>
        <div className={FilterStyles.filter_options_prices}>
            <div className={FilterStyles.filter_options_prices_inputs}>
                <div className={FilterStyles.input_container} data-placeholder="₾">
                    <input type="text" value={minPrice} placeholder="დან" onChange={(e) => updateMinPrice(e.target.value)} />
                </div>
                <div className={FilterStyles.input_container} data-placeholder="₾">
                    <input type="text" value={maxPrice} placeholder="დან" onChange={(e) => updateMaxPrice(e.target.value)} />
                </div>
            </div>
            <div className={FilterStyles.filter_options_prices_choices}>
                <div className={FilterStyles.filter_options_prices_choices_min}>
                    მინ. ფასი
                    <span value="50000" onClick={(e) => updateMinPrice(e.target.attributes.value.value)}>50,000 ₾</span>
                    <span value="100000" onClick={(e) => updateMinPrice(e.target.attributes.value.value)}>100,000 ₾</span>
                    <span value="150000" onClick={(e) => updateMinPrice(e.target.attributes.value.value)}>150,000 ₾</span>
                    <span value="200000" onClick={(e) => updateMinPrice(e.target.attributes.value.value)}>200,000 ₾</span>
                    <span value="300000" onClick={(e) => updateMinPrice(e.target.attributes.value.value)}>300,000 ₾</span>
                </div>
                <div className={FilterStyles.filter_options_prices_choices_max}>
                    მაქს. ფასი
                    <span value="50000" onClick={(e) => updateMaxPrice(e.target.attributes.value.value)}>50,000 ₾</span>
                    <span value="100000" onClick={(e) => updateMaxPrice(e.target.attributes.value.value)}>100,000 ₾</span>
                    <span value="150000" onClick={(e) => updateMaxPrice(e.target.attributes.value.value)}>150,000 ₾</span>
                    <span value="200000" onClick={(e) => updateMaxPrice(e.target.attributes.value.value)}>200,000 ₾</span>
                    <span value="300000" onClick={(e) => updateMaxPrice(e.target.attributes.value.value)}>300,000 ₾</span>
                </div>
            </div>
        </div>
        <div className={FilterStyles.filter_options_bottom}>
            <span>{errorMessage}</span>
            <Button text={"არჩევა"} isFilled={true} onClick={onFilter} />
        </div>
      </div>
    );
};
  
export default Prices;