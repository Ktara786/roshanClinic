import Hero from "@/components/home/Hero";
import DoctorIntro from "@/components/home/DoctorIntro";
import ConcernCards from "@/components/home/ConcernCards";
import HowItWorks from "@/components/home/HowItWorks";
import FirstConsultation from "@/components/home/FirstConsultation";
import ConsultationOptions from "@/components/home/ConsultationOptions";
import PreparationSection from "@/components/home/PreparationSection";
import ApproachSection from "@/components/home/ApproachSection";
import ClinicSection from "@/components/home/ClinicSection";
import FAQ from "@/components/home/FAQ";
import FinalCTA from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <DoctorIntro />
      <ConcernCards />
      <HowItWorks />
      <FirstConsultation />
      <ConsultationOptions />
      <PreparationSection />
      <ApproachSection />
      <ClinicSection />
      <FAQ />
      <FinalCTA />
    </>
  );
}
