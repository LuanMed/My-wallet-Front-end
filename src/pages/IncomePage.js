import axios from "axios";
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { UserInfoContext } from "../context/UserInfoContext";

export default function IncomePage() {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [disabled, setDisabled] = useState("");
    const navigate = useNavigate();
    const [userInfo] = useContext(UserInfoContext);

    const config = {
        headers: {
            "Authorization": `Bearer ${userInfo.token}`
        }
    }

    function addIncome(e) {
        e.preventDefault();
        setDisabled(true);
        
        const body = {
            amount,
            description,
            type: "income"
        }

        axios.post(`https://mywallet-api-jpnj.onrender.com/transactions`, body, config)
        .then(res => {
            navigate('/home');
            setDisabled(false);
        })
        .catch(err => {
            setDisabled(false);
            alert(err.response.data);
        })

    }

    return (
        <ContainerIncome>
            <Header>
                <h2>Nova entrada</h2>
            </Header>
            <Form onSubmit={addIncome}>
                <label htmlFor="amount"></label>
                <input
                    id="amount"
                    type="number"
                    placeholder="Valor"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    required
                    disabled={disabled}
                />
                <label htmlFor="description"></label>
                <input
                    id="description"
                    type="text"
                    placeholder="Descrição"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                    disabled={disabled}
                />
                <button disabled={disabled} type="submit" >Salvar entrada</button>
            </Form>
        </ContainerIncome>
    )
}

const ContainerIncome = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 159px;
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
`

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 326px;
    font-size: 26px;
    font-weight: 700;
    color: #FFFFFF;
    margin-bottom: 40px;
    ion-icon{
        cursor: pointer;
    }
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
`