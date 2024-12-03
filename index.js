const express = require("express");
const app = express();
const multer = require('multer');
const path = require('path');
const mysql = require('mysql2');
const db = require('./data/mysqldbContext');
require("dotenv").config();
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
const fs = require('fs');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const cookieParser = require('cookie-parser');
app.use(userRoutes);
app.use(authRoutes);
app.use(cookieParser());

// LINQ tarzı sorgu
(async () => {
    // Veri ekleme
    // await knex('products').insert({ name: 'iphone 15', image_url: 'deneme.jpeg', price: 39000 , isHome: true, isActive: true  });

    // Veri çekme
    const products = await db('products')
//  eğer iki obje geliyorsa veritabanından const [product,]=db('products') şeklinde alirsak ilk objeyi vermış oluruz
    console.log(products);

   
})();

// let connection= mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"kadir123",
//     database:"nodefb"
// });

// connection.connect((err)=>{
//     if(err){
//         console.log(err)
//     }
//     connection.query("select *from products",(err,result)=>{
//         console.log(result);
//     });
//     console.log("Connection is succesfull.")
// })

const uploadFolder = './uploads';
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder); // Dosyayı 'uploads' klasörüne kaydediyoruz
    },
    filename: (req, file, cb) => {
        // Dosya adını benzersiz yapmak için zaman damgası ekliyoruz
        cb(null, Date.now() + path.extname(file.originalname)); // orijinal dosya uzantısını kullanıyoruz
    }
});

// Multer middleware'ini kullanıyoruz
const upload = multer({ storage: storage });

// Post isteğiyle gelen dosyayı almak
app.post('/upload', upload.single('image'), (req, res) => {
    // Eğer resim başarılı bir şekilde yüklendiyse
    if (req.file) {
        res.send({
            success: true,
            message: 'Resim başarıyla yüklendi!',
            file: req.file
        });
    } else {
        res.send({
            success: false,
            message: 'Resim yüklenemedi.'
        });
    }
});

app.listen(process.env.PORT, () => {
    console.log("Server is running on port 4000");
});







const knex = require("./data/mysqldbContext");







  // Start server
//   app.listen(port, () => {
//     console.log(`Auth service running on http://localhost:${port}`);
//   });











