import express from 'express';
import { login, resetSeekerPassword, seekerSignUp, providerSignUp, resetProviderPassword, providerSignUpAndBecomeMerchant } from '../controller/auth';
const router = express.Router();

router.post('/login', login);
router.post('/seeker/signup', seekerSignUp);
router.post('/provider/signup', providerSignUpAndBecomeMerchant);
router.post('/seeker/resetPassword', resetSeekerPassword);
router.post('/provider/resetPassword', resetProviderPassword);

export default router;