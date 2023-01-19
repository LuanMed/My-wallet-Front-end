import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function ReginstrationPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();

    function register(e) {
        e.preventDefault();

        setDisabled(true);

        const body = {
            name,
            email,
            password,
            confirmPassword
        }

        axios.post(`${process.env.REACT_APP_API_URL}/users`, body)
            .then(res => {
                navigate('/');
                setDisabled(false);

            })
            .catch(err => {
                setDisabled(false);
                console.log(err)
                alert(err.response.data);
            })
    }

    return (
        <ContainerRegistration>
            <h1>MyWallet</h1>
            <Form onSubmit={register}>
                <label htmlFor="name"></label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    disabled={disabled}
                />
                <label htmlFor="email"></label>
                <input
                    id="email"
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    disabled={disabled}
                />
                <label htmlFor="password"></label>
                <input
                    id="password"
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    disabled={disabled}
                />
                <label htmlFor="password"></label>
                <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirme a senha"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                    disabled={disabled}
                />
                <button disabled={disabled} type="submit" >Cadastrar</button>
            </Form>
            <Link to={'/'}>
                <p>Já tem uma conta? Entre agora!</p>
            </Link>
        </ContainerRegistration>
    )
}

const ContainerRegistration = styled.div`
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