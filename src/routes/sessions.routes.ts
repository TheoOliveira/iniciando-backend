import { Router } from 'express';

import AuthenticateService from '../services/AuthenticateService';
const sessionsRouter = Router();



sessionsRouter.post('/', async (req, res) => {
    try {
        const {email, password} = req.body;

        const auth = new AuthenticateService();

        const {user, token} = await auth.execute({
            email,
            password
        });

        delete user.password;

        return res.json({user, token});
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

export default sessionsRouter;
