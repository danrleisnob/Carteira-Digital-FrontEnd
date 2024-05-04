/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import logo from "../assets/wallet-logo.png"
import { GoSignOut } from "react-icons/go";
import Button from "../components/Button";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { userLogged } from "../services/user";
import { useNavigate } from "react-router-dom";
import { findAllTransactions } from "../services/transactions";
import dayjs from "dayjs";
import ErrorInput from "../components/ErrorInput";

export default function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);
    const [apiErrors, setApiErrors] = useState("");

    function validateToken(){
        const token = Cookies.get("token");
        if(!token) navigate("/signin");
    }

    async function getUserLogged() {
        try {
            const userResponse = await userLogged();
            setUser(userResponse.data)
        } catch (error) {
            console.log(error.message)
            setApiErrors(error.message);
        }
    }

    async function getAllTransactions(){
        try {
            const response = await findAllTransactions();
            setTransactions(response.data);
            calculateBalance(response.data);
        } catch (error) {
            console.log(error.message);
            setApiErrors(error.message);
        }
    }

    function calculateBalance(transactions){
        if (transactions) {
            let total = 0;
    
            transactions.forEach((transaction) => {
                transaction.type === "input" 
                ? total += Number(transaction.value) 
                : (total -= Number(transaction.value));
            });
    
            setBalance(total);
        } else {
            console.error("transactions is undefined");
        }
    }
    

    useEffect(()=> {
        validateToken();
        getUserLogged();
        getAllTransactions();
    }, []);


    return (
        <main className="flex flex-col items-center justify-center bg-zinc-900 rounded p-8 w-[60rem] h-[35rem] text-2x1">
                {apiErrors && <ErrorInput text={apiErrors}/>}
            <header className="flex items-center justify-between w-full pb-4">
                <img className="w-32" src={logo} alt="" />
                <div className="flex items-center gap-4 text-white tex-2x1">
                    
                <h1 className="font-bold">Olá, <Link to={"/me"}>{user.name}</Link></h1>
                    <Link to={"/signin"}>
                        <GoSignOut />
                    </Link>
                </div>
            </header>

            <section className="bg-zinc-300 p-4 rounded flex items-center w-full h-full justify-center">
                {transactions.length ? (
                    <ul className="w-full h-full flex flex-col justify-between">
                        <div className="h-[17rem] overflow-auto p-3 font-bold">
                            {transactions.map((transaction, index) => (
                            <li 
                            key={index} className="flex justify-between items-start w-full">
                                <span className="flex items-center gap-2 font-bold" >
                                    <span className="text-base text-zinc-500 font-bold">
                                    {dayjs(transaction.created_at).format("DD/MM")}
                                    </span>
                                    {transaction.description}
                                </span>

                                <span 
                                className=
                                {`${transaction.type === "input" ? "text-green-700" : "text-red-700"}`}>
                                   R$: {transaction.value}
                                </span>

                            </li>
                            ))}
                        </div>
                        <li className="flex justify-between items-start w-full px-3 font-bold">
                            <span>
                            Balance:
                            </span>
                            <span className=
                                {`${balance > 0  ? "text-green-700" : "text-red-700"}`}
                                
                            >
                            R$: {balance}
                            </span>
                        </li>
                    </ul>
                ) : 
                (<p>There is no check-in or check-out</p>)}
                
            </section>

            <footer className="w-full pt-2 flex gap-2 text-white font-bold">
                <Button type="button" text="New Input" icon="plus" transaction="input" />
                <Button type="button" text="New Output" icon="minus" transaction="output"/>
            </footer>
        </main>
    )
}