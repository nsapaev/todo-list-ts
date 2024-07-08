import React  from "react";
import { Link } from "react-router-dom";
import RegisterAndLoginForm from 'components/Forms/registerAndLoginForm'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "state/auth-slice";
import {useNavigate} from 'react-router-dom'

export const RegisterPages = React.memo (function(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = getAuth();

    const onSubmitHandle = async (email: string, password:string) => {
        
       try{
        const { user } =  await createUserWithEmailAndPassword(auth, email, password)
        const token = await user.getIdToken();  
        console.log(user)
        dispatch(setUser({
            email: user.email,
            id: user.uid,
            token: token
        }))   
        navigate('/')
       }catch(error){
            if(error){
                const firebaseError = error as {code: string}
                alert(firebaseError.code)
            }else{
                alert("some error")
            }
           
       }
           

    }
    

    return(
        <div>
                <RegisterAndLoginForm title="Register" onSubmitHandler={onSubmitHandle}/>
            <p>
                Already have an accaunt ? <Link to="/login">  Sign in </Link>
            </p>
        </div>
    )
});