module.exports = app => {
  const mongoose = app.mongoose
  
  const RecipeSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    day: { type: String, unique: true, required: true },
    access: { type: String, required: false, default: 'user' },
    extra: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },
    heat: { type: String, default: '' },
    weight: { type: String, default: '' },
    url: { type: String, default: ''},
    content: { type: String, default: ''}

  })

  return mongoose.model('Recipe', RecipeSchema)
}