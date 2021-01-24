import { Router } from 'express'
import {
  addCategory,
  deleteCategory,
  findCategory,
  getCategoryMW,
  updateCategory,
} from './category.controller'

export const categoryRouter = Router()

categoryRouter.get('/', findCategory)
categoryRouter.post('/', addCategory)
categoryRouter.delete('/:id', getCategoryMW, deleteCategory)
categoryRouter.put('/:id', getCategoryMW, updateCategory)
