"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

const Comptabilite = () => {
    const [transactions, setTransactions] = useState([
        {
            id: 1,
            date: "2023-12-01",
            type: "Paiement patient",
            description: "Paiement pour consultation",
            montant: 500,
            mode: "Espèces",
        },
        {
            id: 2,
            date: "2023-12-03",
            type: "Dépense",
            description: "Achat de fournitures dentaires",
            montant: -300,
            mode: "Carte bancaire",
        },
    ]);

    const [search, setSearch] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const [newTransaction, setNewTransaction] = useState({
        date: "",
        type: "",
        description: "",
        montant: "",
        mode: "",
    });

    const handleAddTransaction = () => {
        setTransactions([...transactions, { ...newTransaction, id: transactions.length + 1 }]);
        setShowAddForm(false);
        setNewTransaction({
            date: "",
            type: "",
            description: "",
            montant: "",
            mode: "",
        });
    };

    const filteredTransactions = transactions.filter((transaction) =>
        transaction.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <DefaultLayout>
            <div className="mx-auto w-full max-w-[1200px]">
                <Breadcrumb pageName="Comptabilité" />

                <div className="mb-4 flex justify-between items-center">
                    <div>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Rechercher une transaction..."
                            className="rounded border border-gray-300 p-2"
                        />
                    </div>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="rounded bg-primary px-4 py-2 text-white hover:bg-primary-dark"
                    >
                        Ajouter une Transaction
                    </button>
                </div>

                <table className="w-full border-collapse text-left shadow-lg rounded-lg overflow-hidden">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-sm font-medium">#</th>
                            <th className="px-6 py-3 text-sm font-medium">Date</th>
                            <th className="px-6 py-3 text-sm font-medium">Type</th>
                            <th className="px-6 py-3 text-sm font-medium">Description</th>
                            <th className="px-6 py-3 text-sm font-medium">Montant</th>
                            <th className="px-6 py-3 text-sm font-medium">Mode</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {filteredTransactions.map((transaction) => (
                            <tr
                                key={transaction.id}
                                className={`${
                                    transaction.id % 2 === 0 ? "bg-gray-50" : "bg-white"
                                } hover:bg-gray-100 transition-colors duration-200`}
                            >
                                <td className="px-6 py-4 text-sm font-medium">{transaction.id}</td>
                                <td className="px-6 py-4 text-sm">{transaction.date}</td>
                                <td className="px-6 py-4 text-sm">{transaction.type}</td>
                                <td className="px-6 py-4 text-sm">{transaction.description}</td>
                                <td className="px-6 py-4 text-sm">
                                    {transaction.montant > 0 ? "+" : ""}
                                    {transaction.montant} MAD
                                </td>
                                <td className="px-6 py-4 text-sm">{transaction.mode}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {showAddForm && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                        <div className="w-[500px] max-h-[80vh] overflow-y-auto rounded bg-white p-4">
                            <h3 className="mb-3 text-lg font-bold">Ajouter une Transaction</h3>
                            <form>
                                <div className="mb-2">
                                    <label className="block font-medium">Date</label>
                                    <input
                                        type="date"
                                        value={newTransaction.date}
                                        onChange={(e) =>
                                            setNewTransaction({ ...newTransaction, date: e.target.value })
                                        }
                                        className="mt-1 w-full rounded border border-gray-300 p-2"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block font-medium">Type</label>
                                    <select
                                        value={newTransaction.type}
                                        onChange={(e) =>
                                            setNewTransaction({ ...newTransaction, type: e.target.value })
                                        }
                                        className="mt-1 w-full rounded border border-gray-300 p-2"
                                    >
                                        <option value="">-- Sélectionner --</option>
                                        <option value="Paiement patient">Paiement patient</option>
                                        <option value="Dépense">Dépense</option>
                                    </select>
                                </div>

                                <div className="mb-2">
                                    <label className="block font-medium">Description</label>
                                    <textarea
                                        value={newTransaction.description}
                                        onChange={(e) =>
                                            setNewTransaction({ ...newTransaction, description: e.target.value })
                                        }
                                        className="mt-1 w-full rounded border border-gray-300 p-2"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block font-medium">Montant</label>
                                    <input
                                        type="number"
                                        value={newTransaction.montant}
                                        onChange={(e) =>
                                            setNewTransaction({ ...newTransaction, montant: e.target.value })
                                        }
                                        className="mt-1 w-full rounded border border-gray-300 p-2"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block font-medium">Mode de Paiement</label>
                                    <select
                                        value={newTransaction.mode}
                                        onChange={(e) =>
                                            setNewTransaction({ ...newTransaction, mode: e.target.value })
                                        }
                                        className="mt-1 w-full rounded border border-gray-300 p-2"
                                    >
                                        <option value="">-- Sélectionner --</option>
                                        <option value="Espèces">Espèces</option>
                                        <option value="Carte bancaire">Carte bancaire</option>
                                        <option value="Chèque">Chèque</option>
                                    </select>
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
                                        onClick={handleAddTransaction}
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

export default Comptabilite;
