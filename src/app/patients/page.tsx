"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

const Patients = () => {
    const [patients, setPatients] = useState([
        {
            id: 1,
            nom: "El Fassi",
            prenom: "Ahmed",
            sexe: "Homme",
            date_de_naissance: "1990-01-15",
            tel: "0600123456",
            adresse: "Rue 123, Casablanca",
            profession: "Ingénieur",
            assurance: "AXA",
        },
        {
            id: 2,
            nom: "Berrada",
            prenom: "Fatima",
            sexe: "Femme",
            date_de_naissance: "1985-07-20",
            tel: "0700654321",
            adresse: "Avenue Hassan II, Rabat",
            profession: "Médecin",
            assurance: "CNSS",
        },
    ]);

    const [search, setSearch] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const [newPatient, setNewPatient] = useState({
        nom: "",
        prenom: "",
        sexe: "",
        date_de_naissance: "",
        tel: "",
        adresse: "",
        profession: "",
        assurance: "",
    });
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const handleAddPatient = () => {
        setPatients([...patients, { ...newPatient, id: patients.length + 1 }]);
        setShowAddForm(false);
        setNewPatient({
            nom: "",
            prenom: "",
            sexe: "",
            date_de_naissance: "",
            tel: "",
            adresse: "",
            profession: "",
            assurance: "",
        });
    };

    const filteredPatients = patients.filter(
        (patient) =>
            patient.nom.toLowerCase().includes(search.toLowerCase()) ||
            patient.prenom.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredPatients.length / rowsPerPage);
    const currentPatients = filteredPatients.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

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
                            <th className="px-6 py-3 text-sm font-medium">Sexe</th>
                            <th className="px-6 py-3 text-sm font-medium">Date de naissance</th>
                            <th className="px-6 py-3 text-sm font-medium">Téléphone</th>
                            <th className="px-6 py-3 text-sm font-medium">Adresse</th>
                            <th className="px-6 py-3 text-sm font-medium">Profession</th>
                            <th className="px-6 py-3 text-sm font-medium">Assurance</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {currentPatients.map((patient) => (
                            <tr
                                key={patient.id}
                                className={`${
                                    patient.id % 2 === 0 ? "bg-gray-50" : "bg-white"
                                } hover:bg-gray-100 transition-colors duration-200`}
                            >
                                <td className="px-6 py-4 text-sm font-medium">{patient.id}</td>
                                <td className="px-6 py-4 text-sm">{patient.nom}</td>
                                <td className="px-6 py-4 text-sm">{patient.prenom}</td>
                                <td className="px-6 py-4 text-sm">{patient.sexe}</td>
                                <td className="px-6 py-4 text-sm">{patient.date_de_naissance}</td>
                                <td className="px-6 py-4 text-sm">{patient.tel}</td>
                                <td className="px-6 py-4 text-sm">{patient.adresse}</td>
                                <td className="px-6 py-4 text-sm">{patient.profession}</td>
                                <td className="px-6 py-4 text-sm">{patient.assurance}</td>
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

                {showAddForm && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                        <div className="w-[500px] max-h-[80vh] overflow-y-auto rounded bg-white p-4">
                            <h3 className="mb-3 text-lg font-bold">Ajouter un Patient</h3>
                            <form>
                                <div className="mb-2">
                                    <label className="block font-medium">Nom</label>
                                    <input
                                        type="text"
                                        value={newPatient.nom}
                                        onChange={(e) => setNewPatient({ ...newPatient, nom: e.target.value })}
                                        className="mt-1 w-full rounded border border-gray-300 p-2"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block font-medium">Prénom</label>
                                    <input
                                        type="text"
                                        value={newPatient.prenom}
                                        onChange={(e) =>
                                            setNewPatient({ ...newPatient, prenom: e.target.value })
                                        }
                                        className="mt-1 w-full rounded border border-gray-300 p-2"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block font-medium">Sexe</label>
                                    <select
                                        value={newPatient.sexe}
                                        onChange={(e) => setNewPatient({ ...newPatient, sexe: e.target.value })}
                                        className="mt-1 w-full rounded border border-gray-300 p-2"
                                    >
                                        <option value="">Sélectionner le sexe</option>
                                        <option value="Homme">Homme</option>
                                        <option value="Femme">Femme</option>
                                    </select>
                                </div>

                                <div className="mb-2">
                                    <label className="block font-medium">Date de naissance</label>
                                    <input
                                        type="date"
                                        value={newPatient.date_de_naissance}
                                        onChange={(e) =>
                                            setNewPatient({ ...newPatient, date_de_naissance: e.target.value })
                                        }
                                        className="mt-1 w-full rounded border border-gray-300 p-2"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block font-medium">Téléphone</label>
                                    <input
                                        type="tel"
                                        value={newPatient.tel}
                                        onChange={(e) => setNewPatient({ ...newPatient, tel: e.target.value })}
                                        className="mt-1 w-full rounded border border-gray-300 p-2"
                                        pattern="[0-9]{10}"
                                        placeholder="0600123456"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block font-medium">Adresse</label>
                                    <input
                                        type="text"
                                        value={newPatient.adresse}
                                        onChange={(e) =>
                                            setNewPatient({ ...newPatient, adresse: e.target.value })
                                        }
                                        className="mt-1 w-full rounded border border-gray-300 p-2"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block font-medium">Profession</label>
                                    <input
                                        type="text"
                                        value={newPatient.profession}
                                        onChange={(e) =>
                                            setNewPatient({ ...newPatient, profession: e.target.value })
                                        }
                                        className="mt-1 w-full rounded border border-gray-300 p-2"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block font-medium">Assurance</label>
                                    <input
                                        type="text"
                                        value={newPatient.assurance}
                                        onChange={(e) =>
                                            setNewPatient({ ...newPatient, assurance: e.target.value })
                                        }
                                        className="mt-1 w-full rounded border border-gray-300 p-2"
                                    />
                                </div>

                                <div className="mt-4 flex justify-end gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddForm(false)}
                                        className="rounded bg-gray-300 px-4 py-2 text-black hover:bg-gray-400"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleAddPatient}
                                        className="rounded bg-primary px-4 py-2 text-white hover:bg-primary-dark"
                                    >
                                        Ajouter
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
};

export default Patients;
