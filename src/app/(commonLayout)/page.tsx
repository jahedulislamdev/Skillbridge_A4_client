import CategorySection from "@/components/modules/home/Category";
import HeroSection from "@/components/modules/home/Hero";
import StatsSection from "@/components/modules/home/States";
import TestimonialSection from "@/components/modules/home/Testomonial";
import { statsService } from "@/service/stats.service";

const Home = async () => {
    const stats = await statsService.getStates();
    // console.log(stats);

    const states = null;
    return (
        <div>
            <HeroSection />
            <StatsSection stats={stats} />
            <CategorySection />
            <TestimonialSection />
        </div>
    );
};

export default Home;
