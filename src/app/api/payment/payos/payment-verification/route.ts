import { NextRequest, NextResponse } from 'next/server';
import payOSPaymentService from '@/services/payOSPaymentService';

/**
 * @swagger
 * /api/payment/payos/payment-verification:
 *   patch:
 *     tags:
 *       - Payment
 *     description: Update payment status.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - buyerID
 *             properties:
 *               buyerID:
 *                 type: integer
 *                 default: 1
 *     responses:
 *       200:
 *         description: Payment request object
 *       500:
 *         description: Error message
 */

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    body.description = 'OUTRSPACE8';
    body.items = [
      {
        name: 'Phí tham gia Outrspace',
        quantity: 1,
        price: 10000,
      },
    ];

    const paymentLink = await payOSPaymentService.createPaymentLink(body);
    const response = await payOSPaymentService.verifyPayment(paymentLink);

    if (response === undefined) throw new Error('Empty response');
    return NextResponse.json(response.responseBody(), { status: response.status });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message, data: {} }, { status: 500 });
  }
}
