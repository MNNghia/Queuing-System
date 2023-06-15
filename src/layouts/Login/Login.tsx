import Loginpage from '../../pages/Admin/LoginPage'
import {Routes, Route} from 'react-router-dom'
import ResetPasswordPage from '../../pages/Admin/ResetPasswordPage';

function Login() {
    return (  
        <Routes>
            <Route index path='' element={<Loginpage/>} />
            <Route path='resetPassword' element={<ResetPasswordPage/>} />
        </Routes>
    );
}

export default Login;