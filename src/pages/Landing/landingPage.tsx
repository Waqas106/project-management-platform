import About from "../../components/landing/about";
import CTA from "../../components/landing/cta-section";
import Features from "../../components/landing/features";
import Footer from "../../components/landing/footer";
import Header from "../../components/landing/header";
import HeroSection from "../../components/landing/heroSection";

export default function LandingPage(){
    return(
        <>
        <Header/>
        <HeroSection/>
        <About/>
        <Features/>
        <CTA/>
        <Footer/>
        </>
    )
}