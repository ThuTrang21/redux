import { Button, Divider } from "antd";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectCart } from "../../store/cart/selectors";
import { ButtonAD } from "../../components/ButtonAD";
import { removeCart, updateQuantity, updateTotalPrice } from "../../store/cart/actions";
import { useEffect } from "react";

export const Cart = () => {
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();
  useEffect(() => {

    dispatch(updateTotalPrice());
  }, [cart]);

  return (
    <div>
      <div className="flex justify-between items-center gap-5 p-5">
        <p className="w-[10rem]">Sản phẩm </p>

        <p>Đơn giá</p>
        <p>Số lượng</p>
        <p>Số tiền</p>
        <p>Thao tác</p>
      </div>
      <Divider />
      {cart?.products.map((product) => (
        <div
          className="flex justify-between items-center gap-5 p-5"
          key={product.product.id}
        >
          <span className="flex items-center gap-2 w-[10rem]">
            <img
              src={product.product.image}
              alt="product"
              className="w-[3rem] h-[3rem] object-cover"
            />
            <p className="truncate max-w-[10rem]">{product.product.title}</p>
          </span>

          <p>{product.product.price} $</p>
          <div>
            <ButtonAD
              quantity={product.quantity}
              onQuantityChange={(qty) =>
                dispatch(
                  updateQuantity({
                    productId: product.product.id,
                    quantity: qty,
                  })
                )
              }
            />
          </div>
          <p>{product.product.price * product.quantity} $</p>
          <Button onClick={() => dispatch(removeCart(product.product.id))}>
            Xóa
          </Button>
        </div>
      ))}

      <Divider />
      <div className="flex text-xl justify-end items-center gap-5 p-5">
        <p className="font-semibold">Tổng tiền:</p>
        <p className="font-semibold">{cart?.totalPrice} $</p>
      </div>
    </div>
  );
};
