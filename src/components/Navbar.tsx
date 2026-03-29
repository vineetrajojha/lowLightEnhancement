export default function Navbar() {
  return (
    <nav>
        <div className="logo">
            <div className="logo-icon"></div>
            LowLight.ai
        </div>
        <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#demo">Demo</a>
            <a href="#about">About</a>
            <a href="#">GitHub</a>
        </div>
        <a href="#demo" className="btn-pill">Try Now</a>
    </nav>
  );
}
