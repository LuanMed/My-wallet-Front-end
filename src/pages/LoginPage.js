import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import env from 'react-dotenv';
import axios from "axios";
import { UserInfoContext } from "../context/UserInfoContext";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useContext(UserInfoContext);

    function login(e) {
        e.preventDefault();
        setDisabled(true);
        const body = {email, password};
        
        axios.post(`${env.REACT_APP_API_URL}/logged`, body)
            .then(res => {
                navigate('/');
                setDisabled(false);           
                console.log(res.data);
                setUserInfo(res.data);
                navigate('/home');
            })
            .catch(err => {
                setDisabled(false);
                console.log(err)
                alert(err.response.data);
            })

    }

    return (
        <ContainerLogin>
            <h1>MyWallet</h1>
            <Form onSubmit={login}>
                <label htmlFor="email"></label>
                <input
                    id="email"
                    placeholder="E-mail"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    disabled={disabled}
                />
                <label htmlFor="password"></label>
                <input
                    id="password"
                    placeholder="Senha"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    disabled={disabled}
                />
                <button disabled={disabled} type="submit" >Entrar</button>
            </Form>
            <Link to={'/cadastro'}>
                <p>Primeira vez? Cadastre-se!</p>
            </Link>
        </ContainerLogin>
    )
}

const ContainerLogin = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 159px;
    h1{
        font-family: 'Saira Stencil One';
        font-size: 32px;
        color: #FFFFFF;
        margin-bottom: 24px;
    }
    input{
        font-size: 20px;
        width: 326px;
        height: 58px;
        border-radius: 5px;
        margin-bottom: 13px;
        padding-left: 15px;
        outline: none;
        &::placeholder{
            font-size: 20px;
            color: #000000;
        }
    }
    button{
        font-size: 20px;
        font-weight: 700;
        color: #FFFFFF;
        background-color: #A328D6;
        width: 326px;
        height: 46px;
        border-radius: 5px;
        margin-bottom: 36px;
        cursor: pointer;
    }
    p{
        font-size: 15px;
        font-weight: 700;
        color: #FFFFFF;
        cursor: pointer;
    }
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
`