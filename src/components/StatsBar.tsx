export default function StatsBar() {
  return (
    <div className="stats-bar">
        <div className="stats-container">
            <div className="stat-item">
                <div className="stat-number">93.2%</div>
                <div className="stat-label">PSNR Improvement</div>
            </div>
            <div className="stat-item">
                <div className="stat-number">Vision Transformer</div>
                <div className="stat-label">Architecture</div>
            </div>
            <div className="stat-item">
                <div className="stat-number">&lt; 2s</div>
                <div className="stat-label">Inference Time</div>
            </div>
        </div>
    </div>
  );
}
