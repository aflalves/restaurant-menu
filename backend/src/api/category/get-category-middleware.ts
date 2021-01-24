import { NextFunction, Request } from 'express'
import Category from '../../models/category'

/**
 * Adds the category to the request (if exists)
 */
export async function getCategoryMW(req: Request, res: any, next: NextFunction) {
  let category
  try {
    category = await Category.findById(req.params.id)
    if (category === null) {
      return res.status(404).json({ message: 'Cannot find Category' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.category = category
  next()
}
