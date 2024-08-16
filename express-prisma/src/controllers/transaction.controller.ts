import { Request, Response } from "express";
import prisma from "../prisma";
import axios from "axios";

export const createTransaction = async (req: Request, res: Response) => {
    try {
        const { price } = req.body
        const transaction = await prisma.transaction.create({
            data: {
                price,
                paymentLink: "",
                userId: req.user?.id!
            }
        })
        // U0ItTWlkLXNlcnZlci1nY29ocTd0cTZrOWdmOVNmV3BDblZaeFk6
        const data = {
            transaction_details: {
                order_id: transaction.id,
                gross_amount: transaction.price
            },
            expiry: {
                unit: "minutes",
                duration: 1
            }
        }
        const midtrans = await axios.post("https://app.sandbox.midtrans.com/snap/v1/transactions", data,
            {
                headers: {
                    Authorization: "Basic U0ItTWlkLXNlcnZlci1nY29ocTd0cTZrOWdmOVNmV3BDblZaeFk6"
                }
            })
        const midtransData = midtrans.data

        await prisma.transaction.update({
            data: {
                paymentLink: midtransData?.redirect_url
            },
            where: {
                id: transaction.id
            }
        })

        return res.status(200).send({
            status: 'ok',
            msg: 'Transaction created!',
            transaction,
            data: midtransData
        })
    } catch (err) {
        console.log(err);
        
        return res.status(400).send({
            status: "error",
            msg: err
        })
    }
}

export const updateStatusTrans = async (req: Request, res: Response) => {
    try {
        const { transaction_status, order_id } = req.body
        
        if (transaction_status == "settlement") {
            await prisma.transaction.update({
                data: { status: "paid" },
                where: { id: order_id }
            })
        }
        if (transaction_status == "cancel") {
            await prisma.transaction.update({
                data: { status: "cancel" },
                where: { id: order_id }
            })
        }
        if (transaction_status == "expire") {
            await prisma.transaction.update({
                data: { status: "cancel" },
                where: { id: order_id }
            })
        }
        
        return res.status(200).send({
            status: 'ok',
            msg: 'transaction updated'
        })
    } catch (err) {
        console.log(err);
        return res.status(400).send({
            status: "error",
            msg: err
        })
    }
}