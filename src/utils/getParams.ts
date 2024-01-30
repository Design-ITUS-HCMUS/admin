import { NextRequest } from 'next/server';

export default function getParams(req: NextRequest) {
  return req.nextUrl.pathname.split('/').pop();
}
