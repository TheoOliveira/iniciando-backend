import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepos from '../repositories/AppointmentsRepos';
import CreateAppointmentService from '../services/CreateAppointmentsService';

const appointmentsRouter = Router();

const appointmentsRepos = new AppointmentsRepos();

appointmentsRouter.get('/', (req, res) => {
    const appointments = appointmentsRepos.all();

    return res.json(appointments);
});
appointmentsRouter.post('/', (req, res) => {
    try {
        const { provider, date } = req.body;

        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService(
            appointmentsRepos,
        );

        const appointment = createAppointment.execute({
            date: parsedDate,
            provider,
        });
        return res.status(200).json(appointment);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

export default appointmentsRouter;
