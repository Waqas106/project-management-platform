function Footer(){
    return(
        <footer className="bg-black px-12 py-8">
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-lg text-white mb-2 font-bold">Planify</h3>
                    <p className="text-gray-400">Streamline your workflow and manage projects effortlessly.Planify helps teams stay organized, connected, and focused</p>
                </div>
                <div>
                    <h3 className="text-lg text-white mb-2 font-bold">Quick Links</h3>
                    <ul className="space-y-1 text-gray-400">
                        <li>Home</li>
                        <li>About</li>
                        <li>Features</li>
                    </ul>
                </div>
                
            </div>
            <hr/>
            <div className="py-1 text-gray-400">
                <p>&copy; 2025 Planify. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;