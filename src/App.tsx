import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Problems } from './components/sections/Problems';
import { Services } from './components/sections/Services';
import { Profile } from './components/sections/Profile';
import { Contact } from './components/sections/Contact';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Problems />
        <Services />
        <Profile />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;