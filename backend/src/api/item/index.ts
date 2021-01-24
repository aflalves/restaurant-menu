import { Router } from 'express'
import { isAuthorized } from '../auth-middleware'
import { getItem } from './get-item.middleware'
import { addItem, deleteItem, getItems, updateItem } from './item.controller'

export const itemRouter = Router()

itemRouter.get('/', getItems)
itemRouter.post('/', isAuthorized, addItem)
itemRouter.delete('/:id', isAuthorized, getItem, deleteItem)
itemRouter.put('/:id', isAuthorized, getItem, updateItem)
