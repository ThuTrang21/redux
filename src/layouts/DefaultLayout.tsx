import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Input,
  Layout,
  MenuProps,
  message,
  Modal,
  Popover,
} from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import path from "../utils/path";
import { useEffect, useMemo, useState } from "react";
import { map } from "lodash";
import { useAppDispatch, useAppSelector } from "../store";
import { selectCart } from "../store/cart/selectors";
import { useFormik } from "formik";
import * as yup from "yup";
import { login } from "../store/auth/action";
import { selectLoadingLogin } from "../store/auth/selector";
export const DefaultLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);
  const loadingLogin = useAppSelector(selectLoadingLogin);
  const [user, setUser] = useState(false);
  const handleLogout = () => {
    setUser(false);
    message.success("Đăng xuất thành công!");
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <a onClick={handleLogout}>Đăng xuất</a>,
    },
  ];

  useEffect(() => {
    if (loadingLogin) {
      setIsModalOpen(false);
      setUser(true);
      message.success("Đăng nhập thành công!");
    }
  }, [loadingLogin]);
  const menu = useMemo(
    () => [
      {
        label: "Home",
        route: path.HOME,
      },
      {
        label: "Tải hình ảnh",
        route: path.UPLOAD,
      },
    ],
    []
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: yup.object().shape({
        email: yup
          .string()
          .email("Email không hợp lệ")
          .required("Vui lòng nhập email"),
        password: yup.string().required("Vui lòng nhập mật khẩu"),
      }),
      onSubmit: (values) => {
        dispatch(login(values));
      },
    });
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Header
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-row gap-5">
            {map(menu, (item) => (
              <div key={item.route}>
                <Button key={item.route} onClick={() => navigate(item.route)}>
                  {item.label}
                </Button>
              </div>
            ))}
          </div>
          <div className="flex flex-row gap-10">
            <div>
              <Popover
                placement="bottomRight"
                title={
                  <span className="text-base font-thin text-gray-300">
                    Sản Phẩm Mới Thêm
                  </span>
                }
                content={
                  <div className="flex flex-col gap-5 py-2">
                    {cart?.products
                      .slice(-3)
                      .reverse()
                      .map((product) => (
                        <div
                          className="flex justify-between items-center gap-5 hover:bg-gray-100 p-5 cursor-pointer"
                          key={product.product.id}
                        >
                          <img
                            src={product.product.image}
                            alt="product"
                            className="w-[3rem] h-[3rem]"
                          />
                          <p className="w-[20rem]">{product.product.title}</p>
                          <p className="italic text-gray-400">
                            {product.product.price}$
                          </p>
                        </div>
                      ))}

                    <div className="flex justify-between items-center px-2">
                      <p>{cart?.products.length} Thêm hàng vào giỏ</p>
                      <Button
                        type="primary"
                        onClick={() => navigate(path.CART)}
                      >
                        Xem giỏ hàng
                      </Button>
                    </div>
                  </div>
                }
              >
                <Badge count={cart?.products.length}>
                  <ShoppingCartOutlined style={{ fontSize: "24px" }} />
                </Badge>
              </Popover>
            </div>
            <div>
              {user ? (
                <Dropdown menu={{ items }} placement="bottomRight" arrow>
                  <Avatar icon={<UserOutlined />} />
                </Dropdown>
              ) : (
                <Button onClick={showModal}>Đăng nhập</Button>
              )}
              <Modal
                title="Đăng nhập"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
              >
                <form className="mx-auto w-full p-12" onSubmit={handleSubmit}>
                  <Input
                    className="mb-2 !size-full rounded-3xl bg-dark/60 px-8 !text-base !outline-none autofill:!bg-transparent focus-within:!bg-dark/60 hover:bg-dark/60 focus:!outline-none"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-sm mb-5">{errors.email}</p>
                  )}

                  <Input.Password
                    className="mb-2 rounded-3xl bg-dark/60 px-8 text-base focus-within:bg-dark/60 hover:!bg-dark/60 focus:!bg-dark/60"
                    classNames={{
                      input: "!size-full !bg-transparent !border-none",
                    }}
                    placeholder="Mật khẩu"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password && (
                    <p className="text-red-500 text-sm mb-5">
                      {errors.password}
                    </p>
                  )}
                  <Button type="primary" htmlType="submit" className="w-full">
                    Đăng nhập
                  </Button>
                </form>
              </Modal>
            </div>
          </div>
        </div>
      </Layout.Header>
      <Layout.Content style={{ padding: "24px" }}>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};
