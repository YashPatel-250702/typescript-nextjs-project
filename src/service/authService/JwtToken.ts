import { jwtVerify, SignJWT } from "jose";

const secret = new TextEncoder().encode(
    process.env.JWT_SECRET || "scret",
);
export async function generateToekn(
    payload: { userId: number; role: string },
): Promise<string> {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60 * 24 * 1;

    const token = new SignJWT({ payload })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt(iat)
        .setExpirationTime(exp)
        .sign(secret);

    return token;
}

export async function verifyJwt(token: string) {
    try {
        const payload = jwtVerify(token, secret);
        return payload;
    } catch (error) {
        throw new Error("Invalid token Or Token expired");
    }
}
