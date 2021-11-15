const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", { useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// Schema Types : String, Number, Date, Buffer, Boolean, Mixed, Objectid, Array
const coursesSchema = new mongoose.Schema({
  name: String,
  author: String, // türü string
  tags: [String], // Array of strings
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

// Course sınıfı içinde NodeJs objesi oluşturacaz model ile
const Course = mongoose.model("Course", coursesSchema);

async function createCourse() {
  const course = new Course({
    name: "ReactJS Course",
    author: "Serif",
    tags: ["react", "front-end"],
    date: new Date(),
    isPublished: true,
  });
  const result = await course.save();
  console.log(result);
}

// createCourse();

//Query Methods : find, findOne, findById, findOneAndUpdate, findByIdAndUpdate, findOneAndRemove, findByIdAndRemove
async function getCourses() {
  const courses = await Course.find({
    author: "Serif",
    name: "NodeJs",
    isPublished: true,
  })
    .limit(10) // limiti 10 olarak ayarladık
    .sort({ name: 1 }) // 1 olursa name'e göre artan sıralama, -1 olursa name'e göre  azalan sıralama
    .count(); // count methodu ile filtreleme ile eşleşen verilerin sayısını döndürür
  console.log(courses);
}

getCourses();
