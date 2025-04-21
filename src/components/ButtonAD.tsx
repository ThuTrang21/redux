import { Button } from "antd";
import { useEffect, useState } from "react";

interface ButtonADProps {
  quantity: number;
  onQuantityChange: (qty: number) => void;
}

export const ButtonAD = ({ quantity, onQuantityChange }: ButtonADProps) => {
  const [tempQuantity, setTempQuantity] = useState(quantity.toString());

  useEffect(() => {
    setTempQuantity(quantity.toString());
  }, [quantity]);

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setTempQuantity(newQuantity.toString());
    onQuantityChange(newQuantity);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setTempQuantity(newQuantity.toString());
      onQuantityChange(newQuantity);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value !== "0") {
      setTempQuantity(value);
    }
  };

  const handleInputBlur = () => {
    const parsedValue = parseInt(tempQuantity, 10);
    if (!isNaN(parsedValue) && parsedValue >= 1) {
      onQuantityChange(parsedValue);
    } else {
      setTempQuantity(quantity.toString());
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Button onClick={handleDecrease} disabled={quantity <= 1}>-</Button>
      <input
        type="text"
        className="w-16 h-10 text-center rounded"
        value={tempQuantity}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
      />
      <Button onClick={handleIncrease}>+</Button>
    </div>
  );
};
