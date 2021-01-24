import { NextFunction, Request, Response } from 'express'
import Item from '../../models/item'

export const findItem = async (req: Request, res: Response) => {
  try {
    const users = await Item.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const addItem = async (req: Request, res: Response) => {
  const newItem = new Item(req.body)
  try {
    const item = await newItem.save()
    res.status(201).json(item)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export const deleteItem = async (req: any, res: any) => {
  try {
    await res.item.deleteOne()
    res.json({ message: 'Item deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export async function getItemMW(req: Request, res: any, next: NextFunction) {
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

export const updateItem = async (req: Request, res: any) => {
  try {
    await res.item.updateOne(req.body)
    res.json(req.body)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}
