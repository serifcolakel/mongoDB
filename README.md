# KURULAN PAKETLER 
* npm i mongoose 
# MongooDB'ye Baglanma 
```javascript 
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", { useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

```
### Shema Types 
>* String  
>* Number
>* Date
>* Buffer(ikilik taban için)
>* Boolean 
>* Array
>* ObjectID

### Shema Olusturma 
```javascript 

// Schema Types : String, Number, Date, Buffer, Boolean, Mixed, Objectid, Array
const coursesSchema = new mongoose.Schema({
  name: String,
  author: String, // türü string
  tags: [String], // Array of strings
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

```

### Model ile Database Veri Ekleme

```javascript
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

```

### Query( Sorgu )

* Query Methods : find, findOne, findById findOneAndUpdate, findByIdAndUpdate, findOneAndRemove, findByIdAndRemove metodları kullanılır.
```javascript

async function getCourses() {
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

```

### Karşılatırma Operatörleri
>* eq(equal)
>* ne(not equal)
>* gt(greater than)
>* gte(greater than or equal to)getPrice
>* lt(less than)
>* lte(less than or equal)
>* in
>* nin(not in),
>* all
>* size
>* regex
>* type

#### Examples 

```javascript
async function getPrice() {
const findGtPrice = await Course.find({ price: { $gt: 10 } }); // 10(dahil değil)'dan büyük fiyatları getir
  const findGtePrice = await Course.find({ price: { $gte: 10 } }); // 10(dahil)'dan büyük fiyatları getir
  const findLtPrice = await Course.find({ price: { $lt: 10 } }); // 10(dahil değil)'dan küçük fiyatları getir
  const findLtePrice = await Course.find({ price: { $lte: 10 } }); // 10(dahil)'dan küçük fiyatları getir
  const findInScalePrice = await Course.find({ price: { $gte: 10, $lte: 20 } }); // 10(dahil) ile 20(dahil) arasındaki fiyatları getir
  const findInScalePrice = await Course.find({ price: { $gt: 10, $lte: 20 } }); // 10(dahil değil) ile 20(dahil) arasındaki fiyatları getir
  const findInScalePrice = await Course.find({ price: { $gte: 10, $lt: 20 } }); // 10(dahil) ile 20(dahil değil) arasındaki fiyatları getir
  const findPrice = await Course.find({ price: 10 }); // sadece 10 olanı getirir
  const findMultpilePrice = await Course.find({price: {$in : [10, 15, 20]}}) // 10 15 20 olan price'ı getirecek

  }

getPrice();
```
