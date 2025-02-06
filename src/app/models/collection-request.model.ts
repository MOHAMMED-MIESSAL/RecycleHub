export interface CollectionRequest  {
  id: number;
  userId: number;
  wasteType: string[]; // (plastique, verre, papier, métal)
  photos?: string[];
  estimatedWeight: number;
  address: string;
  date: string;
  timeSlot: string;
  notes?: string;  // Optional
  status: "en attente" | "validée" | "rejetée";
}
