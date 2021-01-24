import { NextFunction, Request, Response } from 'express'
import Category from '../../models/category'

export const findCategory = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find()
    res.json(categories)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const addCategory = async (req: Request, res: Response) => {
  const newCategory = new Category(req.body)
  try {
    const category = await newCategory.save()
    res.status(201).json(category)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export const updateCategory = async (req: Request, res: any) => {
  try {
    await res.category.updateOne(req.body)
    res.json(req.body)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export const deleteCategory = async (req: any, res: any) => {
  try {
    await res.category.deleteOne()
    res.json({ message: 'Category deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

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
  console.log('CAT', category)
  res.category = category
  next()
}