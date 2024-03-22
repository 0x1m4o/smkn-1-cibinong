import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Authenticators } from '@adonisjs/auth/types'

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AuthMiddleware {
  /**
   * The URL to redirect to, when authentication fails
   */
  redirectTo = '/login'

  async handle(
    { request, response, auth }: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
    } = {}
  ) {

    if (auth.isAuthenticated) {
      // User is already authenticated, proceed to the next middleware or route handler
      return next()
    }

    // Try to authenticate the user using the specified guards
    try {
      await request.ctx?.auth.authenticateUsing(options.guards)
      return next()
    } catch (error) {
      return response.unauthorized({ message: 'Authentication failed. Please log in.' })
    }
  }
}
