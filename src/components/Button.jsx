/* eslint-disable react/prop-types */
import { BiPlusCircle, BiMinusCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function Button({submit, text, icon, transaction }){

    let IconComponent
    const navgate = useNavigate();

    if(icon === "plus") IconComponent = BiPlusCircle
    if(icon === "minus") IconComponent = BiMinusCircle

    return (
        <button 
        type={submit}
        className="px-4 py-2 rounded w-full font-bold text-white text-2x1 bg-gradient-to-r from-sky-500 to-indigo-500 flex justify-center gap-2 items-center"
        onClick={()=> transaction && navgate(`/transaction/${transaction}`) }
        >
        {IconComponent && <IconComponent />} {text}
        </button>
    )
}