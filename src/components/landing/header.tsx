import { useNavigate } from "react-router-dom"

export default function Header(){
    const navlinks=[
    {
        name:'Home',
        href:'/'
    },
    {
        name:'Features',
        href:'#features'
    },
    {
        name:'About',
        href:'#about'
    },
    {
        name:'Contact',
        href:'#contact'
    }
]

const navigate = useNavigate();

return(
    <header className="flex sticky top-0 z-10 justify-around py-2 shadow-md bg-transparent bg-white/80 items-center">
        <div>
            <h2 className="text-lg font-bold uppercase">Planify</h2>
        </div>
        <nav className="flex flex-row">
            {navlinks.map((links, idx)=>(
                <a 
                key={idx} 
                href={links.href} 
                className="text-gray-700 no-underline hover:text-blue-700 font-medium px-2"
                >
                {links.name}</a>
            ))}
        </nav>
        <div >
            <button onClick={()=> navigate("/signup")} className="bg-blue-600 text-center hover:cursor-pointer text-white px-4 py-1 rounded-md border-0 text-lg font-semibold">SignUp</button>
        </div>
    </header>
)

}