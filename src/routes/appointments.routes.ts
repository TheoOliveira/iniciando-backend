import { Router } from 'express';
import { parseISO } from 'date-fns';
import {getCustomRepository} from 'typeorm';
import AppointmentsRepos from '../repositories/AppointmentsRepos';
import CreateAppointmentService from '../services/CreateAppointmentsService';

const appointmentsRouter = Router();



appointmentsRouter.get('/', async (req, res) => {
    const appointmentsRepos = getCustomRepository(AppointmentsRepos);
    const appointments = await appointmentsRepos.find();

    return res.json(appointments);
});
appointmentsRouter.post('/', async (req, res) => {
    try {
        const { provider_id, date } = req.body;

        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService();

        const appointment = await createAppointment.execute({
            date: parsedDate,
            provider_id,
        });
        return res.status(200).json(appointment);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

export default appointmentsRouter;
