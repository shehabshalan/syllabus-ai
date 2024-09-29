export type User = {
  name: string;
  email: string;
  picture: string;
  token?: string;
};

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
}
