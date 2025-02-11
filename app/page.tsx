import Photo from "@/components/Photo";
import Social from "@/components/Social";
import Stats from "@/components/Stats";
import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";

const Home = () => {
  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span className="text-xl">Senior Software Engineer</span>
            <h1 className="h1 mb-6">
              Hello I&apos;m <br />{" "}
              <span className="text-accent">Kagiso Nyokolodi</span>
            </h1>
            <p className="max-w-[500px] mb-9 text-white/80">
              I’m a Senior Software Engineer specializing in designing and
              building scalable systems. I lead teams, mentor peers, and focus
              on delivering efficient, high-quality software solutions.
            </p>
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <Button variant="outlined">
                Download CV <FiDownload className="ml-2" />
              </Button>
              <div className="mb-8 xl:mb-0">
                <Social
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border border-accent p-2 rounded-full flex items-center justify-center text-accent text-base hover:bg-accent hover:text-primary transition-all duration-500"
                />
              </div>
            </div>
          </div>
          <div className="order-1 xl:order-none mb-8 xl:mb-0">
            <Photo />
          </div>
        </div>
        <Stats />
      </div>
    </section>
  );
};

export default Home;
