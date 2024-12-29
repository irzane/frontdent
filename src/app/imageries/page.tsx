"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

const Imageries = () => {
    const [imageries, setImageries] = useState([
        {
            id: 1,
            patient: "Ahmed El Fassi",
            date: "2023-12-20",
            type_imagerie: "Radiographie dentaire",
            description: "Radiographie des molaires",
            fichier: "radiographie1.png",
        },
        {
            id: 2,
            patient: "Fatima Berrada",
            date: "2023-12-25",
            type_imagerie: "Scanner",
            description: "Scanner maxillaire",
            fichier: "scanner1.pdf",
        },
    ]);

    const [search, setSearch] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const [newImagerie, setNewImagerie] = useState({
        patient: "",
        date: "",
        type_imagerie: "",
        description: "",
        fichier: null,
    });

    const handleAddImagerie = () => {
        setImageries([...imageries, { ...newImagerie, id: imageries.length + 1 }]);
        setShowAddForm(false);
        setNewImagerie({
            patient: "",
            date: "",
            type_imagerie: "",
            description: "",
            fichier: null,
        });
    };

    const filteredImageries = imageries.filter((imagerie) =>
        imagerie.patient.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <DefaultLayout>
            <div className="mx-auto w-full max-w-[1200px]">
                <Breadcrumb pageName="Liste des Imageries" />

                <div className="mb-4 flex justify-between items-center">
                    <div>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Rechercher une imagerie..."
                            className="rounded border border-gray-300 p-2"
                        />
                    </div>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="rounded bg-primary px-4 py-2 text-white hover:bg-primary-dark"
                    >
                        Ajouter une Imagerie
                    </button>
                </div>

                <table className="w-full border-collapse text-left shadow-lg rounded-lg overflow-hidden">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-sm font-medium">#</th>
                            <th className="px-6 py-3 text-sm font-medium">Patient</th>
                            <th className="px-6 py-3 text-sm font-medium">Date</th>
                            <th className="px-6 py-3 text-sm font-medium">Type</th>
                            <th className="px-6 py-3 text-sm font-medium">Description</th>
                            <th className="px-6 py-3 text-sm font-medium">Fichier</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {filteredImageries.map((imagerie) => (
                            <tr
                                key={imagerie.id}
                                className={`${
                                    imagerie.id % 2 === 0 ? "bg-gray-50" : "bg-white"
                                } hover:bg-gray-100 transition-colors duration-200`}
                            >
                                <td className="px-6 py-4 text-sm font-medium">{imagerie.id}</td>
                                <td className="px-6 py-4 text-sm">{imagerie.patient}</td>
                                <td className="px-6 py-4 text-sm">{imagerie.date}</td>
                                <td className="px-6 py-4 text-sm">{imagerie.type_imagerie}</td>
                                <td className="px-6 py-4 text-sm">{imagerie.description}</td>
                                <td className="px-6 py-4 text-sm">
                                    <a
                                        href={`imageries/${imagerie.fichier}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        Voir le fichier
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {showAddForm && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                        <div className="w-[500px] max-h-[80vh] overflow-y-auto rounded bg-white p-4">
                            <h3 className="mb-3 text-lg font-bold">Ajouter une Imagerie</h3>
                            <form>
                                <div className="mb-2">
                                    <label className="block font-medium">Patient</label>
                                    <input
                                        type="text"
                                        value={newImagerie.patient}
                                        onChange={(e) =>
                                            setNewImagerie({ ...newImagerie, patient: e.target.value })
                                        }
                                        className="mt-1 w-full rounded border border-gray-300 p-2"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block font-medium">Date</label>
                                    <input
                                        type="date"
                                        value={newImagerie.date}
                                        onChange={(e) =>
                                            setNewImagerie({ ...newImagerie, date: e.target.value })
                                        }
                                        className="mt-1 w-full rounded border border-gray-300 p-2"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block font-medium">Type d'Imagerie</label>
                                    <input
                                        type="text"
                                        value={newImagerie.type_imagerie}
                                        onChange={(e) =>
                                            setNewImagerie({ ...newImagerie, type_imagerie: e.target.value })
                                        }
                                        className="mt-1 w-full rounded border border-gray-300 p-2"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block font-medium">Description</label>
                                    <textarea
                                        value={newImagerie.description}
                                        onChange={(e) =>
                                            setNewImagerie({ ...newImagerie, description: e.target.value })
                                        }
                                        className="mt-1 w-full rounded border border-gray-300 p-2"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block font-medium">Fichier</label>
                                    <input
                                        type="file"
                                        onChange={(e) =>
                                            setNewImagerie({ ...newImagerie, fichier: e.target.files[0] })
                                        }
                                        className="mt-1 w-full"
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
                                        onClick={handleAddImagerie}
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

export default Imageries;
