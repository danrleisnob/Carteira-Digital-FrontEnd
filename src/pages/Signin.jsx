import { Link } from "react-router-dom";
import logo from "../assets/wallet-logo.png";
import Button from "../components/Button";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorInput from "../components/ErrorInput";
import { signinSchema } from "../schemas/signinSchema";
import { signin } from "../services/user";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Signin(){

    const {
        register,
         handleSubmit,
          formState: { errors },
         } = useForm({ resolver: zodResolver(signinSchema) });
         const navigate = useNavigate();

         const [apiErrors, setApiErrors] = useState("");

    async function handleSubmitForm (data){
        try {
            const token = await signin(data);
            Cookies.set("token", token.data, { expires: 1 });
            navigate("/");
        } catch (error) {
            console.log(error.message);
            setApiErrors(error.message);
        }
    }

    useEffect(() =>{
        Cookies.remove("token")
    }, []);

    return(
        <div className="flex flex-col items-center justify-around bg-zinc-900 rounded p-8 w-[35rem] h-[35rem]">
          <img src={logo} alt="wallet-logo" className="w-44" />

            {apiErrors && <ErrorInput text={apiErrors} />}

            <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col justify-center gap-4 w-full text-2x1 ">

                <Input type="email" placeholder="Email" register={register} name="email"/>
                {errors.email && <ErrorInput text={errors.email.message}/>}
                
                <Input type="password" placeholder="Password" register={register} name="password" />
                {errors.password && <ErrorInput text={errors.password.message} />}
                
                <Button type="submit"text="SIGNIN" />

            </form>

            <p className="text-white text-2x1">
                Don-t have acoount? <Link to="/signup" className="hover:text-sky-600"> Register </Link>
                </p>
        </div>
    )
}