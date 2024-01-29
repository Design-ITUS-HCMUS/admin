import { NextRequest, NextResponse } from 'next/server';
import payOSPaymentService from '@/services/payOSPaymentService';

/**
 * @swagger
 * /api/payment/payos/webhook-event-handler:
 *   post:
 *     tags:
 *       - Payment
 *     description: Returns 200 status code to confirm webhook is working
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/RequestObject'
 *     responses:
 *       200:
 *         description: Used to verify webhook url in PayOS dashboard
 *
 * definitions:
 *   RequestObject:
 *     type: object
 *     properties:
 *       code:
 *         type: string
 *         default: "00"
 *       desc:
 *         type: string
 *         default: "success"
 *       data:
 *         $ref: '#/definitions/DataObject'
 *       signature:
 *         type: string
 *         default: "2ddc42638e5efe5dc562c49d538598227c75db17deaa618b1a8d408517c881fd"
 *
 *   DataObject:
 *     type: object
 *     properties:
 *       orderCode:
 *         type: integer
 *         default: 123
 *       amount:
 *         type: integer
 *         default: 3000
 *       description:
 *         type: string
 *         default: "VQRIO123"
 *       accountNumber:
 *         type: string
 *         default: "12345678"
 *       reference:
 *         type: string
 *         default: "TF230204212323"
 *       transactionDateTime:
 *         type: string
 *         default: "2023-02-04 18:25:00"
 *       paymentLinkId:
 *         type: string
 *         default: "124c33293c43417ab7879e14c8d9eb18"
 *       code:
 *         type: string
 *         default: "00"
 *       desc:
 *         type: string
 *         default: "Thành công"
 *       counterAccountBankId:
 *         type: string
 *         default: ""
 *       counterAccountBankName:
 *         type: string
 *         default: ""
 *       counterAccountName:
 *         type: string
 *         default: ""
 *       counterAccountNumber:
 *         type: string
 *         default: ""
 *       virtualAccountName:
 *         type: string
 *         default: ""
 *       virtualAccountNumber:
 *         type: string
 *         default: ""
 */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await payOSPaymentService.handleWebhookEvent(body);
    return NextResponse.json(response.responseBody(), { status: response.status });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message, data: {} }, { status: 500 });
  }
}
