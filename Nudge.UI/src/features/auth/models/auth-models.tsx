export interface LoginRequest {
  userName: string;
  password?: string;
}

export interface MenuItem {
  menuId: number;
  menuName: string;
  parentId: number;
  icon: string | null;
  path: string;
  menuOrder: number;
  childId: number | null;
}

export interface UserAuthData {
  token: string;
  userName: string;
  name: string;
  roleName: string;
  roleId: number;
  permissions: string[];
  menuList: MenuItem[];
}

// Envelope match for your custom API wrapper structure
export interface ApiResponse<T> {
  status: string;
  msg: string;
  data: T;
}