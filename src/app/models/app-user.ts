export interface AppUser {
  displayName: string;
  email: string;
  isAdmin?: boolean;
  lastLogin: string;
  photoURL?: string;
  provider?: string;
}
