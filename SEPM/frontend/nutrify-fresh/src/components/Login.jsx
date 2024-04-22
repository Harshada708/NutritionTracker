import { useState,useContext, useEffect } from "react"
import { UserContext } from "../contexts/UserContext";
import { Link,useNavigate } from "react-router-dom"
export default function Login()
{


    const loggedData = useContext(UserContext);

    


    const navigate = useNavigate();

    const [userCreds,setUserCreds] = useState({
        email:"",
        password:""
    })

    const [message,setMessage] = useState({
        type:"invisible-msg",
        text:"Dummy Msg"
    })

    

    function handleInput(event)
    {
        setUserCreds((prevState)=>{
            return {...prevState,[event.target.name]:event.target.value};
        })
    }

    function handleSubmit(event)
    {   
        event.preventDefault();
        console.log(userCreds);

        fetch("http://localhost:8000/login",{
            method:"POST",
            body:JSON.stringify(userCreds),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((response)=>{

            if(response.status===404)
            {
                setMessage({type:"error",text:"Username or Email Doesnt Exist"});
            }
            else if(response.status===403) {
                setMessage({type:"error",text:"Incorrect Password"});
            }
           

            setTimeout(()=>{
                setMessage({type:"invisible-msg",text:"Dummy Msg"})
            },5000)

            return response.json();
            
            
        })
        .then((data)=>{

           

            if(data.token!==undefined)
            {
                localStorage.setItem("nutrify-user",JSON.stringify(data));

                loggedData.setLoggedUser(data);

                navigate("/track");
            }

        })
        .catch((err)=>{
            console.log(err);
        })


    }


    return (
        <section className="container">
            

            <form className="form" onSubmit={handleSubmit}>

                <div style={{ marginBottom: '100px' }}></div>

                <h1>Login To NutriDiary</h1>

                <div className="image-placeholder"></div>
                

                <input className="inp" required type="email" onChange={handleInput}
                placeholder="Enter Email" name="email" value={userCreds.email}/>

                  

                <input className="inp" maxLength={8} type="password" onChange={handleInput} 
                placeholder="Enter Password" name="password" value={userCreds.password}/>

                <div style={{ marginBottom: '0.05px' }}></div>
     

                <button className="btn">Login</button>

                <p>Dont Have an Account ? <Link to="/register">Register Now</Link></p>

                <p className={message.type}>{message.text}</p>

            </form>
            
        </section>
    )
}