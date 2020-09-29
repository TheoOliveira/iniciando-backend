import Appointment from '../models/Appointment';
import {EntityRepository, Repository} from 'typeorm';

@EntityRepository(Appointment)
class AppointmentsRepos extends Repository<Appointment>  {

    public async findByDate(date: Date): Promise<Appointment | null> {

const findAppoint = await this.findOne({
    where: {date: date},

});
        return findAppoint || null;
    }


}

export default AppointmentsRepos;
