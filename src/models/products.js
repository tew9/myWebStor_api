const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {type: String, required: true, trim: true},
  slug: {type: String, required: true, unique: true},
  price: {type: Number, required: true},
  description: {type: String, required: true, trim: true, max: 5000},
  offers: {type: Number},
  quantity: {type: Number, required:true},
  productPictures: [{img: {type: String}}],
  review: [
    {
      userId: {type: mongoose.Schema.Types.ObjectId,ref: 'User'},
      review: String
    }
  ],
  createdBy: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true}],
  updateAt: Date,
  category: [{type: mongoose.Schema.Types.ObjectId, ref:'Categories', require: true}]
}, {timestamps: true});

module.exports = mongoose.model('Products', productSchema);