import Hero from '../components/sections/Hero';
import CurrentStatus from '../components/sections/CurrentStatus';
import TechStack from '../components/sections/TechStack';
import Experience from '../components/sections/Experience';
import GitHubInsights from '../components/sections/GitHubInsights';
import Projects from '../components/sections/Projects';
import Gallery from '../components/sections/Gallery';

const Home = () => {
  return (
    <main>
      <Hero />
      <CurrentStatus />
      <TechStack />
      <Experience />
      <GitHubInsights />
      <Projects />
      <Gallery />
    </main>
  );
};

export default Home;
