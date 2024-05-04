import { useRouteError } from "react-router-dom";

export default function ErrorPage(){
    const error = useRouteError();
    console.log(error)

    return (
        <div className="text-lg flex flex-col justify-center items-center gap-4">
            <h1 className="text-9xl">{error.status}</h1>
            <span className="text-5xl">{error.statusText}</span>
            <span className="text-5xl">{error.data}</span>
        </div>
)
}