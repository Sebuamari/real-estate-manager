import { useNavigate } from "react-router-dom";
import ListingStyles from "../styles/sass/Listing.module.scss";
import Button from './Button';
import cross from "../assets/svg/cross.svg";

const ListingDelete = ({id, onClick}) => {
    const navigate = useNavigate();

    const deleteListing = () => {
        const headers = { 
            'accept': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}` 
        };
    
        fetch(`https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`, {
            method: 'DELETE',
            headers
        })
        .then(response => {
            if (response.ok) {
                document.body.style.overflow = "auto";
                alert("Listing deleted successfully.");
                navigate("/");
            } else {
                alert("Failed to delete listing.");
            }
        })
        .catch(error => {
            console.error("Error deleting listing:", error);
        });
    };

    return (
      <div className={ListingStyles.listing_delete} onClick={(e) => {
        if(!document.querySelector(`.${ListingStyles.listing_delete_modal}`).contains(e.target)) {
            onClick();
        }
      }}>
        <div className={ListingStyles.listing_delete_modal}>
            <img src={cross} width={11} height={11} alt='cross icon' onClick={onClick} />
            <p>გსურთ წაშალოთ ლისტინგი?</p>
            <div className={ListingStyles.listing_delete_buttons}>
                <Button text={"გაუქმება"} isFilled={false} onClick={onClick} />
                <Button text={"დადასტურება"} isFilled={true} onClick={deleteListing} />
            </div>
        </div>
      </div>
    );
};
  
export default ListingDelete;