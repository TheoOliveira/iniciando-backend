import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepos from '../repositories/AppointmentsRepos';

interface Request {
    provider: string;
    date: Date;
}
class CreateAppointmentService {
    private appointmentsRepos: AppointmentsRepos;

    constructor(appointmentsRepo: AppointmentsRepos) {
        this.appointmentsRepos = appointmentsRepo;
    }

    public execute({ date, provider }: Request): Appointment {
        const appointmentDate = startOfHour(date);

        const findAppointSameDate = this.appointmentsRepos.findByDate(
            appointmentDate,
        );

        if (findAppointSameDate) {
            throw Error('this appointment is already used');
        }
        const appointment = this.appointmentsRepos.create({
            provider,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
