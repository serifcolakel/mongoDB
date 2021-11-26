const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    author: {
      type: authorSchema,
      required: true,
    },
  })
);

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  // const course = await Course.findById(courseId);

  // Direkt olarak güncellemek için aşağıdaki gibi yazılır ve 48-49. satırlara gerek yok.
  const course = await Course.update(
    { _id: courseId },
    {
      $set: {
        "author.name": "Rasit COLAKEL",
      },
      // $unset: { author: "" }, // ile ise gömülen döküman silinebilir.
    }
  );
  // course.author.name = "Serif COLAKEL";
  // course.save();
}
// createCourse("Node Course", new Author({ name: "Serif" }));

updateAuthor("61a084ef661b552da444b7ea");
