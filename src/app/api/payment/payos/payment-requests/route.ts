// Configuration source: https://vercel.com/docs/storage/vercel-postgres/quickstart
import { NextResponse } from 'next/server';
import { PayOSObject } from '@interface/PayOSObject';
import { getPayOSSignature, generateOrderCode, getUnixTimeStamp, calcTotalPrice } from '@utils/payOSUtils';

// Do not use `export default` here, as it will break the routing
export async function GET(req: Request) {
  try {
    // Get env variables
    const CLIENT_ID = String(process.env.PAYOS_CLIENT_ID);
    const API_KEY = String(process.env.PAYOS_API_KEY);

    // Replace with data from req.body later
    const description = 'OUTRSPACE';
    const cancelUrl = 'https://google.com';
    const returnUrl = 'https://google.com';
    const items = [
      {
        name: 'Phí tham gia Outrspace',
        quantity: 1,
        price: 10000,
      },
    ];

    // Create PayOS object
    const payOSObject: PayOSObject = {
      orderCode: generateOrderCode(),
      amount: calcTotalPrice(items),
      description,
      items,
      cancelUrl,
      returnUrl,
      expiredAt: getUnixTimeStamp() + 600, // 10 minutes per transaction
    };

    // Add signature to PayOS object
    payOSObject.signature = getPayOSSignature(payOSObject);

    // Send request to PayOS API
    const rawResponse = await fetch('https://api-merchant.payos.vn/v2/payment-requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Client-Id': CLIENT_ID,
        'X-Api-Key': API_KEY,
      },
      body: JSON.stringify(payOSObject),
    });

    // Redirect to checkout page
    const response = await rawResponse.json();

    // Catch error from PayOS API
    if (response.desc !== 'success') throw new Error(response.desc);

    return NextResponse.redirect(response.data.checkoutUrl);
  } catch (error) {
    return NextResponse.json({ message: String(error) }, { status: 500 });
  }
}
