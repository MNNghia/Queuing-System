import Loginpage from '../../pages/LoginPage'
import {Routes, Route} from 'react-router-dom'
import ResetPasswordPage from '../../pages/ResetPasswordPage';

function Login() {
    return (  
        <Routes>
            <Route path='' element={<Loginpage/>} />
            <Route path='resetPassword' element={<ResetPasswordPage/>} />
        </Routes>
    );
}

export default Login;