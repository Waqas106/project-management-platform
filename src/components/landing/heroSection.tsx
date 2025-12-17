import Gif from "../../assets/Animated_Dashboards_20251101122020.gif"
function HeroSection(){
return(
    <section className="grid md:grid-cols-2 px-16 min-h-screen gap-8 items-center">
        <div className="space-y-4 ">
            <h1 className="text-5xl font-extrabold">
                Simplify Your Workflow. 
                <span className="text-blue-700"> Manage Projects Smarter.</span>
            </h1>
            <p className="text-gray-800 font-semibold text-lg ">
                Planify helps teams stay organized, track progress, and meet deadlines, from idea to delivery. Streamline your projects, assign tasks, and get real-time insights in one modern dashboard.
            </p>
            <div>
                <button className="px-4 py-2 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 hover:scale-102 transition duration-200">
                    Get Started
                </button>
            </div>
        </div>
        <div>
            <img src={Gif}/>
        </div>
    </section>
)
}

export default HeroSection;