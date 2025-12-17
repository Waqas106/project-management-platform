function About(){
const about=[
    {
        head:"Our Mission",
        des:"To make project management effortless by combining simplicity, collaboration, and intelligent automation — so teams can focus on what truly matters: delivering great results."
    },
    {
        head:"Our Vision",
        des:"To become the go-to workspace where teams plan, execute, and grow — with complete transparency and control."
    }
]

    return(
        <section className="px-12 py-8">
            <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold">About Planify</h3>
                <p className="text-gray-600">Empowering Teams to Plan, Collaborate, and Deliver — Seamlessly.</p>
            </div>
            <div className="mt-8 grid md:grid-cols-2 gap-6">
                <div className="text-lg space-y-2">
                    <p>Planify is a modern project management platform designed to simplify teamwork and boost productivity.</p>
                    <p>Built with a focus on clarity, speed, and collaboration, it helps teams organize their tasks, track progress, and meet deadlines without the usual chaos of project juggling.</p>
                    <p>From startups to small businesses, Planify enables every team to stay aligned — no matter where they work from.</p>
                </div>
                <div className="grid lg:grid-cols-1 gap-4">
                    {about.map((ab, idx)=>(
                        <div key={idx} className="p-4 rounded-xl bg-blue-600/10">
                            <h3 className="text-lg font-bold text-blue-600">{ab.head}</h3>
                            <p className="text-gray-600">{ab.des}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default About;