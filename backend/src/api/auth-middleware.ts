import { NextFunction, Request } from 'express'

/**
 * Checks if the mocked `customAuth` header is present
 */
export async function isAuthorized(req: Request, res: any, next: NextFunction) {
  if (req.header('customAuth') !== 'mocked-auth-token') {
    return res.status(403).json({ message: 'Unauthorized' })
  }

  next()
}
