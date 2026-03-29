import Image from 'next/image';

export default function HowItWorks() {
  return (
    <section id="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="hiw-container">
            <div className="hiw-card">
                <div className="hiw-icon-wrapper">
                    <Image src="/upload.png" alt="Upload Icon" width={140} height={140} className="hiw-img" />
                </div>
                <h3>1. Upload image</h3>
                <p>Upload your low-light or dark image in JPG/PNG format.</p>
            </div>
            <div className="hiw-card">
                <div className="hiw-icon-wrapper">
                    <Image src="/transform.png" alt="Transform Icon" width={140} height={140} className="hiw-img" />
                </div>
                <h3>2. Transform quality</h3>
                <p>Our Vision Transformer model analyzes and restores brightness, contrast, and detail.</p>
            </div>
            <div className="hiw-card">
                <div className="hiw-icon-wrapper">
                    <Image src="/download.png" alt="Download Icon" width={140} height={140} className="hiw-img" />
                </div>
                <h3>3. Instant download</h3>
                <p>Get your enhanced image instantly &mdash; crisp, vivid, and natural.</p>
            </div>
        </div>
    </section>
  );
}
