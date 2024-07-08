import { UserAuthType } from "Types"
import { useSelector } from "react-redux"
import { RootState, AppDispatch} from "state/store"


export const useAuth = () => {

    const { email,token, id} = useSelector<RootState,UserAuthType>(state => state.user)


    return {
        isAuth: !!email,
        email: email,
        token: token,
        id: id
    }

}