import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "./service/authService/JwtToken";
import { UserRole } from "./models/userModels/UserModel";
import { JwtPayload } from "./shared/JwtPayload";
import { RolePermission } from "./shared/RoutePermission"

export default async function userAuthentication(req: NextRequest) {
  try {
    const pathname = req.nextUrl.pathname;
    const method = req.method;
    const header = req.headers.get("Authorization");

    if (!header) {
      return NextResponse.json({ error: "Authorization header is missing" }, { status: 401 });
    }

    const token = header.slice(7); 
    if (!token) {
      return NextResponse.json({ error: "Token missing in request" }, { status: 401 });
    }

    const { payload } = await verifyJwt(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    const userPayload: JwtPayload = payload.payload as JwtPayload;
    const role: UserRole = userPayload.role;

    const methodRoles: Record<string, UserRole[]> = RolePermission[method];

    if (methodRoles && methodRoles[pathname]) {
      const allowedRoles = methodRoles[pathname];
      if (!allowedRoles.includes(role)) {
        return NextResponse.json({ error: "User does not have permission for this route" }, { status: 403 });
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error);
    return new NextResponse("Unauthorized", { status: 401 });
  }
}

export const config = {
  matcher: [
    "/api/player/:path*",
    "/api/team/:path*",
  ],
};
