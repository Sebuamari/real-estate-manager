import { Formik, Form, Field, ErrorMessage } from 'formik';
import plus_circle from "../assets/svg/plus_circle.svg"
import AddAgentStyles from "../styles/sass/AddAgent.module.scss";
import Button from './Button';
import * as Yup from 'yup';

const AddAgent = ({id, onClick}) => {
    const addAgent = async (values) => {
        const headers = { 
            'accept': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}` 
        };

        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('surname', values.surname);
        formData.append('email', values.email);
        formData.append('phone', values.phone);
        formData.append('avatar', values.avatar);
    
        fetch(`https://api.real-estate-manager.redberryinternship.ge/api/agents`, {
            method: 'POST',
            headers,
            body: formData
        })
        .then(async response => {
            if (response.ok) {
                document.body.style.overflow = "auto";
                onClick();
            } else {
                const errorData = await response.json();
                console.error("Failed to add agent:", errorData);
                alert("Failed to add agent.");
            }
        })
        .catch(error => {
            console.error("Error adding agent:", error);
        });
    };

    const SignupSchema = Yup.object().shape({
        name: Yup.string()
          .min(2, 'მინიმუმ 2 სიმბოლო')
          .required('სავალდებულო'),
        surname: Yup.string()
          .min(2, 'მინიმუმ 2 სიმბოლო')
          .required('სავალდებულო'),
        email: Yup.string()
            .matches('@redberry.ge', 'უნდა მთავრდებოდეს @redberry.ge-თ')
            .email('Invalid email')
            .required('სავალდებულო'),
        phone: Yup.string()
            .matches(/^5\d{8}$/, 'უნდა იყოს ფორმატის 5XXXXXXXX')
            .required('სავალდებულო'),
        avatar: Yup.mixed(),
    });

    return (
      <div className={AddAgentStyles.add_agent} onClick={(e) => {
        if(!document.querySelector(`.${AddAgentStyles.add_agent_modal}`).contains(e.target)) {
            onClick();
        }
      }}>
        <div className={AddAgentStyles.add_agent_modal}>
            <p>აგენტის დამატება</p>
            <Formik
                initialValues={{
                    name: '',
                    surname: '',
                    email: '',
                    phone: '',
                    avatar: null
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    addAgent(values);
                }}
            >
            {({ setFieldValue, values, errors, touched }) => (
                <Form>
                    <div className={AddAgentStyles.form_group}>
                        <label htmlFor="name">სახელი *</label>
                        <Field name="name" />
                        <span className={
                            AddAgentStyles.form_group_error + " " +
                            (errors.name && touched.name ? AddAgentStyles.form_group_error_active : "")
                        }>
                            <ErrorMessage name="name" />
                        </span>
                    </div>

                    <div className={AddAgentStyles.form_group}>
                        <label htmlFor="surname">გვარი</label>
                        <Field name="surname" />
                        <span className={
                            AddAgentStyles.form_group_error + " " +
                            (errors.surname && touched.surname ? AddAgentStyles.form_group_error_active : "")
                        }>
                            <ErrorMessage name="surname" />
                        </span>
                    </div>

                    <div className={AddAgentStyles.form_group}>
                        <label htmlFor="firstName">ელ-ფოსტა *</label>
                        <Field name="email" type="email" />
                        <span className={
                            AddAgentStyles.form_group_error + " " +
                            (errors.email && touched.email ? AddAgentStyles.form_group_error_active : "")
                        }>
                            <ErrorMessage name="email" />
                        </span>
                    </div>

                    <div className={AddAgentStyles.form_group}>
                        <label htmlFor="firstName">ტელეფონის ნომერი</label>
                        <Field name="phone" type="phone" />
                        <span className={
                            AddAgentStyles.form_group_error + " " +
                            (errors.phone && touched.phone ? AddAgentStyles.form_group_error_active : "")
                        }>
                            <ErrorMessage name="phone" />
                        </span>
                    </div>

                    <div className={
                        AddAgentStyles.form_group + " " + 
                        AddAgentStyles.form_group_image + " " +
                        (values.avatar && AddAgentStyles.form_group_image_preview)}>
                        <label htmlFor="image">ატვირთეთ ფოტო *</label>
                        {values.avatar ? (
                            <div className={AddAgentStyles.custom}>
                                <img
                                    src={URL.createObjectURL(values.avatar)}
                                    alt="Preview"
                                    width="100"
                                    height="100"
                                />
                            </div>
                        ) : (
                            <>
                                <div className={AddAgentStyles.custom}>
                                    <img src={plus_circle} alt="Plus icon" />
                                </div>
                                <input
                                    id="avatar"
                                    name="avatar"
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => {
                                        setFieldValue('avatar', event.currentTarget.files[0]);
                                    }}
                                />
                                <span className={
                                    AddAgentStyles.form_group_error + " " +
                                    (errors.avatar && touched.avatar ? AddAgentStyles.form_group_error_active : "")
                                }>
                                    <ErrorMessage name="avatar" />
                                </span>
                            </>
                        )}
                    </div>

                    <div className={AddAgentStyles.add_agent_buttons}>
                        <Button text={"გაუქმება"} isFilled={false} onClick={onClick} />
                        <Button text={"დაამატე აგენტი"} isFilled={true} type={"submit"} />
                    </div>
                </Form>
            )}
            </Formik>
        </div>
      </div>
    );
};
  
export default AddAgent;