import {BiLogOut} from 'react-icons/bi';
import useLogout from '../hooks/useLogout';

const LogoutButton = () =>{
    const {loading, logout} = useLogout();

    return(
        <div className="mt-auto">
            <button onClick={logout} disabled={loading} className="flex items-center">
                {!loading ? <>
                    <BiLogOut className="w-6 h-6 cursor-pointer"/>
                    Logout
                </> : <span className="loading loading-spinner"></span>}
            </button>
        </div>
    );
};

export default LogoutButton;