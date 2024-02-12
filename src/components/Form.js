import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form"
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from "react-router-dom";
const Form = () => {
const navigate = useNavigate()
    const [cities, setCities] = useState([]);

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await axios.post("http://44.201.126.35:5000/api/auth/signUp",JSON.stringify(data));
            window.alert('User Created Succesfully, Please login'); 
            navigate('/login')
        }
        catch (err) {
            window.alert(err);
        }
    }
    const {
        control,
        register,
        handleSubmit,
        formState: { errors }, watch, setValue
    } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            gender: '',
            dateOfBirth: '',
            email: '',
            mobileNo: '',
            state: '',
            city: '',
            password: '',
            hobbies: [],
            agree: ''
        },
    });
    const state = watch("state");
    // const hobbies=watch("hobbies");

    const setValueRef = useRef(setValue);
    // const selectedHobbies = useRef([]);

    // const handleCheckbox=(e,value)=>{
    //     if(e.target.checked){
    //         const newHobbies=[];
    //         newHobbies.push(value);
    //         setValue("hobbies",newHobbies);
    //     }
    //     console.log(hobbies)
    // }

    // useEffect(() => {
    //     // Update the selectedHobbies ref with the latest value of hobbies
    //     selectedHobbies.current = watch("hobbies");
    //     console.log(selectedHobbies.current);

    //     // Update the hobbies field with the latest value
    //     setValue("hobbies", selectedHobbies.current);
    // }, [setValue, watch]);

    useEffect(() => {
        if (state === "Delhi") {
            setValueRef.current("city", ""); // Reset city value
            setCities(["Delhi", "New Delhi"]);
        } else if (state === "UP") {
            setValueRef.current("city", ""); // Reset city value
            setCities(["Noida", "Lucknow"]);
        } else {
            setValueRef.current("city", ""); // Reset city value
            setCities([]);
        }
    }, [state]);

    // 

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-12 col-md-6 offset-md-3 mt-3 mb-3">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            Registration Form
                        </div>
                        <div className="card-body">
                            <div className="form-group mb-2">
                                <label> First Name</label>
                                <Controller
                                    name="firstName"
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field }) => <input maxLength={25} className="form-control" {...field} />}
                                />
                                {errors.firstName && (
                                    <span className="text-danger">*please enter your first name</span>
                                )}
                            </div>
                            <div className="form-group mb-2">
                                <label> Last Name</label>
                                <Controller
                                    name="lastName"
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field }) => <input maxLength={25} className="form-control" {...field} />}
                                />
                                {errors.lastName && (
                                    <span className="text-danger">*please enter your last name</span>
                                )}

                            </div>
                            <div className="form-group mb-2">
                                <label>Gender</label>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="male"
                                        className="form-radio h-4 w-4 text-indigo-600"
                                        {...register("gender", { required: true })}
                                        value="male"
                                    />
                                    <label htmlFor="male" className="ml-2">Male</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="female"
                                        className="form-radio h-4 w-4 text-indigo-600"
                                        {...register("gender", { required: true })}
                                        value="female"
                                    />
                                    <label htmlFor="female" className="ml-2">Female</label>
                                </div>
                                {errors.gender && (
                                    <span className="text-danger">*please select your gender</span>
                                )}
                            </div>
                            <div className="form-group mb-2">
                                <label> Date of birth</label>
                                <Controller
                                    name="dateOfBirth"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            className="form-control "
                                            type="date"
                                            selected={field.value}
                                            onChange={(date) =>
                                                field.onChange(moment(date).format("DD/MM/yyyy"))}
                                            dateformat="dd/MM/yyyy"
                                            placeholdertext="DD/MM/YYYY"
                                        />
                                    )}
                                />
                                {errors.dateOfBirth && <span className="text-danger">*This field is required</span>}
                            </div>
                            <div className="form-group mb-2">
                                <label>Email</label>
                                <Controller
                                    name="email"
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field }) => <input type="email" className="form-control" {...field} />}
                                />
                                {errors.email && (
                                    <span className="text-danger">*please enter your email</span>
                                )}

                            </div>
                            <div className="form-group mb-2">
                                <label>State</label>
                                <Controller
                                    name="state"
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}

                                    render={({ field }) =>
                                        <select {...field} className="form-control">
                                            <option value="">Select State</option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="UP">UP</option>
                                        </select>}
                                />
                                {errors.state && (
                                    <span className="text-danger">*please select state</span>
                                )}

                            </div>
                            <div className="form-group mb-2">
                                <label>City</label>
                                <Controller
                                    name="city"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <select {...field} className="form-control">
                                            <option value="">Select City</option>
                                            {cities.map(city => (
                                                <option key={city} value={city}>{city}</option>
                                            ))}
                                        </select>
                                    )}
                                />
                                {errors.city && (
                                    <span className="text-danger">*please select a city</span>
                                )}
                            </div>
                            <div className="form-group mb-2">
                                <label>Password</label>
                                <Controller
                                    name="password"
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field }) => <input type="password" className="form-control" {...field} />}
                                />
                                {errors.password && (
                                    <span className="text-danger">*please enter your password</span>
                                )}
                            </div>
                            {/* <div className="form-group mb-2">
                                <label>Hobbies</label>
                                <div>
                                    
                                    <Controller
                                        name="hobbies"
                                        control={control}
                                        rules={{ required: true, validate: value => value.length > 0 }}
                                        render={({ field }) => (
                                            <>
                                            
                                                <input
                                                    type="checkbox"
                                                    id="chess"
                                                    value="chess"
                                                    onClick={(e)=>handleCheckbox(e,"chess")}
                                                    {...field}
                                                />
                                            
                                                <label htmlFor="chess">Chess</label>
                                                <input
                                                    type="checkbox"
                                                    id="hockey"
                                                    value="hockey"
                                                    onClick={(e)=>handleCheckbox(e,"hockey")}
                                                    {...field}
                                                />
                                                <label htmlFor="hockey">Hockey</label>
                                                <input
                                                    type="checkbox"
                                                    id="cricket"
                                                    value="cricket"
                                                    onClick={(e)=>handleCheckbox(e,"cricket")}
                                                    {...field}
                                                />
                                                <label htmlFor="cricket">Cricket</label>
                                                <input
                                                    type="checkbox"
                                                    id="football"
                                                    value="football"
                                                    onClick={(e)=>handleCheckbox(e,"football")}
                                                    {...field}
                                                />
                                                <label htmlFor="football">Football</label>
                                            </>
                                        )}
                                    />

                                    {errors.hobbies && (
                                        <span className="text-danger">*please select a hobbie</span>
                                    )}
                                </div>
                            </div> */}
                            {/* <div className="form-group mb-2">
                                <div>
                                    <Controller
                                        name="agree"
                                        control={control}
                                        rules={{ required: true, validate: value => value.length > 0 }}
                                        render={({ field }) => (
                                            <>
                                                <input
                                                    type="checkbox"
                                                    id="agree"
                                                    value="agree"
                                                    {...field}
                                                />
                                                <label htmlFor="agree">I agree Terms and Conditions</label>
                                            </>
                                        )}
                                    />

                                    {errors.agree && (
                                        <span className="text-danger">*please agree to terms and conditions</span>
                                    )}
                                </div>
                            </div> */}
                            <div className="form-group text-center mb-2">
                                <button type="submit" className="btn btn-success">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </form >
    )
}

export default Form
