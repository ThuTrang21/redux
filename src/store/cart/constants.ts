import { ICartState } from "./interface";

export const initialState: ICartState = {
  cart: null, 
  isLoading: false, // Trạng thái đang tải
  error: null, // Không có lỗi ban đầu
};
