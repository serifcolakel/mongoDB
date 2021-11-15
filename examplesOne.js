const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongo-exercises", {
  useUnifiedTopology: true,
});

const courseShema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseShema);
async function getCourse() {
  return await Course.find({ isPublished: true, tags: "backend" })
    .sort({ name: 1 }) // sort('-name') ile aynı
    .select({ name: 1, author: 1 }); // .select('name author');
}
async function run() {
  const courses = await getCourse();
  console.log(courses);
}

run();
