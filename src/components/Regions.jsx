import { useState, useEffect } from "react";
import FilterStyles from "../styles/sass/Filter.module.scss";
import Button from "./Button";

const Regions = ({active, onFilter, regions, setRegions}) => {
    const [regionsList, setRegionsList] = useState([]);

    useEffect(() => {
        const headers = { 
            'accept': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}` 
        };

        fetch('https://api.real-estate-manager.redberryinternship.ge/api/regions', { headers })
            .then(response => response.json())
            .then(data => setRegionsList(data));
    }, []);

    const updateRegions = (region) => {
        //console.log(regions);
        const updatedRegions = 
            regions && !regions.includes(region) ? [...regions, region] : 
            regions && regions.includes(region) ? [...regions.filter(r => r !== region)] : 
            [region];
        setRegions(updatedRegions);
        localStorage.setItem('regions', updatedRegions);
    }

    return (
      <div className={
            FilterStyles.filter_options + " " +
            (active && FilterStyles.filter_options_active)
        }>
        <p>რეგიონის მიხედვით</p>
        <div className={FilterStyles.filter_options_regions}>
            {
                regionsList.map((region, index) => {
                    return (
                      <div key={index} className={FilterStyles.filter_options_region}>
                        <label htmlFor={region.id}>
                          <input 
                            type="checkbox" 
                            id={region.id} 
                            name={region.name} 
                            value={region.id} 
                            checked={regions.includes(String(region.id))}
                            onChange={(e) => updateRegions(region.id)}
                          />
                          <span className={FilterStyles.filter_options_region_checkmark}></span>
                          {region.name}
                        </label>
                      </div>
                    );
                })
            }
        </div>
        <Button text={"არჩევა"} isFilled={true} onClick={onFilter} />
      </div>
    );
};
  
export default Regions;