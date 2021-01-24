import { Router } from 'express'
import { addItem, deleteItem, findItem, getItemMW, updateItem } from './item.controller'

export const itemRouter = Router()

itemRouter.get('/', findItem)
itemRouter.post('/', addItem)
itemRouter.delete('/:id', getItemMW, deleteItem)
itemRouter.put('/:id', getItemMW, updateItem)
