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

createCourse();
