import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [formData, setData] = useState({});
    const navigate=useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...formData,
            [name]: value
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://44.201.126.35:5000/api/auth/login", formData);
            if(response.data){
                navigate('/user-list');
            }
        }catch(err){
            window.alert(err.response.data.message);
        }
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-4 offset-md-4 mt-3">
                    <div className="card">
                        <div className="card-header bg-primary text-white">Login</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-2">
                                    <label htmlFor="email">Enter Email</label>
                                    <input type="email" name="email" onChange={(e) => handleChange(e)} className="form-control" required />
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="email">Enter Password</label>
                                    <input type="password" name="password" onChange={(e) => handleChange(e)} className="form-control" required />
                                </div>
                                <div className="form-group text-end mb-2">
                                    <button type="submit" className="btn btn-success">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
