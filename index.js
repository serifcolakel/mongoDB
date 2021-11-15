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
  // Pagination
  const pageNumber = 2;
  const pageSize = 10;
  const courses = await Course.find({
    author: "Serif",
    name: "NodeJs",
    isPublished: true,
  })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 }) // 1 olursa name'e göre artan sıralama, -1 olursa name'e göre  azalan sıralama
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

getCourses();

async function updateCourse(id) {
  const course = await Course.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        author: "SerifColake55",
        isPublished: false,
      },
    },
    { new: true } // güncellenmiş belgeyi almak için kullanılır false olursa güncellenmemiş belgeyi alır
  );
  console.log(course);
}

updateCourse("6192a5c018f4182360034729");

async function removeCourse(id) {
  // const result = await Course.deleteOne({ _id: id }); // ilkini bulup silecek
  // const result = await Course.deleteMany({ _id: id }); // birden fazla siler
  const course = await Course.findByIdAndRemove(id); // yada id'yi bulup silebiliriz
  console.log("remove State:", course);
}

removeCourse("asd");
