import ListingStyles from "../styles/sass/Listing.module.scss";
import email_icon from "../assets/svg/mail.svg";
import phone_icon from "../assets/svg/phone.svg";

const Agent = ({
    agent: {
        name, 
        surname,
        avatar,
        email,
        phone
    }
}) => {
    return (
      <div className={ListingStyles.agent}>
        <div className={ListingStyles.main}>
            <img width={72} height={72} src={avatar} alt={name + " " + surname + "'s avatar"} />
            <p className={ListingStyles.agent_name}>{name} {surname}</p>
            <p>აგენტი</p>
        </div>
        <p className={ListingStyles.agent_email}>
            <img src={email_icon} alt="email icon" />
            {email}
        </p>
        <p className={ListingStyles.agent_phone}>
            <img src={phone_icon} alt="phone icon" />
            {phone}
        </p>
      </div>
    );
};
  
export default Agent;