 //submit reimbursement
import express from 'express';
import { authorization } from '../middleware/auth-middleware';

export const reimbursementsRouter = express.Router();


//Find Reimbursement by Status
reimbursementsRouter('/status/:statusId', );

//Find reimbursements by user
reimbursementsRouter('/author/userId/:userId', );