const mongoose = require("mongoose");


const collectionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    name: { type: String, require: true },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserBook' }],
    status: { type: Boolean, require: true }, // for private/public
  }
);

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    authors: { type: String, required: true },
    rating: { type: String }, // 2. Should this be Number or not matter?
    link: { type: String, required: true },
    asin: { type: String, required: true },
    // prices in the future
    // added new below
    category: { type: String, required: true },
    publisher: { type: String, required: true },
    date: { type: Date, required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }], 
    read: { type: Boolean, required: true },
  }
);

const reviewSchema = new mongoose.Schema(
  {
  review: { type: String, required: true },
});

const goalSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }, // 1. check if this coorect later
    //startDate: { type: Date, require: true },
    endDate: { type: Date, default: Date.now, require: true },
    target: { type: Number, require: true },
    current: { type: Number },
    completed: {type: Boolean, require: true},

  }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    //books: [bookSchema], // 3. within collections? 
    goals: [goalSchema],
    collections: [collectionSchema],
  },
  { collection: "Users" } // 4. ask
);

const Users = mongoose.model("Users", userSchema);
const Collection = mongoose.model("Collection", collectionSchema);
const UserBook = mongoose.model("UserBook", bookSchema);
const Review = mongoose.model("Review", reviewSchema);
//const Goal = mongoose.model("Goal", goalSchema);

// QUESITONS
// 5. is 'books: [bookSchema]' the same thing as 'books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserBooks' }]'

module.exports = Users, Collection, UserBook, Review; //Goal;
