import { RequestHandler } from "express";
import Payment from "../knex/models/Payment";
import { StatusCodes } from "http-status-codes";

export const getPayments: RequestHandler = async (req, res) => {
    const { paid } = req.params;
    try {
        let payments = await Payment.query();

        switch (paid) {
            case 'yes':
                payments = payments.filter(p => p.paidAt !== null);
                break;
            case 'no':
                payments = payments.filter(p => p.paidAt === null);
                break;
            default:
                break;
        };

        res.status(StatusCodes.OK).json(payments);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};