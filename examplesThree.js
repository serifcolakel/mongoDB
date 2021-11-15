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
// 15 dolar üstü kurslarının listelenmesi
const Course = mongoose.model("Course", courseShema);
async function getCourse() {
  return await Course.find({
    isPublished: true,
  })
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
    .sort({ price: -1 }) // sort('-name') ile aynı
    .select("name author price"); // .select('name author');
}
async function run() {
  const courses = await getCourse();
  console.log(courses);
}

run();
