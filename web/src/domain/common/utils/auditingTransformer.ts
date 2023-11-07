import { produce } from 'immer';
import { Auditing } from '../type/Auditing';

export class AuditingTransformer {
  static toAuditing<T>(data: T & Auditing): T & Auditing {
    return produce(data, (draft) => {
      draft.createdAt = new Date(draft.createdAt);
      draft.updatedAt = new Date(draft.updatedAt);
      draft.deletedAt = data.deletedAt && new Date(data.deletedAt);
    });
  }
}
