export interface IListResponse<T> {
    data: T[]; // Danh sách các item (sản phẩm)
    total: number; // Tổng số lượng item
    page: number; // Số trang hiện tại
    limit: number; // Số lượng item mỗi trang
  }
  export interface IDefaultData {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
  }

  export type CreateData<T> = Omit<T, keyof IDefaultData>;

  
export type AnyType = any;