import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import plus_circle from "../assets/svg/plus_circle.svg"
import AddRealEstateStyles from "../styles/sass/AddRealEstate.module.scss";
import Button from "../components/Button";
import * as Yup from 'yup';

const AddRealEstate = () => {
    const navigate = useNavigate();
    let [regions, setRegions] = useState([]);
    let [chosenRegion, setChosenRegion] = useState(1);
    let [cities, setCities] = useState([]);
    let [agents, setAgents] = useState([]);

    useEffect(() => {
        const headers = { 
            'accept': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}` 
        };

        fetch('https://api.real-estate-manager.redberryinternship.ge/api/regions', { headers })
            .then(response => response.json())
            .then(data => setRegions(data));

        fetch('https://api.real-estate-manager.redberryinternship.ge/api/agents', { headers })
            .then(response => response.json())
            .then(data => setAgents(data));
    }, []);

    useEffect(() => {
        const headers = { 
            'accept': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}` 
        };

        fetch('https://api.real-estate-manager.redberryinternship.ge/api/cities', { headers })
            .then(response => response.json())
            .then(data => {setCities(data.filter(city => city.region_id == chosenRegion))});
    }, [chosenRegion]);

    const addAgent = async (values) => {
        const headers = { 
            'accept': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}` 
        };

        const formData = new FormData();
        formData.append('price', values.price);
        formData.append('zip_code', values.zip_code);
        formData.append('description', values.description);
        formData.append('area', values.area);
        formData.append('region_id', values.region_id);
        formData.append('city_id', values.city_id);
        formData.append('address', values.address);
        formData.append('agent_id', values.agent_id);
        formData.append('bedrooms', values.bedrooms);
        formData.append('is_rental', values.is_rental);
        formData.append('image', values.image);

        fetch(`https://api.real-estate-manager.redberryinternship.ge/api/real-estates`, {
            method: 'POST',
            headers,
            body: formData
        })
        .then(async response => {
            if (response.ok) {
                navigate("/");
            } else {
                const errorData = await response.json();
                console.error("Validation errors:", errorData.errors);
                alert("Failed to add a real estate.");
            }
        })
        .catch(error => {
            console.error("Error adding agent:", error);
        });
    };

    const SignupSchema = Yup.object().shape({
        address: Yup.string()
          .min(2, 'მინიმუმ ორი სიმბოლო')
          .required('სავალდებულო'),
        zip_code: Yup.number('მხოლოდ რიცხვები')
            .required('სავალდებულო'),
        region_id: Yup.number()
            .required('სავალდებულო'),
        city_id: Yup.number()
            .required('სავალდებულო'),
        price: Yup.number('მხოლოდ რიცხვები')
            .required('სავალდებულო'),
        area: Yup.number('მხოლოდ რიცხვები')
            .required('სავალდებულო'),
        bedrooms: Yup.number('მხოლოდ რიცხვები')
            .required('სავალდებულო'), 
        description: Yup.string()
            .test(
              'min-words', 
              'მინიმუმ ხუთი სიტყვა', 
              function(value) {
                return value && value.split(' ').filter(word => word.length > 0).length >= 5;
              }
            )
            .required('სავალდებულო'),     
        image: Yup.mixed()
            .required('სავალდებულო')
            .test(
              'fileType',
              'ფაილის ტიპი არასწორია, ატვირთეთ მხოლოდ სურათი',
              value => {
                return value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
              }
            )
            .test(
              'fileSize',
              'ფაილის ზომა არ უნდა აღემატებოდეს 1MB-ს',
              value => {
                return value && value.size <= 1048576; // 1MB = 1048576 bytes
              }
            ),
        agent_id: Yup.number()
            .required('სავალდებულო')
    });

    return (
      <>
        <div className={AddRealEstateStyles.add_real_estate}>
            <h1>ლისტინგის დამატება</h1>
            <Formik
                initialValues={{
                    price: "",
                    zip_code: "",
                    description: "",
                    area: "",
                    region_id: "",
                    city_id: "",
                    address: "",
                    agent_id: "",
                    bedrooms: "",
                    is_rental: "",
                    image: null
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    addAgent(values);
                }}
            >
            {({ setFieldValue, values, isSubmitting }) => (
                <Form>
                    <div className={AddRealEstateStyles.form_group}>
                        <h2 id="is_rental">გარიგების ტიპი</h2>
                        <div role="group" className={AddRealEstateStyles.form_group_rental} aria-labelledby="is_rental">
                            <label>
                                <Field type="radio" name="is_rental" value="0" />
                                იყიდება
                            </label>
                            <label>
                                <Field type="radio" name="is_rental" value="1" />
                                ქირავდება
                            </label>
                        </div>
                        <ErrorMessage name="is_rental" />
                    </div>

                    <div className={AddRealEstateStyles.form_group}>
                        <h2>მდებარეობა</h2>
                        <div className={AddRealEstateStyles.form_subgroup}>
                            <label htmlFor="address">მისამართი *</label>
                            <Field name="address" />
                            <ErrorMessage name="address" />
                        </div>
                        <div className={AddRealEstateStyles.form_subgroup}>
                            <label htmlFor="zip_code">საფოსტო ინდექსი *</label>
                            <Field name="zip_code" />
                            <ErrorMessage name="zip_code" />
                        </div>
                        <div className={AddRealEstateStyles.form_subgroup}>
                            <label htmlFor="region_id">რეგიონი</label>
                            <Field name="region_id" as="select" onChange={(e) => {
                                setChosenRegion(e.target.value);
                                setFieldValue("region_id", e.target.value);
                            }}>
                                {regions.map((region, id) => {
                                    return <option key={id} value={region.id}>{region.name}</option>
                                })}
                            </Field>
                            <ErrorMessage name="region_id" />
                        </div>
                        <div className={AddRealEstateStyles.form_subgroup}>
                            <label htmlFor="city_id">ქალაქი</label>
                            <Field name="city_id" as="select" onChange={(e) => {
                                setFieldValue("city_id", e.target.value);
                            }}>
                                {cities.map((city, id) => {
                                    return <option key={id} value={city.id}>{city.name}</option>
                                })}
                            </Field>
                            <ErrorMessage name="city_id" />
                        </div>
                    </div>

                    <div className={AddRealEstateStyles.form_group}>
                        <h2>ბინის დეტალები</h2>
                        <div className={AddRealEstateStyles.form_subgroup}>
                            <label htmlFor="price">ფასი</label>
                            <Field name="price" />
                            <ErrorMessage name="price" />
                        </div>
                        <div className={AddRealEstateStyles.form_subgroup}>
                            <label htmlFor="area">ფართობი</label>
                            <Field name="area" />
                            <ErrorMessage name="area" />
                        </div>
                        <div className={AddRealEstateStyles.form_subgroup}>
                            <label htmlFor="bedrooms">საძინებლების რაოდენობა*</label>
                            <Field name="bedrooms" />
                            <ErrorMessage name="bedrooms" />
                        </div>
                        <div className={AddRealEstateStyles.form_subgroup + " " + AddRealEstateStyles.form_subgroup_description}>
                            <label htmlFor="description">აღწერა *</label>
                            <Field name="description" as="textarea" />
                            <ErrorMessage name="description" />
                        </div>
                        <div className={
                            AddRealEstateStyles.form_subgroup + " " + 
                            AddRealEstateStyles.form_subgroup_image + " " +
                            (values.image && AddRealEstateStyles.form_subgroup_image_preview)}>
                            <label htmlFor="image">ატვირთეთ ფოტო *</label>
                            {values.image ? (
                                <div className={AddRealEstateStyles.custom}>
                                    <img
                                        src={URL.createObjectURL(values.image)}
                                        alt="Preview"
                                        width="100"
                                        height="100"
                                    />
                                </div>
                            ) : (
                                <>
                                    <div className={AddRealEstateStyles.custom}>
                                        <img src={plus_circle} alt="Plus icon" />
                                    </div>
                                    <input
                                        id="image"
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) => {
                                            setFieldValue('image', event.currentTarget.files[0]);
                                        }}
                                    />
                                    <ErrorMessage name="image" />
                                </>
                            )}
                        </div>
                    </div>

                    <div className={AddRealEstateStyles.form_group}>
                        <h2>აგენტი</h2>
                        <div className={AddRealEstateStyles.form_subgroup}>
                            <label htmlFor="agent_id">აირჩიე</label>
                            <Field name="agent_id" as="select">
                                {agents.map((agent, id) => {
                                    return <option key={id} value={agent.id}>{agent.name}</option>
                                })}
                            </Field>
                            <ErrorMessage name="agent_id" />
                        </div>
                    </div>

                    <div className={AddRealEstateStyles.add_real_estate_buttons}>
                        <Button text={"გაუქმება"} isFilled={false} onClick={() => navigate("/")} />
                        <Button text={"დაამატე ლისტინგი"} isFilled={true} type={"submit"} />
                    </div>
                </Form>
            )}
            </Formik>
        </div>
      </>
    );
};
  
export default AddRealEstate;