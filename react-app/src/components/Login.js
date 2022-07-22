import { useState, useEffect } from 'react';
import axios from 'axios';


const Login = (props) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const url = window.location.origin + '/data.json'
        axios.get(url)
        .then(res => {
            setData(res.data);
        }).catch(err=>{
            setErrorMessage(err.message);
        })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(data.username === userName && data.password === password){
            localStorage.setItem("isLoggedIN", userName);
            props.history.push('/');
        }else{
            localStorage.setItem("isLoggedIN", null);
            setErrorMessage("UserName or Password is wrong !");
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === "userName") setUserName(value);
        if (name === "password") setPassword(value);
    }


    return (
        <div className="container fluid">
            <form className="form-group" onSubmit={handleSubmit}>
                <label htmlFor="userName">USERNAME :</label><br />
                <input type="text" className="form-control" onChange={handleChange} id="userName" name="userName"
                    required value={userName} />

                <label htmlFor="password">PASSWORD :</label><br />
                <input type="password" className="form-control" onChange={handleChange} id="password" name="password"
                    required value={password} /> <br />

                <button className='btn btn-primary' type="submit">Login</button><br /><br/>

                <div style={{color: 'red'}}>{errorMessage}</div>

            </form>
        </div>
    )
}


export default Login;