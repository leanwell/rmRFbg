import { ModelSize } from '../types';

type SizeSelectorProps = {
  selectedSize: ModelSize;
  setSelectedSize: (size: ModelSize) => void;
};

const SizeSelector = ({ selectedSize, setSelectedSize }: SizeSelectorProps) => {
  const sizes: { value: ModelSize; label: string }[] = [
    { value: 'isnet', label: 'Standard Quality' },
    { value: 'isnet_fp16', label: 'High Quality' },
    { value: 'isnet_quint8', label: 'Fast Processing' },
  ];

  return (
    <div className="size-selector">
      <label>Model Size:</label>
      <div className="size-options">
        {sizes.map((size) => (
          <button
            key={size.value}
            className={selectedSize === size.value ? 'active' : ''}
            onClick={() => setSelectedSize(size.value)}
          >
            {size.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;