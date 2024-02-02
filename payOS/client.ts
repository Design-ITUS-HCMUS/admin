import PayOS from '@payos/node';

const PAYOS_CLIENT_ID = String(process.env.PAYOS_CLIENT_ID);
const PAYOS_API_KEY = String(process.env.PAYOS_API_KEY);
const PAYOS_CHECKSUM_KEY = String(process.env.PAYOS_CHECKSUM_KEY);

const globalForPayOS = globalThis as unknown as { payOS: PayOS };

export const payOS = globalForPayOS.payOS || new PayOS(PAYOS_CLIENT_ID, PAYOS_API_KEY, PAYOS_CHECKSUM_KEY);

if (process.env.NODE_ENV !== 'production') globalForPayOS.payOS = payOS;
