"use client";

import { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

type Appointment = {
  id: number;
  date: string;
  time: string;
  patient: string;
  type: string;
  color: string;
};

const CalendarPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 1, date: "2024-12-01", time: "09:00", patient: "Ahmed El Fassi", type: "Consultation", color: "bg-blue-500" },
    { id: 2, date: "2024-12-01", time: "11:00", patient: "Fatima Berrada", type: "Détartrage", color: "bg-green-500" },
    { id: 3, date: "2024-12-02", time: "14:00", patient: "Mohamed Ait Lamqaddem", type: "Extraction", color: "bg-red-500" },
  ]);

  const [filters, setFilters] = useState({ date: "", type: "" });
  const [showAddForm, setShowAddForm] = useState(false);

  const [newAppointment, setNewAppointment] = useState({
    date: "",
    time: "",
    patient: "",
    type: "Consultation",
  });

  const interventions = ["Consultation", "Détartrage", "Extraction", "Blanchiment"];

  const hours = [
    "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00",
  ];

  const filteredAppointments = appointments.filter(
    (appt) =>
      (!filters.date || appt.date === filters.date) &&
      (!filters.type || appt.type === filters.type)
  );

  const handleAddAppointment = () => {
    setAppointments([
      ...appointments,
      {
        ...newAppointment,
        id: appointments.length + 1,
        color: getColorForType(newAppointment.type),
      },
    ]);
    setShowAddForm(false);
    setNewAppointment({
      date: "",
      time: "",
      patient: "",
      type: "Consultation",
    });
  };

  const getColorForType = (type: string): string => {
    switch (type) {
      case "Consultation":
        return "bg-blue-500";
      case "Détartrage":
        return "bg-green-500";
      case "Extraction":
        return "bg-red-500";
      case "Blanchiment":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Rendez-vous" />

        <div className="my-5 flex justify-between">
          <button
            onClick={() => setShowAddForm(true)}
            className="rounded bg-primary px-4 py-2 text-white hover:bg-primary-dark"
          >
            Ajouter un nouveau rendez-vous
          </button>

          <div className="flex gap-4">
            <input
              type="date"
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              className="rounded border border-gray-300 p-2"
            />
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="rounded border border-gray-300 p-2"
            >
              <option value="">Tous les types</option>
              {interventions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {showAddForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-[500px] rounded bg-white p-6">
              <h3 className="mb-3 text-lg font-bold">Ajouter un rendez-vous</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium">Date</label>
                  <input
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) =>
                      setNewAppointment({ ...newAppointment, date: e.target.value })
                    }
                    className="mt-1 w-full rounded border border-gray-300 p-2"
                  />
                </div>
                <div>
                  <label className="block font-medium">Heure</label>
                  <input
                    type="time"
                    value={newAppointment.time}
                    onChange={(e) =>
                      setNewAppointment({ ...newAppointment, time: e.target.value })
                    }
                    className="mt-1 w-full rounded border border-gray-300 p-2"
                  />
                </div>
                <div>
                  <label className="block font-medium">Nom du patient</label>
                  <input
                    type="text"
                    value={newAppointment.patient}
                    onChange={(e) =>
                      setNewAppointment({ ...newAppointment, patient: e.target.value })
                    }
                    className="mt-1 w-full rounded border border-gray-300 p-2"
                  />
                </div>
                <div>
                  <label className="block font-medium">Intervention</label>
                  <select
                    value={newAppointment.type}
                    onChange={(e) =>
                      setNewAppointment({ ...newAppointment, type: e.target.value })
                    }
                    className="mt-1 w-full rounded border border-gray-300 p-2"
                  >
                    {interventions.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-4">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="rounded bg-gray-300 px-4 py-2 text-black hover:bg-gray-400"
                >
                  Annuler
                </button>
                <button
                  onClick={handleAddAppointment}
                  className="rounded bg-primary px-4 py-2 text-white hover:bg-primary-dark"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-8 border border-gray-300">
          <div className="border border-gray-300 bg-gray-100 p-2 text-center font-bold">
            Heure
          </div>
          {Array.from({ length: 7 }, (_, i) => {
            const date = `2024-12-${(i + 1).toString().padStart(2, "0")}`;
            return (
              <div
                key={i}
                className="border border-gray-300 bg-gray-100 p-2 text-center font-bold"
              >
                {date}
              </div>
            );
          })}

          {hours.map((hour) => (
            <>
              <div className="border border-gray-300 p-2 text-center font-bold">
                {hour}
              </div>
              {Array.from({ length: 7 }, (_, dayIndex) => {
                const date = `2024-12-${(dayIndex + 1).toString().padStart(2, "0")}`;
                const appointmentsAtTime = filteredAppointments.filter(
                  (appt) => appt.date === date && appt.time === hour
                );

                return (
                  <div
                    key={`${date}-${hour}`}
                    className="border border-gray-300 p-2"
                  >
                    {appointmentsAtTime.map((appt) => (
                      <div
                        key={appt.id}
                        className={`rounded px-2 py-1 text-xs text-white ${appt.color}`}
                        title={`${appt.type} - ${appt.patient}`}
                      >
                        {appt.patient}
                      </div>
                    ))}
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CalendarPage;
