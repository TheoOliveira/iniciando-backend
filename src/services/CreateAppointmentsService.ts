import { startOfHour } from 'date-fns';
import {getCustomRepository} from 'typeorm';
import Appointment from '../models/Appointment';
import User from '../models/User';

import AppointmentsRepos from '../repositories/AppointmentsRepos';

interface Request {
    provider_id: string;
    date: Date;
}
class CreateAppointmentService {


    public async execute({ date, provider_id }: Request): Promise<Appointment> {
        const appointmentsRepos = getCustomRepository(AppointmentsRepos)
        const appointmentDate = startOfHour(date);

        const findAppointSameDate = await appointmentsRepos.findByDate(
            appointmentDate,
        );

        if (findAppointSameDate) {
            throw Error('this appointment is already used');
        }
        const appointment = appointmentsRepos.create({
            provider_id,
            date: appointmentDate,
        });

        await appointmentsRepos.save(appointment)
        return appointment;
    }
}

export default CreateAppointmentService;
