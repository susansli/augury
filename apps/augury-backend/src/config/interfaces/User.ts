import Identifiable from './Identifiable';

export default interface User extends Identifiable {
  email: string;
  googleId: string;
  firstName: string;
  lastName: string;
  balance: number;
}
