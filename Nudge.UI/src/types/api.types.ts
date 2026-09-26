export interface ApiResponse<T> {
  status: string;
  msg: string;
  data: T;
}