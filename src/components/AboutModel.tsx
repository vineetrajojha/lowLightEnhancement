export default function AboutModel() {
  return (
    <section id="about">
        <h2 className="section-title">About the Model</h2>
        <div className="about-grid">
            <div className="about-text">
                <p>Traditional low-light image enhancement methods rely on simple histogram equalization or basic CNN structures, often leading to color distortion and amplified noise.</p>
                <p>We leverage the power of <strong>Vision Transformers (ViT)</strong>. The model acts as an encoder-decoder framework utilizing self-attention mechanisms to understand global context and local feature interactions simultaneously.</p>
                <p>Trained meticulously on the LOL (Low-Light) dataset, our approach ensures color consistency, sharpness, and vivid detail restoration. To maximize accessibility, this entire inference pipeline is hosted on Google Colab leveraging T4 GPU acceleration.</p>
            </div>
            <div className="glass-card">
                <table className="model-card-table">
                    <tbody>
                        <tr><td>Architecture</td><td>Vision Transformer (ViT)</td></tr>
                        <tr><td>Dataset</td><td>LOL Dataset</td></tr>
                        <tr><td>Training Platform</td><td>Google Colab (T4 GPU)</td></tr>
                        <tr><td>Framework</td><td>PyTorch</td></tr>
                        <tr><td>Input Size</td><td>256×256</td></tr>
                        <tr><td>Output</td><td>RGB Enhanced Image</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
  );
}
