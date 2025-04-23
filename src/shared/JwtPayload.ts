import { UserRole } from "@/models/userModels/UserModel";

export interface JwtPayload {
  userId: number;
  role: UserRole;
}
