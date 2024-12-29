"use client"; // Cette directive marque le composant comme client-side, important dans Next.js 13 et au-delà

import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; // Import de uuid pour générer des clés uniques

// Interface Patient pour décrire la structure de vos données
interface Patient {
  PatientID: number; // ID unique pour chaque patient
  nom?: string;
  prenom?: string;
  dateNaissance: string;
  adresse?: string;
  telephone?: string;
}

const PatientList = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get<Patient[]>("https://localhost:7219/api/Patient");
        console.log("Données reçues:", response.data); // Débogage pour vérifier les données
        setPatients(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des patients:", error);
      }
    };

    fetchPatients();
  }, []); // L'effet se déclenche une seule fois au montage du composant

  return (
    <div className="mt-4">
      <h1 className="text-lg font-bold mb-4">Liste des Patients</h1>
      {/* Affichage conditionnel pour vérifier si les patients existent */}
      {patients.length === 0 ? (
        <p>Aucun patient trouvé.</p>
      ) : (
        <ul className="space-y-4">
          {patients.map((patient) => (
            <li
              key={patient.PatientID ? patient.PatientID : uuidv4()} // Utilisation de PatientID ou uuid comme fallback
              className="border p-4 rounded-lg shadow"
            >
              <h2 className="text-md font-semibold">
                {patient.nom} {patient.prenom}
              </h2>
              <p>Date de naissance : {new Date(patient.dateNaissance).toLocaleDateString()}</p>
              <p>Adresse : {patient.adresse}</p>
              <p>Téléphone : {patient.telephone}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientList;
