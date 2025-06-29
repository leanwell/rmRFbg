import { useState, useRef, ChangeEvent } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { removeBackground } from '@imgly/background-removal';
import { FaUpload, FaDownload, FaMagic } from 'react-icons/fa';
import SizeSelector from './SizeSelector';
import ImagePreview from './ImagePreview';

type ModelSize = 'isnet' | 'isnet_fp16' | 'isnet_quint8';

const FileUpload = () => {
  const { isDarkMode } = useTheme();
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedSize, setSelectedSize] = useState<ModelSize>('isnet');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProcessedImage(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      setOriginalImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const processImage = async () => {
    if (!originalImage) return;
    setIsProcessing(true);
    try {
      const response = await fetch(originalImage);
      const blob = await response.blob();
      const processedBlob = await removeBackground(blob, {
        model: selectedSize,
        output: { 
          format: 'image/png',
          quality: 0.8
        },
        progress: (key, current, total) => {
          console.log(`Downloading ${key}: ${current} of ${total}`);
        }
      });
      setProcessedImage(URL.createObjectURL(processedBlob));
    } catch (error) {
      console.error('Error removing background:', error);
      alert('Failed to remove background. Please try another image.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!processedImage) return;

    const link = document.createElement('a');
    link.href = processedImage;
    link.download = `rmRFbg-removed-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`upload-container ${isDarkMode ? 'dark' : 'light'}`}>
      <div 
        className="upload-area" 
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
      >
        {originalImage ? (
          <ImagePreview src={originalImage} alt="Original" />
        ) : (
          <div className="upload-prompt">
            <FaUpload size={48} />
            <p>Click to upload an image</p>
            <p className="file-types">Supports JPG, PNG, WEBP</p>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/jpeg, image/png, image/webp"
          style={{ display: 'none' }}
        />
      </div>

      {originalImage && (
        <div className="controls">
          <SizeSelector 
            selectedSize={selectedSize} 
            setSelectedSize={setSelectedSize} 
          />
          
          <button
            onClick={processImage}
            disabled={isProcessing}
            className="process-btn"
            aria-busy={isProcessing}
          >
            <FaMagic /> 
            {isProcessing ? (
              <span className="processing-text">Processing...</span>
            ) : (
              <span>Remove Background</span>
            )}
          </button>
        </div>
      )}

      {processedImage && (
        <>
          <div className="result-container">
            <h3>Result:</h3>
            <ImagePreview src={processedImage} alt="Background removed" />
            <div className="download-section">
              <button 
                onClick={downloadImage} 
                className="download-btn"
                aria-label="Download processed image"
              >
                <FaDownload /> Download Image
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUpload;