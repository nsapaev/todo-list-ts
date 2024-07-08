import React from "react";
import {Link} from "react-router-dom"
import RegisterAndLoginForm from "components/Forms/registerAndLoginForm"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Email } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setUser } from "state/auth-slice";
import {useNavigate} from 'react-router-dom'


export const LoginPages = React.memo (function(){
    const auth = getAuth();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSignInHandler = async (email: string, password: string) => {
       
        try{
            const {user} = await signInWithEmailAndPassword(auth, email, password)
            console.log(user)
            const token = await user.getIdToken();  
            dispatch(setUser({
                email: user.email,
                id: user.uid,
                token: token
            })) 
            console.log(user)
            navigate("/")
        }catch(error){
            alert(error) 
        }
        


    }


    
    return(
        <div>
        <RegisterAndLoginForm title="Login" onSubmitHandler={onSignInHandler}/>

        <p>
            you don`t have an accaunt ? <Link to="/register">  Register </Link>
        </p>
    </div>
    )
});