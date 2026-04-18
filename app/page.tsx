import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProjectsGrid from "@/components/ProjectsGrid";

export default function Home() {
  return (
    <div className="min-h-screen text-[#F0EDE6] font-sans pb-12">
      <Header />
      <ProjectsGrid />
      <Footer />
    </div>
  );
}
