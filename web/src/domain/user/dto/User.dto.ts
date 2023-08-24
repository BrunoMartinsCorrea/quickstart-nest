export interface UserDto {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  username: string;
  fullName: string;
  email: string;
}
