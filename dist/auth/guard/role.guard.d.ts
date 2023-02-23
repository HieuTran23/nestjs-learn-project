import { CanActivate, Type } from "@nestjs/common";
import { Role } from "../../user/enum/role.enum";
declare const RoleGuard: (role: Role) => Type<CanActivate>;
export default RoleGuard;
