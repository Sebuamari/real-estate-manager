import { useState, useEffect } from "react";
import FilterStyles from "../styles/sass/Filter.module.scss";
import Button from "./Button";

const Area = ({active, filterListing}) => {
    const [minArea, setMinArea] = useState(localStorage.getItem('minArea') || null);
    const [maxArea, setMaxArea] = useState(localStorage.getItem('maxArea') || null);
    const [errorMessage, setErrorMessage] = useState(null);

    const updateMinArea = (newValue) => {
        if(/^\d*$/.test(newValue)) {
            newValue = parseInt(newValue) ? parseInt(newValue) : "";
            if (maxArea && newValue > maxArea) {
                setErrorMessage("გთხოვთ შეიყვანოთ ვალიდური რიცხვები");
            } else {
                setMinArea(newValue);
                localStorage.setItem('minArea', newValue);
                setErrorMessage(null);
            }
        }
    }

    const updateMaxArea = (newValue) => {
        if(/^\d*$/.test(newValue)) {
            newValue = parseInt(newValue) ? parseInt(newValue) : "";
            if(minArea && newValue < minArea) {
                setErrorMessage("გთხოვთ შეიყვანოთ ვალიდური რიცხვები")
            } else {
                setMaxArea(newValue);
                localStorage.setItem('maxArea', newValue);
                setErrorMessage(null);
            }
        }
    }

    return (
      <div className={
            FilterStyles.filter_options + " " +
            (active && FilterStyles.filter_options_active)
        }>
        <p>ფართობის მიხედვით</p>
        <div className={FilterStyles.filter_options_prices}>
            <div className={FilterStyles.filter_options_prices_inputs}>
                <div className={FilterStyles.input_container} data-placeholder="მ²">
                    <input type="text" value={minArea} placeholder="დან" onChange={(e) => updateMinArea(e.target.value)} />
                </div>
                <div className={FilterStyles.input_container} data-placeholder="მ²">
                    <input type="text" value={maxArea} placeholder="დან" onChange={(e) => updateMaxArea(e.target.value)} />
                </div>
            </div>
            <div className={FilterStyles.filter_options_prices_choices}>
                <div className={FilterStyles.filter_options_prices_choices_min}>
                    მინ. მ²
                    <span value="50000" onClick={(e) => updateMinArea(e.target.attributes.value.value)}>50,000 მ²</span>
                    <span value="100000" onClick={(e) => updateMinArea(e.target.attributes.value.value)}>100,000 მ²</span>
                    <span value="150000" onClick={(e) => updateMinArea(e.target.attributes.value.value)}>150,000 მ²</span>
                    <span value="200000" onClick={(e) => updateMinArea(e.target.attributes.value.value)}>200,000 მ²</span>
                    <span value="300000" onClick={(e) => updateMinArea(e.target.attributes.value.value)}>300,000 მ²</span>
                </div>
                <div className={FilterStyles.filter_options_prices_choices_max}>
                    მაქს. მ²
                    <span value="50000" onClick={(e) => updateMaxArea(e.target.attributes.value.value)}>50,000 მ²</span>
                    <span value="100000" onClick={(e) => updateMaxArea(e.target.attributes.value.value)}>100,000 მ²</span>
                    <span value="150000" onClick={(e) => updateMaxArea(e.target.attributes.value.value)}>150,000 მ²</span>
                    <span value="200000" onClick={(e) => updateMaxArea(e.target.attributes.value.value)}>200,000 მ²</span>
                    <span value="300000" onClick={(e) => updateMaxArea(e.target.attributes.value.value)}>300,000 მ²</span>
                </div>
            </div>
        </div>
        <div className={FilterStyles.filter_options_bottom}>
            <span>{errorMessage}</span>
            <Button text={"არჩევა"} isFilled={true} onClick={filterListing} />
        </div>
      </div>
    );
};
  
export default Area;