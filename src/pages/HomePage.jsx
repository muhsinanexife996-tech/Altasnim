import MainLayout from "../components/templates/MainLayout";
import Header from "../components/organisms/Header";
import HeroSlider from "../components/organisms/HeroSlider";
import Intro from "../components/organisms/Intro";
import Footprint from "../components/organisms/Footprint";
import Services from "../components/organisms/Services";
import SaudiFocus from "../components/organisms/SaudiFocus";
import GroupStats from "../components/organisms/GroupStats";
import LatestNews from "../components/organisms/LatestNews";
import Footer from "../components/organisms/Footer";

export default function HomePage() {
  return (
    <MainLayout header={<Header />} footer={<Footer />}>
      <HeroSlider />
      <Intro />
      <Footprint />
      <Services />
      <SaudiFocus />
      <GroupStats />
      <LatestNews />
    </MainLayout>
  );
}