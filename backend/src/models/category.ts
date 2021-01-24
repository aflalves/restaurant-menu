import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
})

const Category = mongoose.model('Category', categorySchema)
export default Category
