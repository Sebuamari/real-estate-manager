import { useState, useEffect } from "react";
import FilterStyles from "../styles/sass/Filter.module.scss";
import Button from "./Button";

const Regions = ({active}) => {
    const [regions, setRegions] = useState([]);

    useEffect(() => {
        const headers = { 
            'accept': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}` 
        };

        fetch('https://api.real-estate-manager.redberryinternship.ge/api/regions', { headers })
            .then(response => response.json())
            .then(data => setRegions(data));
    }, []);

    return (
      <div className={
            FilterStyles.filter_options + " " +
            (active && FilterStyles.filter_options_active)
        }>
        <p>რეგიონის მიხედვით</p>
        <div className={FilterStyles.filter_options_regions}>
            {
                regions.map((region, index) => {
                    return (
                        <div key={index} className={FilterStyles.filter_options_region}>
                            <label htmlFor={region.id}>
                                <input 
                                    type="checkbox" 
                                    id={region.id} 
                                    name={region.name} 
                                    value={region.id}  
                                />
                                <span className={FilterStyles.filter_options_region_checkmark}></span>
                                {region.name}
                            </label>
                        </div>
                    );
                })
            }
        </div>
        <Button text={"არჩევა"} isFilled={true} />
      </div>
    );
};
  
export default Regions;