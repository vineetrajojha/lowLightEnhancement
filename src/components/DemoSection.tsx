'use client';

import { useState, useRef, ChangeEvent, DragEvent, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent, useEffect } from 'react';

const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]); // get raw base64
    };
    reader.onerror = error => reject(error);
});

export default function DemoSection() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [apiUrl, setApiUrl] = useState<string>('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);

    // Slider state
    const [sliderPos, setSliderPos] = useState(50);
    const [isSliding, setIsSliding] = useState(false);
    const sliderContainerRef = useRef<HTMLDivElement>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = (file: File) => {
        if (!file.type.match('image.*')) {
            setErrorMsg("Please upload a valid JPG or PNG image.");
            return;
        }
        setErrorMsg(null);
        setSelectedFile(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        // Reset result when new image uploaded
        setResultUrl(null);
        setSliderPos(50);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    };

    const enhanceImage = async () => {
        if (!apiUrl.trim()) {
            setErrorMsg("Please enter a valid API Endpoint URL.");
            return;
        }
        if (!selectedFile) {
            setErrorMsg("Please upload an image first.");
            return;
        }

        setErrorMsg(null);
        setIsGenerating(true);
        setResultUrl(null);

        try {
            const base64 = await toBase64(selectedFile);
            
            const response = await fetch(apiUrl.trim(), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: base64 })
            });

            if (!response.ok) {
                throw new Error(`API returned status ${response.status}`);
            }

            const data = await response.json();
            
            if (!data.enhanced_image) {
                throw new Error("Invalid response from API (missing enhanced_image).");
            }

            let imageSrc = data.enhanced_image;
            if (!imageSrc.startsWith('data:image')) {
                imageSrc = 'data:image/jpeg;base64,' + imageSrc;
            }
            
            setResultUrl(imageSrc);

        } catch (err: any) {
            console.error(err);
            setErrorMsg("Enhancement failed: " + err.message);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleDownload = () => {
        if (resultUrl) {
            const a = document.createElement('a');
            a.href = resultUrl;
            a.download = 'enhanced-image.jpg';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    // Slider events
    const moveSlider = (clientX: number) => {
        if (!isSliding || !sliderContainerRef.current) return;
        const rect = sliderContainerRef.current.getBoundingClientRect();
        let x = clientX - rect.left;
        
        if (x < 0) x = 0;
        if (x > rect.width) x = rect.width;
        
        setSliderPos((x / rect.width) * 100);
    };

    useEffect(() => {
        const handleGlobalMouseMove = (e: MouseEvent) => moveSlider(e.clientX);
        const handleGlobalTouchMove = (e: TouchEvent) => moveSlider(e.touches[0].clientX);
        const handleGlobalMouseUp = () => setIsSliding(false);

        if (isSliding) {
            window.addEventListener('mousemove', handleGlobalMouseMove);
            window.addEventListener('touchmove', handleGlobalTouchMove);
            window.addEventListener('mouseup', handleGlobalMouseUp);
            window.addEventListener('touchend', handleGlobalMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleGlobalMouseMove);
            window.removeEventListener('touchmove', handleGlobalTouchMove);
            window.removeEventListener('mouseup', handleGlobalMouseUp);
            window.removeEventListener('touchend', handleGlobalMouseUp);
        };
    }, [isSliding]);

    return (
        <div className="animated-border-wrapper" style={{ width: '100%', maxWidth: '1000px', marginTop: '2rem', zIndex: 10 }}>
            <div className="demo-container" style={{ textAlign: 'left' }}>
                {/* Left: Upload */}
                <div>
                    <h3 style={{ marginBottom: '20px' }}>Upload Low-Light Image</h3>
                    
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/jpeg, image/png" style={{ display: 'none' }} />
                    <div 
                        className={`dnd-zone ${isDragOver ? 'dragover' : ''}`}
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                        onDragLeave={() => setIsDragOver(false)}
                        onDrop={handleDrop}
                        style={{ borderStyle: previewUrl ? 'solid' : 'dashed' }}
                    >
                        {previewUrl ? (
                            <img src={previewUrl} alt="Preview" style={{ display: 'block' }} />
                        ) : (
                            <div className="dnd-content">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                <span style={{ color: 'var(--text-muted)' }}>Drag & drop your image here,<br/>or click to browse</span>
                            </div>
                        )}
                    </div>

                    <div className="input-group">
                        <label htmlFor="apiUrl">API Endpoint (ngrok URL)</label>
                        <input type="url" id="apiUrl" value={apiUrl} onChange={(e) => setApiUrl(e.target.value)} placeholder="https://xxxx-xx-xx.ngrok.io/enhance" />
                    </div>

                    <button className="btn-pill w-full" style={{ fontSize: '16px', padding: '14px' }} disabled={isGenerating || !selectedFile} onClick={enhanceImage}>
                        {isGenerating ? 'Processing...' : 'Enhance Image'}
                    </button>

                    {errorMsg && <div className="error-msg" style={{ display: 'block' }}>{errorMsg}</div>}
                </div>

                {/* Right: Result */}
                <div>
                    <h3 style={{ marginBottom: '20px' }}>Enhanced Result</h3>
                    <div className="result-panel">
                        {!isGenerating && !resultUrl && (
                            <span style={{ color: 'var(--text-muted)' }}>Your enhanced image will appear here</span>
                        )}
                        
                        {isGenerating && <div className="spinner" style={{ display: 'block' }}></div>}
                        
                        {resultUrl && !isGenerating && (
                            <div className="result-img-container" style={{ display: 'block' }} ref={sliderContainerRef}>
                                <div className="slider-wrapper">
                                    <img src={resultUrl} alt="Enhanced Result" />
                                    
                                    <div className="slider-before" style={{ width: `${sliderPos}%` }}>
                                        <img src={previewUrl!} alt="Original" />
                                    </div>
                                    
                                    <div 
                                        className="slider-handle" 
                                        style={{ left: `${sliderPos}%` }}
                                        onMouseDown={() => setIsSliding(true)}
                                        onTouchStart={() => setIsSliding(true)}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {resultUrl && (
                        <button className="btn-pill btn-outline w-full mt-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }} onClick={handleDownload}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            Download Result
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
