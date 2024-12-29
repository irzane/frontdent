import { getAllPatients, addPatient } from '../../../../components/Tables/services/PatientService';

import type { NextApiRequest, NextApiResponse } from 'next';
import { Patient } from '../../../../components/Tables/type/type';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const patients: Patient[] = await getAllPatients();
    return res.status(200).json(patients);
  } else if (req.method === 'POST') {
    const newPatient: Patient = await addPatient(req.body);
    return res.status(201).json(newPatient);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
