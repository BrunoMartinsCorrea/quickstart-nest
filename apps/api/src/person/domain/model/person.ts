import { Identity } from '@/common/model/identity';

export type Person = Identity & {
  nationalRegistration: string;
  firstName: string;
  lastName: string;
  birthdate: string;
};
