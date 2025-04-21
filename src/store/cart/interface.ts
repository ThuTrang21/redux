import { ICart } from "../../interfaces/cart";

export interface ICartState {
    cart: ICart | null; // Danh sách sản phẩm trong giỏ hàng
    isLoading: boolean; // Trạng thái đang tải
    error: string | null; // Thông báo lỗi nếu có
}