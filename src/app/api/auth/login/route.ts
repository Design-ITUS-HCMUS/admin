import { NextRequest, NextResponse } from 'next/server';
import UserService from '@/services/userService';

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
 *               username:
 *                 type: string
 *                 example: Design_ITUS
 *               password:
 *                  type: string
 *                  example: 12345678
 *     responses:
 *       200:
 *         description: Login successfully.The token is returned in a cookie named `Token`. You need to include this cookie in subsequent requests.
 *         headers:
 *            Set-cookie:
 *              schema:
 *                type:string
 *                example:"Token=NgI7w2gw28_RtBhyWUErNwQY; Path=/; Secure; HttpOnly"
 *       400:
 *         description: Missing username or password.
 *       403:
 *         description: Invalid password.
 *       404:
 *         description: Not found username.
 *       500:
 *         description: Error message.
 */

export async function POST(req: NextRequest) {
    const data = await req.json();
    const res = await UserService.login(data);
    const { data: { token }, ...dataWithoutToken } = res.responseBody();
    const response = NextResponse.json(dataWithoutToken, { status: res.status });
    if (token) {
      response.cookies.set({
        name: 'token',
        value: token,
      });
    }
    return response;
}