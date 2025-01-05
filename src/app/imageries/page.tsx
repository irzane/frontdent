"use client";

import { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import axios from "axios";

// Define the Imagerie type
interface Imagerie {
    imagerieID: number;
    patient: string;
    dateImagerie: string;
    typeImagerie: string;
    description: string;
    urlImage?: string;
}

const Imageries = () => {
    const [imageries, setImageries] = useState<Imagerie[]>([]);
    const [search, setSearch] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const [newImagerie, setNewImagerie] = useState({
        patient: "",
        dateImagerie: "",
        typeImagerie: "",
        description: "",
        urlImage: "",
    });

    // Fetch the data from the API
    useEffect(() => {
        axios
            .get("http://localhost:5254/api/Imagerie")
            .then((response) => {
                console.log(response.data); // Vérifie les données récupérées
                setImageries(response.data);
            })
            .catch((error) => {
                console.error("Error fetching imageries:", error);
            });
    }, []);

    const handleAddImagerie = () => {
        const formData = new FormData();
        formData.append("patient", newImagerie.patient);
        formData.append("date", newImagerie.dateImagerie);
        formData.append("type_imagerie", newImagerie.typeImagerie);
        formData.append("description", newImagerie.description);
        formData.append("fichier", newImagerie.urlImage);

        axios
            .post("http://localhost:5254/api/Imagerie", formData)
            .then((response) => {
                setImageries([...imageries, response.data]); // Add the new imagery to the list
                setShowAddForm(false);
                setNewImagerie({
                    patient: "",
                    dateImagerie: "",
                    typeImagerie: "",
                    description: "",
                    urlImage: "",
                });
            })
            .catch((error) => {
                console.error("Error adding new imagerie:", error);
            });
    };

    // Filtrer les imageries en fonction de la recherche
    const filteredImageries = imageries.filter((imagerie) =>
        imagerie.patient?.toLowerCase().includes(search.toLowerCase()) || false
    );

    console.log(filteredImageries); // Vérifie les imageries filtrées

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
                        {filteredImageries.length > 0 ? (
                            filteredImageries.map((imagerie) => (
                                <tr
                                    key={imagerie.imagerieID}
                                    className={`${
                                        imagerie.imagerieID % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    } hover:bg-gray-100 transition-colors duration-200`}
                                >
                                    <td className="px-6 py-4 text-sm font-medium">{imagerie.imagerieID}</td>
                                    <td className="px-6 py-4 text-sm">{imagerie.patient}</td>
                                    <td className="px-6 py-4 text-sm">{imagerie.dateImagerie}</td>
                                    <td className="px-6 py-4 text-sm">{imagerie.typeImagerie}</td>
                                    <td className="px-6 py-4 text-sm">{imagerie.description}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <a
                                            href={`imageries/${imagerie.urlImage}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 underline"
                                        >
                                            Voir le fichier
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-4 text-sm text-center">
                                    Aucune imagerie trouvée.
                                </td>
                            </tr>
                        )}
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
                                        value={newImagerie.dateImagerie}
                                        onChange={(e) =>
                                            setNewImagerie({ ...newImagerie, dateImagerie: e.target.value })
                                        }
                                        className="mt-1 w-full rounded border border-gray-300 p-2"
                                    />
                                </div>

                                <div className="mb-2">
                                    <label className="block font-medium">Type d'Imagerie</label>
                                    <input
                                        type="text"
                                        value={newImagerie.typeImagerie}
                                        onChange={(e) =>
                                            setNewImagerie({ ...newImagerie, typeImagerie: e.target.value })
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
                                            setNewImagerie({ ...newImagerie, urlImage: e.target.files?.[0]?.name || "" })
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
