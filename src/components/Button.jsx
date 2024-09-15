import ButtonStyles from "../styles/sass/Button.module.scss";

const Button = ({text, isFilled, onClick}) => {
    return (
      <div className={ButtonStyles.button + " " + (isFilled && ButtonStyles.button_filled)} onClick={onClick}>
        {text}
      </div>
    );
};
  
export default Button;