import CategorySection from "@/components/modules/home/Category";
import HeroSection from "@/components/modules/home/Hero";
import StatsSection from "@/components/modules/home/States";
import TestimonialSection from "@/components/modules/home/Testomonial";

const Home = () => {
    return (
        <div>
            <HeroSection />
            <StatsSection />
            <CategorySection />
            <TestimonialSection />
        </div>
    );
};

export default Home;
