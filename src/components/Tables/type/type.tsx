export interface Patient {
    PatientID: number;
    Nom?: string;
    Prenom?: string;
    DateNaissance: string; // Représenté en ISO string (YYYY-MM-DD)
    Adresse?: string;
    Telephone?: string;
  }
  