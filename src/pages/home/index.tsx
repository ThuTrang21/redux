import { Card } from "antd";
import { useAppDispatch, useAppSelector } from "../../store";
import { IProduct } from "../../interfaces/app";
import { selectProducts } from "../../store/app/selectors";
import { getProducts } from "../../store/app/actions";
import { Link } from "react-router";
import { useEffect } from "react";
import { selectCart } from "../../store/cart/selectors";

export const Home = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts); // Lấy danh sách sản phẩm từ Redux store
const cart=useAppSelector(selectCart);
  useEffect(() => {
   dispatch(getProducts());

  }, [dispatch]);
  console.log("cart",cart);
  return (
    <div>
      <h1 className="body-xl font-bold text-center">Danh sách sản phẩm</h1>
      <div className="flex flex-wrap items-center justify-center gap-10 py-10">
        {products.map((product: IProduct) => (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>
            <Card
              hoverable
              style={{ width: 200 }}
              cover={
              <img
                alt="example"
                src={product.image}
                className="h-44 w-full object-cover"
              />
              }
            >
              <Card.Meta title={product.title} description={`Giá sản phẩm: ${product.price}$`} />
            </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
