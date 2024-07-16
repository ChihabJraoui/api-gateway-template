import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	machRoles(roles: string[], userRole: string) {
		return roles.some((role) => role === userRole);
	}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const roles = this.reflector.get<string[]>("roles", context.getHandler());
		if (!roles) {
			return true;
		}
		const req = context.switchToHttp().getRequest();
		const user = req.user;
		return this.machRoles(roles, user.role);
	}
}
