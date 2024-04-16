const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3200;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));
const data = require("./Data.json");

app.get('/modules', (req, res) => {
    res.json({status : "OK", message:"Get modules successful", data: data.modules});
});
  
  app.get('/categories', (req, res) => {
    const { modulePath } = req.query;
    if (modulePath) {
      const categories = data.categories.filter(category => category.modulePath === modulePath);
      res.json(categories);
    } else {
      res.json(data.categories);
    }
  });
  
  app.get('/subcategories', (req, res) => {
    const { categoryCode } = req.query;
    if (categoryCode) {
      const subcategories = data.questionlist.filter(subcategory => subcategory.categoryCode === parseInt(categoryCode));
      res.json(subcategories);
    } else {
      res.json(data.subcategories);
    }
  });

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})