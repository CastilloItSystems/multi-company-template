import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorador para obtener el usuario autenticado desde el request
 * Uso: @GetUser() user: User
 */
export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
