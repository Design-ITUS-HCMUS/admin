// Get support unix timestamp for PayOS
export function getUnixTimeStamp() {
  return Math.floor(Date.now() / 1000);
}

// Calculate total price
export function calcTotalPrice(items: { name: string; quantity: number; price: number }[]) {
  let totalPrice = 0;

  items.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });

  return totalPrice;
}