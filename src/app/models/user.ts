export interface IUser {
  uid?: string; // User ID from Firebase
  displayName: string;
  email: string;
  isAdmin?: boolean;
  lastLogin: string;
  photoURL?: string;
  provider?: string;
}
