import { useContext } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { UserInfoContext } from "../context/UserInfoContext"

export default function HomePage() {
    const [userInfo] = useContext(UserInfoContext);
    const firstName = userInfo.name.split(' ');
    
    return (
        <ContainerHome>
            <Header>
                <h2>Olá, {firstName[0]}</h2>
                <Link to={'/'}>
                    <ion-icon name="exit-outline"></ion-icon>
                </Link>
            </Header>
            <Main>
                <p>
                    Não há registro de <br /> entrada ou saída
                </p>
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
    display: flex;
    align-items: center;
    justify-content: center;
    width: 326px;
    height: 446px;
    border-radius: 5px;
    background-color: #FFFFFF;
    margin-bottom: 13px;
    p{
        font-size: 20px;
        text-align: center;
        color: #868686;
    }
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