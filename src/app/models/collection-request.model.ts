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
