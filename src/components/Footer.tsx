export default function Footer() {
  return (
    <footer>
        <div className="logo footer-logo">
            <div className="logo-icon"></div>
            LowLight.ai
        </div>
        <p style={{ color: 'var(--text-muted)', marginBottom: '25px', fontSize: '14px' }}>Low Light Image Enhancement — Powered by Transformers</p>
        <div className="footer-links">
            <a href="#">GitHub</a>
            <a href="#demo">Demo</a>
            <a href="#">Contact</a>
        </div>
        <p className="copyright">© 2026 LowLight.ai. Built with ❤️ using PyTorch &amp; Google Colab.</p>
    </footer>
  );
}
