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
      .limit(10) // limiti 10 olarak ayarladık
      .sort({ name: 1 }) // 1 olursa name'e göre artan sıralama, -1 olursa name'e göre  azalan sıralama
      .select({ name: 2, tags: 1 }); // sadece name ve tags alacak
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

### Logical Query Operators 
>* or (veya) : şartlardan birinin geçerli olması yeterli
>* and (ve) : şartlardan hepsinin geçerli olması gerekir 
```javascript 

 
  const orLogicalOperator = await Course.find().or([
    { author: "Serif" },
    { isPublished: true },
  ]); // or ile find'ı geçtik ve içerisine girilen nesnelere göre sorgu yapılır ve herhangi biri nesne ile eşleşen değer/değerler getirilir.
  const andLogicalOperator = await Course.find().and([
    { author: "Serif" },
    { isPublished: true },
  ]); // and ile find'ı geçtik ve içerisine girilen nesnelere göre sorgu yapılır ve tüm nesneler ile eşleşen değerler getirilir.

```

### Regular Expression
* Küçük Büyük harf duyarlılığı i ile belirlenir var ise duyarsızdır yoksa duyarlıdır.
```javascript
  const regularExpression = await Course.find({ author: /^Serif/ }); // Serif ile Baslayan Kursları Getir
  const regularExpression = await Course.find({ author: /Colakel$/ }); // Serif ile Biten Kursları Getir
  const regularExpression = await Course.find({ author: /Colakel$/i }); // i eklenirse kucuk/buyuk harfe karsı duyarsızlasır
  const regularExpression = await Course.find({ author: /.*Serif.*/i });// Serif içerenleri  getirir.
```  

### Counting (Sayma)
```javascript
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
```
### Pagination (Sayfalandırma)

* `Gerçekte sorgu böyle olmalı : https:/www.xxx.com/api/endpoint?pageNumber=2&pageSize=10`

```javascript
async function getCourses() {
  // Pagination
  const pageNumber = 2;
  const pageSize = 10;
  const courses = await Course.find({
    author: "Serif",
    name: "NodeJs",
    isPublished: true,
  })
    .skip((pageNumber - 1) * pageSize) // (pageNumber - 1) * pageSize ile berlirli sayfada veriler alınır
    .limit(pageSize) // limit pageSize
    .sort({ name: 1 }) 
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

getCourses();

```

### Updating a Document 
>* https://docs.mongodb.com/manual/reference/operator/update/
>* ilk olarak id'ye göre sorgu yapılır sonrasında düzenlenir ve save ile kaydedilir.  

* Ornek-1
```javascript

async function updateCourse(id) {
  // Approach 1 :
  // Query first
  // findById()
  // Modify its properties
  // save()
  const course = await Course.findById(id);
  if (!course) return;

  course.isPublished = true;
  course.author = "Another Author";
  //  yada
  //   course.set({
  //     isPublished: true,
  //     author: "Another Author",
  //   })
  const result = await course.save();
  console.log(result);
}

updateCourse("_id");

```
* Ornek-2
```javascript

async function updateCourse(id) {
  const result = await Course.update(
    { _id: id },
    {
      $set: {
        author: "SerifColakel",
        isPublished: false,
      },
    }
  );
  console.log(result);
}

updateCourse("_id");

```
* Ornek-3
```javascript

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

updateCourse("_id");

```

### Removing Documents

```javascript

async function removeCourse(id) {
  // const result = await Course.deleteOne({ _id: id }); // ilkini bulup silecek
  // const result = await Course.deleteMany({ _id: id }); // birden fazla siler
  const course = await Course.findByIdAndRemove(id); // yada id'yi bulup silebiliriz
  console.log("remove State:", course);
}

removeCourse("_id");

```

### Validate 

```javascript
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
  },
  author: String, // türü string
  tags: { // tags özellikleri belirlendi
    type: Array,
    validate: {
      validator: function (v) { // dizinin boş olması null olması durumları için geçerli olacak
        return v && v.length > 0;
      },
      message: "A course should have at least one tag",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    min: 10, // price değerinin maximum alacağı değer
    max: 2000, // price değerinin minimum alacağı değer
    required: function () {
      return this.isPublished;
    },
  },
});

// Course sınıfı içinde NodeJs objesi oluşturacaz model ile
const Course = mongoose.model("Course", coursesSchema);

async function createCourse() {
  const course = new Course({
    name: "ReactJS Course",
    category: "-",
    author: "Serif",
    tags: [],
    date: new Date(),
    isPublished: true,
  });
  try {
    const isValid = await course.validate((err) => {
      console.log(err);
    });
    // const result = await course.save();
    // console.log(result);
  } catch (ex) {
    console.log(ex.message);
  }
}
createCourse();

```