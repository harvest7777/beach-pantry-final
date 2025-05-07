import Image from "next/image";
import { Product } from "../_data/products";
import { BsInfoCircle } from "react-icons/bs";
import ProductInfoModal from "./ProductInfoModal";
import { useState } from "react";

interface ProductDisplayProps {
  product: Product;
}
const ProductDisplay: React.FC<ProductDisplayProps> = ({ product }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const getQuantityColor = (quantity: number) => {
    if (quantity <= 0) return "text-red-500";
    if (quantity <= 10) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className="w-full flex flex-col items-center overflow-hidden rounded-xl outline-1 outline-muted p-2 shadow-sm">
      <ProductInfoModal
        product={product}
        visible={visible}
        setVisible={setVisible}
      />
      <div className="h-40 aspect-square flex justify-center overflow-hidden">
        <Image
          src={`/${product.name.replace(/\s+/g, "")}.png`}
          alt={product.name}
          width={500}
          height={500}
          objectFit="contain"
        />
      </div>
      <h1 className="font-bold">{product.name}</h1>
      <h2 className={`${getQuantityColor(product.quantity)}`}>
        Quantity: {product.quantity}
      </h2>
      <span
        onClick={() => setVisible(true)}
        className="hover:cursor-pointer flex gap-x-2 items-center "
      >
        <BsInfoCircle />
        More info
      </span>
    </div>
  );
};

export default ProductDisplay;
