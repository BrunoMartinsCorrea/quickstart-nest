export abstract class Auditing {
  protected constructor(
    public id: string,
    public createdAt: string,
    public updatedAt: string,
    public deletedAt: string,
  ) {}
}
