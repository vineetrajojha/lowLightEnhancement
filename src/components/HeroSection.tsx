import DemoSection from './DemoSection';

export default function HeroSection() {
  return (
    <section id="home" className="hero">
        <h1>Illuminate the Dark.</h1>
        <p>AI-powered low-light image enhancement using Vision Transformers. Upload a dark image, get a bright, natural result in seconds.</p>
        
        <DemoSection />

    </section>
  );
}
