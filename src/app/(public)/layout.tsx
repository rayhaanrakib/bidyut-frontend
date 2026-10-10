import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
        <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;