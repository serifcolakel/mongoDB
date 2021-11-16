const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", { useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// Schema Types : String, Number, Date, Buffer, Boolean, Mixed, Objectid, Array
const coursesSchema = new mongoose.Schema({
  name: {
    type: String, // türü string olmalı
    required: true, // gerekli
    minlength: 10, // name min 10 karakter olmalı
    maxlength: 20, // name max uzunlugu 20 olabilir
    // match: /pattern/i, // match formatında olmalı name
  }, // required: true, bu alanın girilmesi zorunlu olur
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"], // web, mobile, network olmalı yoska hata alırız
    lowercase: true, // girilen değeri direkt olarak küçük harfe çevirir
    trim: true, // boşlukları siler
  },
  author: String, // türü string
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function (v, callback) {
        setTimeout(() => {
          // Do some async work
          const result = v && v.length > 0;
          callback(result);
        }, 4000);
        // return v && v.length > 0; // callback olmadan
      },
      message: "A course should have at least one tag",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10, // price değerinin maximum alacağı değer
    max: 2000, // price değerinin minimum alacağı değer
    get: (v) => Math.round(v), // getter ile alınan değeri yuvarlar
    set: (v) => Math.round(v), // setter ile gönderilen değeri yuvarlar
  },
});

// Course sınıfı içinde NodeJs objesi oluşturacaz model ile
const Course = mongoose.model("Course", coursesSchema);

async function createCourse() {
  const course = new Course({
    name: "ReactJS Course",
    category: "Web    ",
    author: "Serif1",
    tags: ["frontend"],
    date: new Date(),
    price: 20,
    isPublished: true,
  });
  try {
    // Hataların tamamını ve path yollarını göstermek için kullanılabilir.
    // const isValid = await course.validate((err) => {
    //   console.log(err);
    // });
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    // console.log(ex.message); // tek bir hata için
    for (field in ex.errors) {
      console.log(ex.errors[field].message);
    }
  }
}
createCourse();

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

//getCourses();

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

//updateCourse("6192a5c018f4182360034729");

async function removeCourse(id) {
  // const result = await Course.deleteOne({ _id: id }); // ilkini bulup silecek
  // const result = await Course.deleteMany({ _id: id }); // birden fazla siler
  const course = await Course.findByIdAndRemove(id); // yada id'yi bulup silebiliriz
  console.log("remove State:", course);
}

// removeCourse("asd");
