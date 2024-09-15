import ButtonStyles from "../styles/sass/Button.module.scss";
import plus from "../assets/svg/plus.svg";

const Button = ({text, isFilled, onClick, type, plusButton}) => {
    return (
      <button type={type} className={ButtonStyles.button + " " + (isFilled && ButtonStyles.button_filled)} onClick={onClick}>
        {plusButton && <img src={plus} alt="plus icon" />}
        {text}
      </button>
    );
};
  
export default Button;