import React, { useEffect, useState } from 'react'
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './partials/Header';

function Login() {

    const [form, setForm] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if(user)  {
         return navigate('/');
        }
     },[])
    

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async () => {
        const result = await login(form);
        console.log("Form", result);
        setErrors(null);
        if (result.status == 200) {
            if (result.data.status === 200) {
                localStorage.setItem('user', JSON.stringify(result.data.data))
                navigate('/');
                return;
            }
            if (result.data.status === 201) {
                setErrors(result.data.data);
                return;
            }
            if (result.data.status === 202) {
                toast(result.data.message);
                return;
            }
        }
    }

    return (
        <>
         <Header/>
            <div className='container'>
                <ToastContainer/>
                <div className='row justify-content-center mt-4'>
                    <div className="col-lg-5 card border-primary mt-4">
                        <div className="card-body">
                            <h4 className="card-title text-center">Welcome Back</h4>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1" className="form-label mt-4">
                                    Email or Username
                                </label>
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    name='username'
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email or username" />
                                {
                                    errors?.username && <small id="emailHelp" className="form-text text-muted">
                                        {errors.username.msg}
                                    </small>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1" className="form-label mt-4">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    onChange={handleChange}
                                    name='password'
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter Password" />
                                {
                                    errors?.password && <small id="emailHelp" className="form-text text-muted">
                                        {errors.password.msg}
                                    </small>
                                }
                            </div>
                            <button type="button" class="btn btn-primary" onClick={handleSubmit}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
