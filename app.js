const path = require(`path`);
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth');
const expressLayouts = require('express-ejs-layouts');
const PORT = 3000;

const route = require(`./routes/productRoutes`);
const bcrypt = require('bcrypt');
dotenv.config();
const app = express();

app.use(cors());
app.use(cookieParser());

// import những thứ đã xuất ra từ /routes/index.js
// const route = require('./routes');

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

//tro toi file css
app.use(express.static(path.join(__dirname, `public`)));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

//template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

//epress-ejs-layout
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// //dòng code là bao gồm tất cả routes của các trang (ctrl+click vô chữ route để dẫn tới /routes/index.js)
// route(app);
app.use(route)

//trang home
app.get(`/`, route);

//Route
app.use("v1/auth", authRoute);

//contact
app.get(`/contact`, route);

//trang phan loai
app.get(`/products`, route);
  //trang beans
  app.get(`/products/beans`, route);
    // trang cua tung san pham
    app.get(`/products/beans/aromacraft`, route);
    app.get(`/products/beans/bitbrew`, route);
    app.get(`/products/beans/casa`, route);
    app.get(`/products/beans/koko`, route);
    app.get(`/products/beans/navybrew`, route);
    app.get(`/products/beans/zenbean`, route);
  //trang capsules
  app.get(`/products/capsules`, route);
    //trang tung san pham
    app.get(`/products/capsules/espresso`, route);
    app.get(`/products/capsules/buno`, route);
    app.get(`/products/capsules/heartblend`, route);
    app.get(`/products/capsules/cosmo`, route);
    app.get(`/products/capsules/pike`, route);
    app.get(`/products/capsules/velvet`, route);
  //trang grounds
  app.get(`/products/grounds`, route);
    //trang tung san pham
    app.get(`/products/grounds/aromacraft-g`, route);
    app.get(`/products/grounds/bitbrew-g`, route);
    app.get(`/products/grounds/casa-g`, route);
    app.get(`/products/grounds/koko-g`, route);
    app.get(`/products/grounds/navybrew-g`, route);
    app.get(`/products/grounds/zenbean-g`, route);
app.get(`/profile`, route);
app.get(`/cart`, route);
app.get(`/brewguides`, route);
app.get(`/login`, route);
app.get(`/register`, route);

// Khởi chạy server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
