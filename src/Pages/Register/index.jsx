import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/JF.png';
import { LayoutComponents } from "../../components/LayoutComponents"
import { api } from '../../services/api';


export const Register = () =>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            name: name,
            email: email,
            password: password
        };

        await api.post('/register', payload)
                 .then((response) => console.log(response.data))
                 .catch((err) => {
                    console.error("ops! ocorreu um erro" + err);
                 });

    }

    return(
        <LayoutComponents>
            <form className='login-form' onSubmit={handleSubmit} >
                <span className='login-form-title'>Criar conta</span>
                <span className='login-form-title'>
                    <img src={logo} alt="login" />
                </span>

                <div className='wrap-input'>
                    <input className={name !== "" ? 'has-val input' : 'input'} type='text' value={name} onChange={e => setName(e.target.value)} />
                    <span className='focus-input' data-placeholder='Nome' />
                </div>

                <div className='wrap-input'>
                    <input className={email !== "" ? 'has-val input' : 'input'} type='email' value={email} onChange={e => setEmail(e.target.value)} />
                    <span className='focus-input' data-placeholder='Email' />
                </div>

                <div className='wrap-input'>
                    <input className={password !== "" ? 'has-val input' : 'input'} type='password' value={password} onChange={e => setPassword(e.target.value)} />
                    <span className='focus-input' data-placeholder='Senha' />
                </div>

                <div className='container-login-form-btn'>
                    <button className='login-form-btn' type='submit'>Cadastrar</button>
                </div>

                <div className='text-center'>
                    <span className='text1'>Já possui uma conta?</span>
                    <Link className='text2' to='/'>Fazer login.</Link>
                </div>

            </form>
        </LayoutComponents>
    )
}