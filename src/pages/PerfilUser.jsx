import { useEffect, useState } from "react";
import { userLogged } from "../services/user";
import dayjs from "dayjs";
import { Link } from "react-router-dom";


export default function UserProfile(){

    const [user, setUser] = useState("");

    async function getUserProfile() {
        try {
            const userResponse = await userLogged();
            setUser(userResponse.data)
        } catch (error) {
            console.log(error.message)
            setUser(error.message);
        }
    }

    useEffect(()=> {
        getUserProfile();
    }, []);

    return (
        <div className=" flex flex-col h-full w-full">

            <h1 className="text-5xl mb-8">Bem-vindo! {user.name}</h1>
            <main className="flex flex-col gap-3">
                <span className="flex flex-row gap-4">
                    <span className="font-bold">
                        Name: 
                    </span>
                    <span>
                        {user.name}
                    </span>
                </span>

                <span className="flex flex-row gap-4">
                    <span className="font-bold">
                        E-mail: 
                    </span>
                    <span>
                        {user.email}
                    </span>
                </span>

                <span className="flex flex-row gap-4">
                    <span className="font-bold">
                        Data de Criação: 
                    </span>
                    <span>
                        {dayjs(user.createdAt).format("DD/MM/YYYY")}
                    </span>
                </span>
            </main>

            <footer className="flex w-full buttom-0 left-0 h-1">
            <div>
                <p>Direitos reservados <Link to={"https://github.com/danrleisnob"}
                className="hover:text-blue-700"
                >
                    @</Link></p>
            </div>
            </footer>
        </div>

    )
}