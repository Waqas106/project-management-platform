import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export default function Login(){
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors, isSubmitSuccessful},
    }= useForm();

    const navigate = useNavigate();

    const onSubmit= async (formData:any)=>{
        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if(!res.ok) return console.log(data.message), alert(data.message);
            localStorage.setItem('token', data.token);
            localStorage.setItem('name', data.user.name);

            alert("Login Succesfully");
            navigate('/userDashboard');
        } catch (error) {
            console.log("Error", error);
        }
    }

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset();
        }
    },[isSubmitSuccessful, reset]);

    return(
        <section className="min-h-screen w-full  flex flex-col justify-center items-center bg-white">
            <h2 className="text-2xl font-extrabold mb-4">Planify</h2>
            <h3 className="text-xl font-semibold pb-2">Welcome back!</h3>
            <p>Don’t have an account? 
                <Link to="/Signup" className="text-blue-500 hover:underline"> Sign Up</Link>
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6 w-[50vw] ">
                <div>
                    <input {...register("email",{required:"Email is required", pattern:{value: /^\S+@\S+$/i, message:"Enter valid email"} })} 
                    placeholder="Enter your Email" 
                    className="p-2 w-full outline-none border-1 border-gray-400 focus:border-blue-600 rounded-lg transition duration:200"/>
                    {errors.email && <p className="text-sm text-red-400">{String(errors.email.message)}</p>}
                </div>
                <div>
                    <input {...register("password", {required:"Password required", minLength:{value: 8, message:"Must be 8 characters long"}})} 
                    placeholder="Password"
                    className="p-2 w-full outline-none border-1 border-gray-400 focus:border-blue-600 rounded-lg transition duration:200"/>
                    {errors.password && <p className="text-sm text-red-400">{String(errors.password.message)}</p>}
                </div>
                <button className="px-4 py-2 bg-blue-600 w-full rounded-lg hover:cursor-pointer text-white font-bold">Login</button>
            </form>
        </section>
    )
}