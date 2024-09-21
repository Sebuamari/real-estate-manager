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
    const [address, setAddress] = useState(localStorage.getItem('address') || "");
    const [zipCode, setZipCode] = useState(localStorage.getItem('zipCode') || "");
    const [price, setPrice] = useState(localStorage.getItem('price') || "");
    const [area, setArea] = useState(localStorage.getItem('area') || "");
    const [bedrooms, setBedrooms] = useState(localStorage.getItem('bedrooms') || "");
    const [agentId, setAgentId] = useState(localStorage.getItem('agentId') || 112);
    const [description, setDescription] = useState(localStorage.getItem('description') || "");
    const storedImage = JSON.parse(localStorage.getItem('image'));
    const [image, setImage] = useState(storedImage?.base64 || "");
    const [imageMeta] = useState(storedImage ? { type: storedImage.type, size: storedImage.size } : null);
    const [regionId, setRegionId] = useState(localStorage.getItem('regionId') || 1);
    const [cityId, setCityId] = useState(localStorage.getItem('cityId') || "");

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

    const base64ToBlob = (base64String, type) => {
        const byteString = atob(base64String.split(',')[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type });
    };

    const addRealEstate = async (values) => {
        const headers = { 
            'accept': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}` 
        };

        const formData = new FormData();
        formData.append('price', values.price);
        formData.append('zip_code', values.zipCode);
        formData.append('description', values.description);
        formData.append('area', values.area);
        formData.append('region_id', values.region_id);
        formData.append('city_id', values.city_id);
        formData.append('address', values.address);
        formData.append('agent_id', values.agent_id);
        formData.append('bedrooms', values.bedrooms);
        formData.append('is_rental', values.is_rental);
        
        if (imageMeta && image) {
            const imageBlob = base64ToBlob(image, imageMeta.type);
            formData.set('image', imageBlob, 'image.jpg');
        }

        fetch(`https://api.real-estate-manager.redberryinternship.ge/api/real-estates`, {
            method: 'POST',
            headers,
            body: formData
        })
        .then(async response => {
            if (response.ok) {
                clearData();
                navigate("/");
            } else {
                const errorData = await response.json();
                console.error("Validation errors:", errorData.errors);
                alert("Failed to add a real estate.");
            }
        })
        .catch(error => {
            console.error("Error adding a real estate:", error);
        });
    };

    const SignupSchema = Yup.object().shape({
        address: Yup.string()
          .min(2, 'მინიმუმ ორი სიმბოლო')
          .required('სავალდებულო'),
        zipCode: Yup.number('მხოლოდ რიცხვები')
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
                    if (imageMeta) return ['image/jpeg', 'image/png', 'image/gif'].includes(imageMeta.type);
                    return value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
                }
            )
            .test(
                'fileSize',
                'ფაილის ზომა არ უნდა აღემატებოდეს 1MB-ს',
                value => {
                    if (imageMeta) return imageMeta.size <= 1048576;
                    return value && value.size <= 1048576; // 1MB = 1048576 bytes
                }
            ),
        agent_id: Yup.number()
            .required('სავალდებულო')
    });

    const updateIsRental = (isRental, setFieldValue) => {
        setFieldValue("isRental", isRental);
        setIsRental(isRental);
        localStorage.setItem('isRental', isRental);
    }

    const updateAddress = (address, setFieldValue) => {
        setFieldValue("address", address);
        setAddress(address);
        localStorage.setItem('address', address);
    }
    
    const updateZipCode = (zipCode, setFieldValue) => {
        setFieldValue("zipCode", zipCode);
        setZipCode(zipCode);
        localStorage.setItem('zipCode', zipCode);
    }

    const updatePrice = (price, setFieldValue) => {
        setFieldValue("price", price);
        setPrice(price);
        localStorage.setItem('price', price);
    }

    const updateArea = (area, setFieldValue) => {
        setFieldValue("area", area);
        setArea(area);
        localStorage.setItem('area', area);
    }

    const updateDescription = (description, setFieldValue) => {
        setFieldValue("description", description);
        setDescription(description);
        localStorage.setItem('description', description);
    }

    const updateBedrooms = (bedrooms, setFieldValue) => {
        setFieldValue("bedrooms", bedrooms);
        setBedrooms(bedrooms);
        localStorage.setItem('bedrooms', bedrooms);
    }

    const updateRegionId = (regionId, setFieldValue) => {
        setFieldValue("region_id", regionId);
        setRegionId(regionId);
        localStorage.setItem('regionId', regionId);
    }

    const updateCityId = (cityId, setFieldValue) => {
        setFieldValue("city_id", cityId);
        setCityId(cityId);
        localStorage.setItem('cityId', cityId);
    }

    const updateAgentId = (agentId, setFieldValue) => {
        setFieldValue("agentId", agentId);
        setAgentId(agentId);
        localStorage.setItem('agentId', agentId);
    }

    const updateImage = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const base64String = reader.result;
            setImage(base64String);
            localStorage.setItem('image', JSON.stringify({
                base64: base64String,
                type: file.type,
                size: file.size
            }));
        };
    };

    const clearData = () => {
        localStorage.removeItem('image');
        localStorage.removeItem('agentId');
        localStorage.removeItem('cityId');
        localStorage.removeItem('regionId');
        localStorage.removeItem('description');
        localStorage.removeItem('bedrooms');
        localStorage.removeItem('address');
        localStorage.removeItem('area');
        localStorage.removeItem('price');
        localStorage.removeItem('zipCode');
        localStorage.removeItem('isRental');
    }

    return (
      <>
        <div className={AddRealEstateStyles.add_real_estate}>
            <h1>ლისტინგის დამატება</h1>
            <Formik
                initialValues={{
                    price: price,
                    zipCode: zipCode,
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
                    addRealEstate(values);
                }}
            >
            {({ setFieldValue, values, errors, touched }) => (
                <Form>
                    <div className={AddRealEstateStyles.form_group}>
                        <h2 id="is_rental">გარიგების ტიპი</h2>
                        <div role="group" 
                            value={isRental} 
                            className={AddRealEstateStyles.form_group_rental} 
                            aria-labelledby="is_rental"
                            onChange={(e) => updateIsRental(e.target.value, setFieldValue)}
                            >
                            <label>
                                <Field type="radio" name="is_rental" value="0" />
                                <span className={AddRealEstateStyles.form_group_rental_checkmark}></span>
                                იყიდება
                            </label>
                            <label>
                                <Field type="radio" name="is_rental" value="1" />
                                <span className={AddRealEstateStyles.form_group_rental_checkmark}></span>
                                ქირავდება
                            </label>
                        </div>
                        <span className={
                            AddRealEstateStyles.form_group_error + " " +
                            (errors.is_rental && touched.is_rental ? AddRealEstateStyles.form_group_error_active : "")
                        }>
                            <ErrorMessage name="is_rental" />
                        </span>
                    </div>

                    <div className={AddRealEstateStyles.form_group}>
                        <h2>მდებარეობა</h2>
                        <div className={AddRealEstateStyles.form_subgroup}>
                            <label htmlFor="address">მისამართი *</label>
                            <Field name="address" value={address} onChange={(e) => updateAddress(e.target.value, setFieldValue)} />
                            <span className={
                                AddRealEstateStyles.form_group_error + " " +
                                (errors.address && touched.address ? AddRealEstateStyles.form_group_error_active : "")
                            }>
                                <ErrorMessage name="address" />
                            </span>
                        </div>
                        <div className={AddRealEstateStyles.form_subgroup}>
                            <label htmlFor="zipCode">საფოსტო ინდექსი *</label>
                            <Field name="zipCode" value={zipCode} onChange={(e) => updateZipCode(e.target.value, setFieldValue)}/>
                            <span className={
                                AddRealEstateStyles.form_group_error + " " +
                                (errors.zipCode && touched.zipCode ? AddRealEstateStyles.form_group_error_active : "")
                            }>
                                <ErrorMessage name="zipCode" />
                            </span>
                        </div>
                        <div className={AddRealEstateStyles.form_subgroup}>
                            <label htmlFor="region_id">რეგიონი</label>
                            <Field name="region_id" as="select" value={regionId} onChange={(e) => {
                                updateRegionId(e.target.value, setFieldValue);
                            }}>
                                {regions.map((region, id) => {
                                    return <option key={id} value={region.id}>{region.name}</option>
                                })}
                            </Field>
                            <span className={
                                AddRealEstateStyles.form_group_error + " " +
                                (errors.region_id && touched.region_id ? AddRealEstateStyles.form_group_error_active : "")
                            }>
                                <ErrorMessage name="region_id" />
                            </span>
                        </div>
                        <div className={AddRealEstateStyles.form_subgroup}>
                            <label htmlFor="city_id">ქალაქი</label>
                            <Field name="city_id" as="select" value={cityId} onChange={(e) => {
                                updateCityId(e.target.value, setFieldValue);
                            }}>
                                {cities.map((city, id) => {
                                    return <option key={id} value={city.id}>{city.name}</option>
                                })}
                            </Field>
                            <span className={
                                AddRealEstateStyles.form_group_error + " " +
                                (errors.city_id && touched.city_id ? AddRealEstateStyles.form_group_error_active : "")
                            }>
                                <ErrorMessage name="city_id" />
                            </span>
                        </div>
                    </div>

                    <div className={AddRealEstateStyles.form_group}>
                        <h2>ბინის დეტალები</h2>
                        <div className={AddRealEstateStyles.form_subgroup}>
                            <label htmlFor="price">ფასი</label>
                            <Field name="price" value={price} onChange={(e) => updatePrice(e.target.value, setFieldValue)}/>
                            <span className={
                                AddRealEstateStyles.form_group_error + " " +
                                (errors.price && touched.price ? AddRealEstateStyles.form_group_error_active : "")
                            }>
                                <ErrorMessage name="price" />
                            </span>
                        </div>
                        <div className={AddRealEstateStyles.form_subgroup}>
                            <label htmlFor="area">ფართობი</label>
                            <Field name="area" value={area} onChange={(e) => updateArea(e.target.value, setFieldValue)}/>
                            <span className={
                                AddRealEstateStyles.form_group_error + " " +
                                (errors.area && touched.area ? AddRealEstateStyles.form_group_error_active : "")
                            }>
                                <ErrorMessage name="area" />
                            </span>
                        </div>
                        <div className={AddRealEstateStyles.form_subgroup}>
                            <label htmlFor="bedrooms">საძინებლების რაოდენობა*</label>
                            <Field name="bedrooms" value={bedrooms} onChange={(e) => updateBedrooms(e.target.value, setFieldValue)}/>
                            <span className={
                                AddRealEstateStyles.form_group_error + " " +
                                (errors.bedrooms && touched.bedrooms ? AddRealEstateStyles.form_group_error_active : "")
                            }>
                                <ErrorMessage name="bedrooms" />
                            </span>
                        </div>
                        <div className={AddRealEstateStyles.form_subgroup + " " + AddRealEstateStyles.form_subgroup_description}>
                            <label htmlFor="description">აღწერა *</label>
                            <Field name="description" as="textarea" value={description} onChange={(e) => updateDescription(e.target.value, setFieldValue)}/>
                            <span className={
                                AddRealEstateStyles.form_group_error + " " +
                                (errors.description && touched.description ? AddRealEstateStyles.form_group_error_active : "")
                            }>
                                <ErrorMessage name="description" />
                            </span>
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
                                    <span className={
                                        AddRealEstateStyles.form_group_error + " " +
                                        (errors.image && touched.image ? AddRealEstateStyles.form_group_error_active : "")
                                    }>
                                        <ErrorMessage name="image" />
                                    </span>
                                </>
                            )}
                        </div>
                    </div>

                    <div className={AddRealEstateStyles.form_group}>
                        <h2>აგენტი</h2>
                        <div className={AddRealEstateStyles.form_subgroup}>
                            <label htmlFor="agent_id">აირჩიე</label>
                            <Field name="agent_id" as="select" value={agentId} onChange={(e) => updateAgentId(e.target.value, setFieldValue)}>
                                {agents.map((agent, id) => {
                                    return <option key={id} value={agent.id}>{agent.name}</option>
                                })}
                            </Field>
                            <span className={
                                AddRealEstateStyles.form_group_error + " " +
                                (errors.agent_id && touched.agent_id ? AddRealEstateStyles.form_group_error_active : "")
                            }>
                                <ErrorMessage name="agent_id" />
                            </span>
                        </div>
                    </div>

                    <div className={AddRealEstateStyles.add_real_estate_buttons}>
                        <Button text={"გაუქმება"} isFilled={false} onClick={() => {
                            clearData();
                            navigate("/");
                        }} />
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