import { sha256 } from "js-sha256";
import { PayOSObject } from "../interface/PayOSObject";

// Generate order code base on unix timestamp
export function generateOrderCode() {
  const orderCode = Number(String(Date.now()).slice(-6));
  return orderCode;
}

// Get PayOS signature
export function getPayOSSignature(data: PayOSObject) {
  const PAYOS_CHECKSUM_KEY = String(process.env.PAYOS_CHECKSUM_KEY);
  const { amount, cancelUrl, description, orderCode, returnUrl } = data;
  const message = `amount=${amount}&cancelUrl=${cancelUrl}&description=${description}&orderCode=${orderCode}&returnUrl=${returnUrl}`;

  return sha256.hmac(PAYOS_CHECKSUM_KEY, message);
}

// Get support unix timestamp for PayOS
export function getUnixTimeStamp() {
  return Math.floor(Date.now() / 1000);
}

// Calculate total price
export function calcTotalPrice(
  items: { name: string; quantity: number; price: number }[],
) {
  let totalPrice = 0;

  items.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });

  return totalPrice;
}
