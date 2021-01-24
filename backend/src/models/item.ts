import mongoose, { Schema } from 'mongoose'

const itemSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  description: {
    required: false,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
  image:{
    required: false,
    type: String,
  },
})

const Item = mongoose.model('Item', itemSchema)
export default Item
