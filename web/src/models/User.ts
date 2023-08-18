export class User {
  constructor(
    private id: string,
    private username: string,
    private fullName: string,
    private email: string,
    private createdAt: Date,
    private updatedAt: Date,
    private deletedAt: Date
  ) {}
}
