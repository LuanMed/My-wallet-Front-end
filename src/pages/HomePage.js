import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom"
import styled from "styled-components"
import { UserInfoContext } from "../context/UserInfoContext"

export default function HomePage() {
    const [userInfo] = useContext(UserInfoContext);
    const firstName = userInfo.name?.split(' ');
    const [wallet, setWallet] = useState(undefined);
    const [finalBalance, setFinalBalance] = useState(0);
    const [deletedCounter, setDeletedCounter] = useState([]);


    const config = {
        headers: {
            "Authorization": `Bearer ${userInfo.token}`
        }
    }

    function deleteEntry(id) {
        if (!window.confirm("Quer deletar esse lançamento?")) return;

        axios.delete(`https://mywallet-api-jpnj.onrender.com/transactions/${id}`, config)
            .then(res => setDeletedCounter([...deletedCounter, 1]))
            .catch(err => alert(err.response.data))
    }

    useEffect(() => {

        axios.get(`https://mywallet-api-jpnj.onrender.com/transactions`, config)
            .then(res => {
                setWallet(res.data.transactions);
                setFinalBalance(res.data.finalBalance);
            })
            .catch(err => {
                alert(err.response)
            });
    }, [deletedCounter])

    return (
        <ContainerHome>
            <Header>
                <h2>Olá, {firstName[0]}</h2>
                <Link to={'/'}>
                    <ion-icon name="exit-outline"></ion-icon>
                </Link>
            </Header>
            <Main>
                {wallet === undefined ? <EmptyText><ThreeDots color="#A328D6" width="100" /></EmptyText> :
                    <ContainerWallet>
                        {wallet.length !== 0 ?
                            <>
                                {wallet.map(w =>                                  
                                        <Wallet key={w._id}>
                                            <Date>{w.date}</Date>
                                            <Title>{w.description}</Title>
                                            <Amount type={w.type}>{w.amount}</Amount>
                                            <DeleteButton onClick={() => (deleteEntry(w._id))}>x</DeleteButton>
                                        </Wallet>
                                )}
                                <>
                                    <Balance>SALDO</Balance>
                                    <BalanceValue value={Number(finalBalance.replace(',', '.'))}>{finalBalance}</BalanceValue>
                                </>
                            </>
                            :
                            <EmptyText>
                                Não há registro de <br /> entrada ou saída
                            </EmptyText>}
                    </ContainerWallet>}
            </Main>
            <Footer>
                <Link to={'/nova-entrada'}>
                    <button>
                        <ion-icon name="add-circle-outline"></ion-icon>
                        <p>Nova <br /> entrada</p>
                    </button>
                </Link>
                <Link to={'/nova-saida'}>
                    <button>
                        <ion-icon name="remove-circle-outline"></ion-icon>
                        <p>Nova <br /> saída</p>
                    </button>
                </Link>
            </Footer>
        </ContainerHome>
    )
}

const ContainerHome = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 25px;
`

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 326px;
    font-size: 26px;
    font-weight: 700;
    color: #FFFFFF;
    margin-bottom: 22px;
    ion-icon{
        color: #FFFFFF;
        cursor: pointer;
    }
`

const Main = styled.main`  
    position: relative;
    width: 326px;
    height: 446px;
    border-radius: 5px;
    background-color: #FFFFFF;
    margin-bottom: 13px;
    
`

const ContainerWallet = styled.div`
    height: 400px;
    overflow: auto;
    overflow-x: hidden;
    ::-webkit-scrollbar {
        width: 0px;
    }
`

const Wallet = styled.div`
    width: 326px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 23px;
    h1{
        font-size: 17px;
    }
`

const Date = styled.div`
    color: #C6C6C6;
    margin-left: 12px;
`

const Title = styled.div`
    color: #000000;
    width: 200px;
    margin-left: 10px;
`

const Amount = styled.div`
    color: ${props => props.type === "income" ? "#03AC00" : "#C70000"};
    margin-left: 20px;
    margin-right: 9px;
`

const DeleteButton = styled.button`
    color: #C6C6C6;
    background-color: #FFFFFF;
    margin-right: 9px;
    cursor: pointer;
`

const Balance = styled.div`
    position: absolute;
    left: 12px;
    bottom: 10px;
    font-size: 17px;
    font-weight: 700;
`

const BalanceValue = styled.div`
    position: absolute;
    right: 12px;
    bottom: 10px;
    font-size: 17px;
    color: ${props => props.value >= 0 ? "#03AC00" : "#C70000"} ;
`

const EmptyText = styled.div`
    width: 326px;
    height: 446px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    text-align: center;
    color: #868686;
`

const Footer = styled.footer`
    display: flex;
    gap: 15px;
    button{
        display: flex;
        flex-direction: column;
        text-align: start;
        width: 155px;
        height: 114px;
        font-size: 17px;
        font-weight: 700;
        color: #FFFFFF;
        background-color: #A328D6;
        border-radius: 5px;
        padding-left: 10px;
        cursor: pointer;
        ion-icon{
            margin: 10px -3px 33px;
            font-size: 22px;
        }
    }
`