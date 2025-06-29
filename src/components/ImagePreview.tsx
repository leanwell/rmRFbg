import { useState } from 'react';

type ImagePreviewProps = {
  src: string;
  alt: string;
};

const ImagePreview = ({ src, alt }: ImagePreviewProps) => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className={`image-preview ${isZoomed ? 'zoomed' : ''}`}>
      <img
        src={src}
        alt={alt}
        onClick={() => setIsZoomed(!isZoomed)}
        style={{ cursor: 'pointer' }}
      />
    </div>
  );
};

export default ImagePreview;