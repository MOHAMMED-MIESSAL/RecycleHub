export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  dateOfBirth: string;
  profilePicture?: string; // Optional
  role: 'particulier' | 'collecteur';
}
