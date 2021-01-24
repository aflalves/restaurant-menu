import { NextFunction, Request } from 'express'
import Item from '../../models/item'

/**
 * Adds the item to the request (if exists)
 */
export async function getItem(req: Request, res: any, next: NextFunction) {
  let item
  try {
    item = await Item.findById(req.params.id)
    if (item === null) {
      return res.status(404).json({ message: 'Cannot find Item' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.item = item
  next()
}
