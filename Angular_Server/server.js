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
    res.json(data.modules);
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

app.get('/questionlist', (req, res) => {
  res.json(data.questionlist);
});

app.get('/grouplist', (req, res) => {
  res.json(data.grouplist);
});


app.put('/questionlist/:id', (req, res) => {
  
  const questionId = req.params.id;
  const question = req.body;


  // Find the question with the given ID in your data
  const questionToUpdate = data.questionlist.find(question => question.id === questionId);

  if (!questionToUpdate) {
      return res.status(404).json({ error: "Question not found" });
  }

  // Update the status of the question
  questionToUpdate.status = question.newStatus;

  // Assuming you want to send the updated question as the response
  res.json(questionToUpdate);
});

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})