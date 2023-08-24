export interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  username: string;
  fullName: string;
  email: string;
}
