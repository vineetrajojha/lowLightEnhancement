export default function HowItWorks() {
  return (
    <section id="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="grid-3">
            <div className="glass-card">
                <div className="icon-circle">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                </div>
                <h3>1. Upload</h3>
                <p style={{ color: 'var(--text-muted)', marginTop: '10px', fontSize: '14px' }}>Upload your low-light or dark image in JPG/PNG format.</p>
            </div>
            <div className="glass-card">
                <div className="icon-circle">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                </div>
                <h3>2. Transform</h3>
                <p style={{ color: 'var(--text-muted)', marginTop: '10px', fontSize: '14px' }}>Our Vision Transformer model analyzes and restores brightness, contrast, and detail.</p>
            </div>
            <div className="glass-card">
                <div className="icon-circle">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                </div>
                <h3>3. Download</h3>
                <p style={{ color: 'var(--text-muted)', marginTop: '10px', fontSize: '14px' }}>Get your enhanced image instantly — crisp, vivid, and natural.</p>
            </div>
        </div>
    </section>
  );
}
