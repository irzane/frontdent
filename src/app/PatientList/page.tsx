import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import PatientList from "@/components/PatientList";

export const metadata: Metadata = {
  title: "Gestion des Patients | Dashboard Dentiste",
  description: "Liste et gestion des patients dans le Dashboard Dentiste",
};

const PatientsPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto w-full max-w-[970px]">
        <Breadcrumb pageName="Gestion des Patients" />
        <PatientList />
      </div>
    </DefaultLayout>
  );
};

export default PatientsPage;
