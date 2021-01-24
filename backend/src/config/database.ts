const USER_NAME = 'admin'
const PASSWORD = 'admin'
const DB_NAME = 'restaurant-menu'

export const MONGODB_URI = `mongodb+srv://admin:${PASSWORD}@cluster0.pjocy.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

export const PORT = process.env.PORT || 8080
