function Features(){
const cardFeature=[
    {
        heading:"Smart Task Management",
        des:"Organize, assign, and track every task with clarity. Set deadlines, add subtasks, and monitor progress in real-time with a clean, intuitive interface."
    },
    {
        heading:"Role-Based Dashboards",
        des:"Stay focused with personalized dashboards for managers and team members. Each role sees what matters most, from project timelines to daily tasks."
    },
    {
        heading:"Secure Authentication & Cloud Access",
        des:"Planify keeps your data safe with modern authentication (JWT) and secure APIs. Access your projects anytime, anywhere — optimized for all devices, from desktops to mobiles."
    },
    {
        heading:"Cloud-Based & Responsive",
        des:"Access your projects anywhere, anytime. Planify runs securely on the cloud and works perfectly on all devices — desktop, tablet, or mobile."
    }
]

    return(
        <section className="px-12 bg-gray-300/20 py-8">
            <div className="text-center space-y-2 mt-4">
            <h2 className="font-bold text-2xl">Powerful Features to Streamline Your Workflow</h2>
            <p className="text-gray-600 ">Planify brings everything your team needs to collaborate, plan, and deliver projects efficiently, all in one modern platform.</p>

            </div>
            <div className="grid md:grid-cols-2 gap-6 mt-12">
                {cardFeature.map((feature, idx)=>(
                    <div key={idx} className="p-4 space-y-2 rounded-lg shadow-lg bg-white hover:scale-102 transition duration-200">
                        <h3 className="text-lg font-bold text-blue-600">{feature.heading}</h3>
                        <p className="text-gray-600">{feature.des}</p>
                    </div>
                ))}
            </div>

        </section>
    )
}

export default Features;