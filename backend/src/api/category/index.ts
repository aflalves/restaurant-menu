import { Router } from 'express'
import { isAuthorized } from '../auth-middleware'
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from './category.controller'
import { getCategoryMW } from './get-category-middleware'

export const categoryRouter = Router()

categoryRouter.get('/', getCategories)

categoryRouter.post('/', isAuthorized, addCategory)
categoryRouter.delete('/:id', isAuthorized, getCategoryMW, deleteCategory)
categoryRouter.put('/:id', isAuthorized, getCategoryMW, updateCategory)
