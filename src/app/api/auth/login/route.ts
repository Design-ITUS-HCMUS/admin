import { NextRequest, NextResponse } from 'next/server';
import AuthService from '@/services/authService';
import CommonService from '@/services/commonService';

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Authentication user to access website.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usernameOrEmail:
 *                 type: string
 *                 example: Design_ITUS
 *               password:
 *                  type: string
 *                  example: 12345678
 *     responses:
 *       200:
 *         description: Login successfully.The token is returned in a cookie named `Token`. You need to include this cookie in subsequent requests.
 *       400:
 *         description: Missing username or password.
 *       403:
 *         description: Invalid username or password.
 *       500:
 *         description: Error message.
 */
export async function POST(req: NextRequest) {
  const data = await req.json();
  const res = await AuthService.login(data);
  const { value, body } = CommonService.getDataToSaveInCookie(res.responseBody(), 'token');
  const response = NextResponse.json(body, { status: res.status });
  if (value) {
    response.cookies.set({
      name: 'token',
      value,
      httpOnly: true,
      secure: true,
    });
  }
  return response;
}
