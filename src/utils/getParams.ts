import { NextRequest } from 'next/server';

export default function getParams(req: NextRequest, pos: number = -1) {
  const params = req.nextUrl.pathname.split('/');
  return params.at(pos);
}
