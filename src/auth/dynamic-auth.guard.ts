import { BadRequestException, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class DynamicAuthGuard extends AuthGuard() {
  private readonly allowedProviders = ['google'];

  getStrategyName(context: ExecutionContext): string {
    const request = context.switchToHttp().getRequest();
    const provider = request.params.provider;
    if (!this.allowedProviders.includes(provider)) {
      throw new Error(`Unsupported authentication provider: ${provider}`);
    }
    return provider;
  }

  canActivate(context: ExecutionContext) {
    // Dynamically set the strategy before calling the base implementation.
    (this as any).strategy = this.getStrategyName(context);
    return super.canActivate(context);
  }
}

