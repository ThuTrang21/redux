import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store";
import { useEffect, useState } from "react";
import { clearProduct, getProduct } from "../../store/app/actions";
import { selectProduct } from "../../store/app/selectors";
import { Button, Skeleton } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addCart } from "../../store/cart/actions";
import { selectCart } from "../../store/cart/selectors";
import { IProduct } from "../../interfaces/app";
import { ButtonAD } from "../../components/ButtonAD";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectProduct);
  const cart = useAppSelector(selectCart); // Lấy giỏ hàng từ Redux

  useEffect(() => {
    dispatch(getProduct({ id }));
    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch, id]);
  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleAddToCart = (product: IProduct, quantity: number) => {
    dispatch(addCart({ product, quantity }));
    console.log("cart", cart);
  };
  return (
    <div className="flex flex-col gap-10">
      {!product ? (
        <Skeleton active />
      ) : (
        <>
          <h1 className="text-3xl text-center font-bold">{product?.title}</h1>
          <div className="flex justify-evenly items-center w-full">
            <img src={product?.image} alt="product" className="w-1/4" />

            <div className="w-1/2 flex flex-col gap-12">
              <div className="flex gap-5 ">
                <p className="font-semibold w-1/6 ">Mô tả</p>
                <p className="w-5/6">{product?.description}</p>
              </div>
              <div className="flex gap-5 ">
                <p className="font-semibold w-1/6 ">Giá</p>
                <p className="w-5/6">{product?.price}</p>
              </div>
              <div className="flex justify-start gap-5">
                <h5 className="font-semibold w-1/6">Số lượng</h5>
                <div className="flex items-center space-x-2 w-5/6">
                  <ButtonAD
                    quantity={quantity}
                    onQuantityChange={handleQuantityChange}
                  />
                </div>
              </div>
              <div>
                <Button
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  onClick={() => handleAddToCart(product, quantity)}
                >
                  Thêm vào giỏ hàng
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
