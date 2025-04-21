import { IAppState } from './interface';

export const initialState: IAppState = {
  navigate: undefined,

  products: [], // Danh sách sản phẩm
  isLoading: false, // Trạng thái đang tải
  error: null, // Không có lỗi ban đầu
  product: undefined,
};
