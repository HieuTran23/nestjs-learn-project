import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Type,
  mixin,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/role.decorator";
import JwtAuthenticationGuard from "./jwt-authentication.guard";
import RequestWithUser from "../interface/requestWithUser.interface";
import { Role } from "../../user/enum/role.enum";

// @Injectable()
// export class RolesGuard implements CanActivate {
//     constructor(private reflector: Reflector) {}

//     canActivate(context: ExecutionContext): boolean {
//         const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
//             context.getHandler(),
//             context.getClass()
//         ])

//         if(!requiredRoles) {
//             return true
//         }

//         const {user} = context.switchToHttp().getRequest();
//         return requiredRoles.some((role) => user.roles?.includes(role))
//     }
// }

const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthenticationGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;

      return user?.roles.includes(role);
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
