import { Patient } from '../type/type';
// Simulation d'une base de données en mémoire
let patients: Patient[] = [];

// Récupérer tous les patients
export async function getAllPatients(): Promise<Patient[]> {
  return Promise.resolve(patients);
}

// Récupérer un patient par son ID
export async function getPatientById(id: number): Promise<Patient | null> {
  const patient = patients.find((p) => p.patientID === id);
  return Promise.resolve(patient || null);
}

// Ajouter un nouveau patient
export async function addPatient(patient: Omit<Patient, 'PatientID'>): Promise<Patient> {
  const newPatient: Patient = { ...patient, patientID: patients.length + 1 };
  patients.push(newPatient);
  return Promise.resolve(newPatient);
}

// Mettre à jour un patient existant
export async function updatePatient(id: number, updatedPatient: Partial<Patient>): Promise<Patient | null> {
  const index = patients.findIndex((p) => p.patientID === id);
  if (index === -1) {
    return Promise.resolve(null);
  }
  patients[index] = { ...patients[index], ...updatedPatient };
  return Promise.resolve(patients[index]);
}

// Supprimer un patient
export async function deletePatient(id: number): Promise<boolean> {
  const index = patients.findIndex((p) => p.patientID === id);
  if (index === -1) {
    return Promise.resolve(false);
  }
  patients.splice(index, 1);
  return Promise.resolve(true);
}