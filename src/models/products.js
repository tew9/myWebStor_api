const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {type: String, required: true, trim: true},
  slug: {type: String, required: true, unique: true},
  price: {type: Number, required: true},
  description: {type: String, required: true, trim: true, max: 5000},
  offers: {type: Number},
  seller: {type: String},
  productPictures: [{img: {type: string}}],
  review: [
    {
      userId: {type: mongoose.Schema.Types.ObjectId,ref: 'User'},
      review: string
    }
  ],
  createdBy: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  updateAt: Date,
  Category: [{type: mongoose.Schema.Types.ObjectId, ref:'Categories'}]
}, {timestamps: true});

module.exports = mongoose.model('Products', productSchema);