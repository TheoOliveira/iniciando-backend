import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface createAppointDTO {
    provider: string;
    date: Date;
}

class AppointmentsRepos {
    private appointments: Appointment[];

    constructor() {
        this.appointments = [];
    }

    public all(): Appointment[] {
        return this.appointments;
    }

    public findByDate(date: Date): Appointment | null {
        const findAppoint = this.appointments.find(appointment =>
            isEqual(date, appointment.date),
        );

        return findAppoint || null;
    }

    public create({ provider, date }: createAppointDTO): Appointment {
        const appointment = new Appointment({ provider, date });

        this.appointments.push(appointment);

        return appointment;
    }
}

export default AppointmentsRepos;
