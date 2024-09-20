import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import plus_circle from "../assets/svg/plus_circle.svg"
import AddRealEstateStyles from "../styles/sass/AddRealEstate.module.scss";
import Button from "../components/Button";
import * as Yup from 'yup';

const AddRealEstate = () => {
    const navigate = useNavigate();
    const [regions, setRegions] = useState([]);
    const [cities, setCities] = useState([]);
    const [agents, setAgents] = useState([]);
    const [isRental, setIsRental] = useState(localStorage.getItem('isRental') || null);
    const [address, setAddress] = useState(localStorage.getItem('address') || null);
    const [zipCode, setZipCode] = useState(localStorage.getItem('zipCode') || null);
    const [price, setPrice] = useState(localStorage.getItem('price') || null);
    const [area, setArea] = useState(localStorage.getItem('area') || null);
    const [bedrooms, setBedrooms] = useState(localStorage.getItem('bedrooms') || null);
    const [agentId, setAgentId] = useState(localStorage.getItem('agentId') || 112);
    const [description, setDescription] = useState(localStorage.getItem('description') || null);
    const [image, setImage] = useState(localStorage.getItem('image') || null);
    const [regionId, setRegionId] = useState(localStorage.getItem('regionId') || 1);
    const [cityId, setCityId] = useState(localStorage.getItem('cityId') || null);

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
            .then(data => {
                const filteredCities = data.filter(city => city.region_id == regionId);
                setCities(filteredCities);
                if (!cityId && filteredCities.length > 0) {
                    setCityId(filteredCities[0].id);
                }
            });
    }, [regionId]);

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

    const updateIsRental = (isRental) => {
        setIsRental(isRental);
        localStorage.setItem('isRental', isRental);
    }

    const updateAddress = (address) => {
        setAddress(address);
        localStorage.setItem('address', address);
    }
    
    const updateZipCode = (zipCode) => {
        setZipCode(zipCode);
        localStorage.setItem('zipCode', zipCode);
    }

    const updatePrice = (price) => {
        setPrice(price);
        localStorage.setItem('price', price);
    }

    const updateArea = (area) => {
        setArea(area);
        localStorage.setItem('area', area);
    }

    const updateDescription = (description) => {
        setDescription(description);
        localStorage.setItem('description', description);
    }

    const updateBedrooms = (bedrooms) => {
        setBedrooms(bedrooms);
        localStorage.setItem('bedrooms', bedrooms);
    }

    const updateRegionId = (regionId) => {
        setRegionId(regionId);
        localStorage.setItem('regionId', regionId);
    }

    const updateCityId = (cityId) => {
        setCityId(cityId);
        localStorage.setItem('cityId', cityId);
    }

    const updateAgentId = (agentId) => {
        setAgentId(agentId);
        localStorage.setItem('agentId', agentId);
    }

    const updateImage = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const base64String = reader.result;
            setImage(base64String);
            localStorage.setItem('image', base64String);
        };
    };

    return (
      <>
        <div className={AddRealEstateStyles.add_real_estate}>
            <h1>ლისტინგის დამატება</h1>
            <Formik
                initialValues={{
                    price: price,
                    zip_code: zipCode,
                    description: description,
                    area: area,
                    region_id: regionId,
                    city_id: cityId,
                    address: address,
                    agent_id: agentId,
                    bedrooms: bedrooms,
                    is_rental: isRental,
                    image: image
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
                        <div role="group" 
                            value={isRental} 
                            className={AddRealEstateStyles.form_group_rental} 
                            aria-labelledby="is_rental"
                            onChange={(e) => updateIsRental(e.target.value)}
                            >
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
                            <Field name="address" value={address} onChange={(e) => updateAddress(e.target.value)} />
                            <ErrorMessage name="address" />
                        </div>
                        <div className={AddRealEstateStyles.form_subgroup}>
                            <label htmlFor="zip_code">საფოსტო ინდექსი *</label>
                            <Field name="zip_code" value={zipCode} onChange={(e) => updateZipCode(e.target.value)}/>
                            <ErrorMessage name="zip_code" />
                        </div>
                        <div className={AddRealEstateStyles.form_subgroup}>
                            <label htmlFor="region_id">რეგიონი</label>
                            <Field name="region_id" as="select" value={regionId} onChange={(e) => {
                                updateRegionId(e.target.value);
                            }}>
                                {regions.map((region, id) => {
                                    return <option key={id} value={region.id}>{region.name}</option>
                                })}
                            </Field>
                            <ErrorMessage name="region_id" />
                        </div>
                        <div className={AddRealEstateStyles.form_subgroup}>
                            <label htmlFor="city_id">ქალაქი</label>
                            <Field name="city_id" as="select" value={cityId} onChange={(e) => {
                                updateCityId(e.target.value);
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
                            <Field name="price" value={price} onChange={(e) => updatePrice(e.target.value)}/>
                            <ErrorMessage name="price" />
                        </div>
                        <div className={AddRealEstateStyles.form_subgroup}>
                            <label htmlFor="area">ფართობი</label>
                            <Field name="area" value={area} onChange={(e) => updateArea(e.target.value)}/>
                            <ErrorMessage name="area" />
                        </div>
                        <div className={AddRealEstateStyles.form_subgroup}>
                            <label htmlFor="bedrooms">საძინებლების რაოდენობა*</label>
                            <Field name="bedrooms" value={bedrooms} onChange={(e) => updateBedrooms(e.target.value)}/>
                            <ErrorMessage name="bedrooms" />
                        </div>
                        <div className={AddRealEstateStyles.form_subgroup + " " + AddRealEstateStyles.form_subgroup_description}>
                            <label htmlFor="description">აღწერა *</label>
                            <Field name="description" as="textarea" value={description} onChange={(e) => updateDescription(e.target.value)}/>
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
                                        src={image}
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
                                            const file = event.currentTarget.files[0];
                                            if (file) {
                                                setFieldValue('image', file);
                                                updateImage(file);
                                            }
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
                            <Field name="agent_id" as="select" value={agentId} onChange={(e) => updateAgentId(e.target.value)}>
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