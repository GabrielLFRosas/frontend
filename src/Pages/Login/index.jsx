import { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import logo from '../../assets/JF.png';
import { LayoutComponents } from '../../components/LayoutComponents';
import { AuthContext } from '../../context/auth';

export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signIn, signed } = useContext(AuthContext);

    let handleSignIn = async (e) => {
        e.preventDefault();
        const data = {
            email, 
            password
        };

        await signIn(data);
    }

    if(signed) {
        return <Navigate to="/home" />
    } else {            
        return (    
            <LayoutComponents>
                <form className='login-form' onSubmit={handleSignIn}>
                    <span className='login-form-title'>Bem-vindo</span>
                    <span className='login-form-title'>
                        <img src={logo} alt="login" />
                    </span>
    
                    <div className='wrap-input'>
                        <input className={email !== "" ? 'has-val input' : 'input'} type='email' value={email} onChange={e => setEmail(e.target.value)} />
                        <span className='focus-input' data-placeholder='Email' />
                    </div>
    
                    <div className='wrap-input'>
                        <input className={password !== "" ? 'has-val input' : 'input'} type='password' value={password} onChange={e => setPassword(e.target.value)} />
                        <span className='focus-input' data-placeholder='Senha' />
                    </div>
    
                    <div className='container-login-form-btn'>
                        <button className='login-form-btn' type='submit'>Login</button>
                    </div>
    
                    <div className='text-center'>
                        <span className='text1'>Não possui conta?</span>
                        <Link className='text2' to='/register'>Criar conta.</Link>
                    </div>
    
                </form>
            </LayoutComponents>          
        )
    }

}