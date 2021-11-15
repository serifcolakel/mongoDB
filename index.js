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
  // Logical operators
  // or
  // and
  // nor

  const orLogicalOperator = await Course.find().or([
    { author: "Serif" },
    { isPublished: true },
  ]); // or ile find'ı geçtik ve içerisine girilen nesnelere göre sorgu yapılır ve herhangi biri nesne ile eşleşen değer/değerler getirilir.
  const andLogicalOperator = await Course.find().and([
    { author: "Serif" },
    { isPublished: true },
  ]); // and ile find'ı geçtik ve içerisine girilen nesnelere göre sorgu yapılır ve tüm nesneler ile eşleşen değerler getirilir.

  const courses = await Course.find({
    author: "Serif",
    name: "NodeJs",
    isPublished: true,
  })
    .limit(10) //
    .sort({ name: 1 }) // 1 olursa name'e göre artan sıralama, -1 olursa name'e göre  azalan sıralama
    .select({ name: 2, tags: 1 }); //
  console.log(courses);
}

getCourses();
