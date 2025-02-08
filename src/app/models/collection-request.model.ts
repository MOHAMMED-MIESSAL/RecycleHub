export interface WasteDetail {
  type: string;
  weight: number;
}

export interface CollectionRequest {
  id: string;
  userId: number;
  wasteDetails: WasteDetail[];
  photos?: string[];
  address: string;
  date: string;
  timeSlot: string;
  notes?: string;
  status: "en attente" | "validée" | "rejetée" | "en cours" | "occupée";
  collectorId?: string;  // Collector id for reserved requests
}
