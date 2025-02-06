/*
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
*/

export interface WasteDetail {
  type: string;
  weight: number;
}

export interface CollectionRequest {
  id: string;
  userId: number;
  wasteDetails: WasteDetail[]; // Remplace wasteType et wasteWeights
  photos?: string[];
  address: string;
  date: string;
  timeSlot: string;
  notes?: string;
  status: "en attente" | "validée" | "rejetée";
}
