"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

interface Patient {
    patientID?: number;
    nom: string;
    prenom: string;
    dateNaissance: string;
    adresse?: string;
    telephone?: string;
}

const Patients = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [search, setSearch] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);  // Nouvelle variable d'état pour l'édition
    const [newPatient, setNewPatient] = useState<Patient>({
        nom: "",
        prenom: "",
        dateNaissance: "",
        adresse: "",
        telephone: "",
    });
    const [editPatient, setEditPatient] = useState<Patient>({
        nom: "",
        prenom: "",
        dateNaissance: "",
        adresse: "",
        telephone: "",
    });
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    // Charger les patients depuis l'API
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get<Patient[]>("http://localhost:5254/api/Patient");
                setPatients(response.data);
            } catch (error) {
                console.error("Erreur lors du chargement des patients:", error);
            }
        };
        fetchPatients();
    }, []);

    // Ajouter un nouveau patient
    const handleAddPatient = async () => {
        try {
            if (
                !newPatient.nom ||
                !newPatient.prenom ||
                !newPatient.dateNaissance ||
                !newPatient.adresse ||
                !newPatient.telephone
            ) {
                alert("Veuillez remplir tous les champs.");
                return;
            }

            const patientData = {
                nom: newPatient.nom,
                prenom: newPatient.prenom,
                dateNaissance: newPatient.dateNaissance,
                adresse: newPatient.adresse,
                telephone: newPatient.telephone,
            };

            const response = await axios.post("http://localhost:5254/api/Patient", patientData);

            if (response.data.patientID) {
                setPatients((prevPatients) => [...prevPatients, response.data]);

                setShowAddForm(false);
                setNewPatient({
                    nom: "",
                    prenom: "",
                    dateNaissance: "",
                    adresse: "",
                    telephone: "",
                });

                alert("Patient ajouté avec succès !");
            } else {
                alert("Erreur lors de l'ajout du patient : ID invalide.");
            }
        } catch (error) {
            alert("Une erreur s'est produite lors de l'ajout du patient.");
        }
    };

    // Éditer un patient
   // Modifier un patient
   const handleEditPatient = async () => {
    if (!editPatient || !editPatient.patientID) {
        alert("Patient invalide.");
        return;
    }

    try {
        // Préparer les données pour la mise à jour
        const patientData = {
            patientID: editPatient.patientID, // Assurez-vous que cet ID est bien défini
            nom: editPatient.nom,
            prenom: editPatient.prenom,
            dateNaissance: editPatient.dateNaissance,
            adresse: editPatient.adresse,
            telephone: editPatient.telephone,
        };

        // Envoyer la requête PUT pour mettre à jour le patient
        const response = await axios.put(`http://localhost:5254/api/Patient/${editPatient.patientID}`, patientData);

        if (response.status === 200) {
            setPatients((prevPatients) =>
                prevPatients.map((patient) =>
                    patient.patientID === editPatient.patientID ? { ...patient, ...editPatient } : patient
                )
            );
            setShowEditForm(false);
            setEditPatient(null);
            alert("Patient modifié avec succès !");
        }
    } catch (error) {
        alert("Une erreur s'est produite lors de la modification du patient.");
    }
};
    

    // Filtrer les patients par recherche
    const filteredPatients = patients.filter(
        (patient) =>
            patient.nom.toLowerCase().includes(search.toLowerCase()) ||
            patient.prenom.toLowerCase().includes(search.toLowerCase())
    );

    // Pagination
    const totalPages = Math.ceil(filteredPatients.length / rowsPerPage);
    const currentPatients = filteredPatients.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    // Fonction pour supprimer un patient
    const handleDeletePatient = async (patientId: number) => {
        if (!patientId) {
            alert("L'ID du patient est invalide.");
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:5254/api/Patient/${patientId}`);
            if (response.status === 200) {
                setPatients((prevPatients) =>
                    prevPatients.filter((patient) => patient.patientID !== patientId)
                );
                alert("Patient supprimé avec succès !");
            }
        } catch (error) {
            console.error("Erreur lors de la suppression du patient:", error);
            alert("Une erreur s'est produite lors de la suppression du patient.");
        }
    };

    return (
        <DefaultLayout>
            <div className="mx-auto w-full max-w-[1200px]">
                <Breadcrumb pageName="Liste des Patients" />

                <div className="mb-4 flex justify-between items-center">
                    <div>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Rechercher un patient..."
                            className="rounded border border-gray-300 p-2"
                        />
                    </div>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="rounded bg-primary px-4 py-2 text-white hover:bg-primary-dark"
                    >
                        Ajouter un Patient
                    </button>
                </div>

                <table className="w-full border-collapse text-left shadow-lg rounded-lg overflow-hidden">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-sm font-medium">#</th>
                            <th className="px-6 py-3 text-sm font-medium">Nom</th>
                            <th className="px-6 py-3 text-sm font-medium">Prénom</th>
                            <th className="px-6 py-3 text-sm font-medium">Date de naissance</th>
                            <th className="px-6 py-3 text-sm font-medium">Adresse</th>
                            <th className="px-6 py-3 text-sm font-medium">Téléphone</th>
                            <th className="px-6 py-3 text-sm font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {currentPatients.map((patient, index) => (
                            <tr
                                key={index}
                                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition-colors duration-200`}
                            >
                                <td className="px-6 py-4 text-sm font-medium">{patient.patientID}</td>
                                <td className="px-6 py-4 text-sm">{patient.nom}</td>
                                <td className="px-6 py-4 text-sm">{patient.prenom}</td>
                                <td className="px-6 py-4 text-sm">{patient.dateNaissance}</td>
                                <td className="px-6 py-4 text-sm">{patient.adresse}</td>
                                <td className="px-6 py-4 text-sm">{patient.telephone}</td>
                                <td className="px-6 py-4 text-sm">
                                    <button
                                        onClick={() => {
                                            setEditPatient(patient);  // Remplir le formulaire d'édition
                                            setShowEditForm(true);
                                        }}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        onClick={() => handleDeletePatient(patient.patientID!)}
                                        className="text-red-600 hover:text-red-800 ml-4"
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="mt-4 flex items-center justify-between">
                    <div>
                        <label htmlFor="rowsPerPage" className="mr-2">
                            Lignes par page :
                        </label>
                        <select
                            id="rowsPerPage"
                            value={rowsPerPage}
                            onChange={(e) => {
                                setRowsPerPage(parseInt(e.target.value, 10));
                                setCurrentPage(1);
                            }}
                            className="rounded border border-gray-300 p-2"
                        >
                            {[5, 10, 15].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-200 disabled:opacity-50"
                        >
                            Précédent
                        </button>
                        <span>
                            Page {currentPage} sur {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-200 disabled:opacity-50"
                        >
                            Suivant
                        </button>
                    </div>
                </div>

                {/* Formulaire d'édition */}
                {showEditForm && (
                    <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-8 rounded shadow-lg w-[400px]">
                            <h3 className="text-xl mb-4">Modifier le patient</h3>
                            <label>Nom:</label>
                            <input
                                type="text"
                                value={editPatient.nom}
                                onChange={(e) => setEditPatient({ ...editPatient, nom: e.target.value })}
                                className="w-full mb-4 p-2 border rounded"
                            />
                            <label>Prénom:</label>
                            <input
                                type="text"
                                value={editPatient.prenom}
                                onChange={(e) => setEditPatient({ ...editPatient, prenom: e.target.value })}
                                className="w-full mb-4 p-2 border rounded"
                            />
                            <label>Date de naissance:</label>
                            <input
                                type="date"
                                value={editPatient.dateNaissance}
                                onChange={(e) =>
                                    setEditPatient({ ...editPatient, dateNaissance: e.target.value })
                                }
                                className="w-full mb-4 p-2 border rounded"
                            />
                            <label>Adresse:</label>
                            <input
                                type="text"
                                value={editPatient.adresse}
                                onChange={(e) => setEditPatient({ ...editPatient, adresse: e.target.value })}
                                className="w-full mb-4 p-2 border rounded"
                            />
                            <label>Téléphone:</label>
                            <input
                                type="text"
                                value={editPatient.telephone}
                                onChange={(e) =>
                                    setEditPatient({ ...editPatient, telephone: e.target.value })
                                }
                                className="w-full mb-4 p-2 border rounded"
                            />
                            <div className="mt-4 flex justify-between">
                                <button
                                    onClick={handleEditPatient}
                                    className="bg-blue-600 text-white rounded px-4 py-2"
                                >
                                    Enregistrer
                                </button>
                                <button
                                    onClick={() => setShowEditForm(false)}
                                    className="bg-red-600 text-white rounded px-4 py-2"
                                >
                                    Annuler
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Formulaire d'ajout */}
                {showAddForm && (
                    <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-8 rounded shadow-lg w-[400px]">
                            <h3 className="text-xl mb-4">Ajouter un patient</h3>
                            <label>Nom:</label>
                            <input
                                type="text"
                                value={newPatient.nom}
                                onChange={(e) => setNewPatient({ ...newPatient, nom: e.target.value })}
                                className="w-full mb-4 p-2 border rounded"
                            />
                            <label>Prénom:</label>
                            <input
                                type="text"
                                value={newPatient.prenom}
                                onChange={(e) =>
                                    setNewPatient({ ...newPatient, prenom: e.target.value })
                                }
                                className="w-full mb-4 p-2 border rounded"
                            />
                            <label>Date de naissance:</label>
                            <input
                                type="date"
                                value={newPatient.dateNaissance}
                                onChange={(e) =>
                                    setNewPatient({ ...newPatient, dateNaissance: e.target.value })
                                }
                                className="w-full mb-4 p-2 border rounded"
                            />
                            <label>Adresse:</label>
                            <input
                                type="text"
                                value={newPatient.adresse}
                                onChange={(e) =>
                                    setNewPatient({ ...newPatient, adresse: e.target.value })
                                }
                                className="w-full mb-4 p-2 border rounded"
                            />
                            <label>Téléphone:</label>
                            <input
                                type="text"
                                value={newPatient.telephone}
                                onChange={(e) =>
                                    setNewPatient({ ...newPatient, telephone: e.target.value })
                                }
                                className="w-full mb-4 p-2 border rounded"
                            />
                            <div className="mt-4 flex justify-between">
                                <button
                                    onClick={handleAddPatient}
                                    className="bg-blue-600 text-white rounded px-4 py-2"
                                >
                                    Ajouter
                                </button>
                                <button
                                    onClick={() => setShowAddForm(false)}
                                    className="bg-red-600 text-white rounded px-4 py-2"
                                >
                                    Annuler
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
};

export default Patients;
