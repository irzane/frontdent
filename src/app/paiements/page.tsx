"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

const Paiements = () => {
    const [paiements, setPaiements] = useState([
        {
            id: 1,
            acte: "Consultation",
            date: "2024-12-26",
            type_paiement: "Espèces",
            montant: 500,
            note: "Aucun commentaire",
        },
        {
            id: 2,
            acte: "Détartrage",
            date: "2024-12-20",
            type_paiement: "Chèque",
            montant: 1200,
            note: "Paiement en deux fois",
        },
    ]);

    const [search, setSearch] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const [newPaiement, setNewPaiement] = useState({
        acte: "",
        date: "",
        type_paiement: "",
        montant: "",
        note: "",
    });

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const handleAddPaiement = () => {
        setPaiements([...paiements, { ...newPaiement, id: paiements.length + 1 }]);
        setShowAddForm(false);
        setNewPaiement({
            acte: "",
            date: "",
            type_paiement: "",
            montant: "",
            note: "",
        });
    };

    const filteredPaiements = paiements.filter(
        (paiement) =>
            paiement.acte.toLowerCase().includes(search.toLowerCase()) ||
            paiement.type_paiement.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredPaiements.length / rowsPerPage);
    const currentPaiements = filteredPaiements.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    return (
        <DefaultLayout>
            <div className="mx-auto w-full max-w-[1200px]">
                <Breadcrumb pageName="Liste des Paiements" />

                <div className="mb-4 flex justify-between items-center">
                    <div>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Rechercher un paiement..."
                            className="rounded border border-gray-300 p-2"
                        />
                    </div>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="rounded bg-primary px-4 py-2 text-white hover:bg-primary-dark"
                    >
                        Ajouter un Paiement
                    </button>
                </div>

                <table className="w-full border-collapse text-left shadow-lg rounded-lg overflow-hidden">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-sm font-medium">#</th>
                            <th className="px-6 py-3 text-sm font-medium">Acte</th>
                            <th className="px-6 py-3 text-sm font-medium">Date</th>
                            <th className="px-6 py-3 text-sm font-medium">Type</th>
                            <th className="px-6 py-3 text-sm font-medium">Montant</th>
                            <th className="px-6 py-3 text-sm font-medium">Note</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {currentPaiements.map((paiement) => (
                            <tr
                                key={paiement.id}
                                className={`${
                                    paiement.id % 2 === 0 ? "bg-gray-50" : "bg-white"
                                } hover:bg-gray-100 transition-colors duration-200`}
                            >
                                <td className="px-6 py-4 text-sm font-medium">{paiement.id}</td>
                                <td className="px-6 py-4 text-sm">{paiement.acte}</td>
                                <td className="px-6 py-4 text-sm">{paiement.date}</td>
                                <td className="px-6 py-4 text-sm">{paiement.type_paiement}</td>
                                <td className="px-6 py-4 text-sm">{paiement.montant} MAD</td>
                                <td className="px-6 py-4 text-sm">{paiement.note}</td>
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
                            <h3 className="mb-3 text-lg font-bold">Ajouter un Paiement</h3>
                            <form>
                                <div className="mb-2">
                                    <label className="block font-medium">Acte</label>
                                    <input
                                        type="text"
                                        value={newPaiement.acte}
                                        onChange={(e) => setNewPaiement({ ...newPaiement, acte: e.target.value })}
                                        className="mt-1 w-full rounded border border-gray-300 p-2"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block font-medium">Date</label>
                                    <input
                                        type="date"
                                        value={newPaiement.date}
                                        onChange={(e) => setNewPaiement({ ...newPaiement, date: e.target.value })}
                                        className="mt-1 w-full rounded border border-gray-300 p-2"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block font-medium">Type de paiement</label>
                                    <select
                                        value={newPaiement.type_paiement}
                                        onChange={(e) =>
                                            setNewPaiement({ ...newPaiement, type_paiement: e.target.value })
                                        }
                                        className="mt-1 w-full rounded border border-gray-300 p-2"
                                    >
                                        <option value="">Sélectionner un type</option>
                                        <option value="Espèces">Espèces</option>
                                        <option value="Chèque">Chèque</option>
                                        <option value="Virement">Virement</option>
                                        <option value="Carte bancaire">Carte bancaire</option>
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <label className="block font-medium">Montant</label>
                                    <input
                                        type="number"
                                        value={newPaiement.montant}
                                        onChange={(e) => setNewPaiement({ ...newPaiement, montant: e.target.value })}
                                        className="mt-1 w-full rounded border border-gray-300 p-2"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block font-medium">Note</label>
                                    <textarea
                                        value={newPaiement.note}
                                        onChange={(e) => setNewPaiement({ ...newPaiement, note: e.target.value })}
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
                                        onClick={handleAddPaiement}
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

export default Paiements;
