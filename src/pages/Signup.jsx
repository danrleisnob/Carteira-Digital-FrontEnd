import { Link } from "react-router-dom";
import logo from "../assets/wallet-logo.png"
import Button from "../components/Button"
import Input from "../components/Input"
import { BsArrowLeft } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorInput from "../components/ErrorInput";
import { signupSchema } from "../schemas/signunShemas";
import { signup } from "../services/user";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function Signup(){

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(signupSchema) });
    const navigate = useNavigate();

    const [apiErrors, setApiErrors] = useState("");



    async function handleSubmitForm(data){
        try {
            await signup(data);
            navigate("/signin");
        } catch (error) {
            console.log(error.message)
            setApiErrors(error.message)
        }
    }



    return(
        <div className="flex flex-col items-center justify-around bg-zinc-900 rounded p-8 w-[35rem] h-[35rem] relative">
        <Link to="/signin"> <BsArrowLeft className="text-white absolute top-3 left-3 text-2x1 hover:text-sky-600"/></Link>
        <img src={logo} alt="wallet-logo" className="w-44" />

        {apiErrors && <ErrorInput text={apiErrors}/>}


        <h1 className="text-white font-bold text-5x1 py-5">Register</h1>

        <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col justify-center gap-4 w-full h-auto text-2x1 ">
                <Input type="text" placeholder="Full Name" register={register} name="name"/>
                {errors.name && <ErrorInput text={errors.name.message}/>}

                <Input type="email" placeholder="Email"register={register} name="email"/>
                {errors.email && <ErrorInput text={errors.email.message}/>}
             
                <Input type="password" placeholder="Password" register={register} name="password"/>
                {errors.password && <ErrorInput text={errors.password.message}/>}
               
                <Input type="password" placeholder="Confirm Password"register={register} name="confirmpassword"/>
                {errors.confirmpassword && <ErrorInput text={errors.confirmpassword.message}/>}

                <Button type="submit" text="SIGNUP"/>
        </form>
        </div>
    )
}