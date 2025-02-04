export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  dateOfBirth: string;
  profilePicture?: string; // Optionnel
  role: 'particulier' | 'collecteur';
}
