import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

function SignUp(){
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors, isSubmitSuccessful},

    }=useForm();

    const navigate = useNavigate();

    const onSubmit= async (formData: any) =>{
        try {
            const res = await fetch('http://localhost:5000/api/auth/signup', {
                method: "POST",
                headers: {"Content-type" : "application/json"},
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if(!res.ok) return console.log(data.message);
            localStorage.setItem('name', data.name);

            alert("Signup Successfully!");
            navigate("/login");

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
            <h3 className="text-xl font-semibold pb-2">Seconds to sign up!</h3>
            <p>Already have an account? 
                <Link to="/login" className="text-blue-500 hover:underline"> Sign in</Link>
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6 w-[50vw] ">
                <div>
                    <input {...register("name", {required:"Name is required" })} 
                    placeholder="Enter Your Name"
                    className="p-2  w-full outline-none border-1 border-gray-400 focus:border-blue-600 rounded-lg transition duration:200"/>
                    {errors.name && <p className="text-sm text-red-400">{String(errors.name.message)}</p>}
                </div>
                <div>
                    <input {...register("email", {required:"Email is required", pattern:{value: /^\S+@\S+$/i, message:"Enter valid email" } })} 
                    placeholder="Enter Your Email"
                    className="p-2 w-full outline-none border-1 border-gray-400 focus:border-blue-600 rounded-lg transition duration:200"/>
                    {errors.email && <p className="text-sm text-red-400">{String(errors.email.message)} </p>}
                </div>
                <div>
                    <input type="password" {...register("password", {required:"password required", minLength:{value: 8, message:"Must be 8 character long"} })} 
                    placeholder="Password" 
                    className="p-2 w-full outline-none border-1 border-gray-400 focus:border-blue-600 rounded-lg transition duration:200"/>
                    {errors.password && <p className="text-sm text-red-400">{String(errors.password.message)}</p>}
                </div>
                <button className="px-4 py-2 bg-blue-600 self-center text-white font-bold outline-none hover:cursor-pointer w-full rounded-lg">Sign Up</button>

            </form>

        </section>
    )
}

export default SignUp;