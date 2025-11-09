import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtservice: JwtService) {}

    canActivate(context: ExecutionContext): boolean {

        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException('トークンが存在しません');
        }
        
        try {
            const payload =  this.jwtservice.verify(token);
            request.user = payload;

            return true;

        } catch {
            return false;
        }       
    }
}