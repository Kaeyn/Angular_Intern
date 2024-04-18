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

// app.get('/questionlist', (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const pageSize = parseInt(req.query.pageSize) || 10;
//   const startIndex = (page - 1) * pageSize;
//   const endIndex = Math.min(startIndex + pageSize, Data.length);

//   const paginatedQuestions = data.questionlist.slice(startIndex, endIndex);
//   console.log(paginatedQuestions.length)
//   res.json(paginatedQuestions);
// });

app.get('/grouplist', (req, res) => {
  res.json(data.grouplist);
});

app.post('/questionlist/add', (req, res) => {
  const newQuestion = req.body;
  const lastQuestion = data.questionlist[data.questionlist.length - 1];
  
  const nextCode = lastQuestion ? lastQuestion.code + 1 : 1;
  newQuestion.code = nextCode;
  data.questionlist.push(newQuestion);
  console.log(newQuestion)
  // Respond with the added question
  res.json(newQuestion);
});

app.put('/questionlist/:code', (req, res) => {
  
  const questionCode = req.params.code;
  const question = req.body;

  // Find the question with the given ID in your data
  const questionToUpdate = data.questionlist.find(question => question.code == questionCode);

  console.log(questionToUpdate)
  if (!questionToUpdate) {
      return res.status(404).json({ error: "Question not found" });
  }

  
  questionToUpdate.id = question.id;
  questionToUpdate.group = question.group;
  questionToUpdate.stringques = question.stringques;
  questionToUpdate.timelimit = question.timelimit;
  questionToUpdate.type = question.type;
  questionToUpdate.scoring = question.scoring;
  questionToUpdate.status = question.status;
  res.json('success');
});

app.put('/questionlist/updatelist/:newStatus', (req, res) => {
  const newStatus = req.params.newStatus;
  const questions = req.body;
  // Find the question with the given ID in your data
  questions.forEach(question => {
    const questionToUpdate = data.questionlist.find(questiondb => questiondb.id === question.id);
    questionToUpdate.status = newStatus;
  });

  res.json('success');
});

app.delete('/questionlist/delete', (req, res) =>{
  const questionsToDelete = req.body
  const questionIdsToDelete = questionsToDelete.map(question => question.id);
  if(!questionsToDelete || questionsToDelete.length === 0){
    return res.status(400).json({ error: "Invalid or missing question" });
  }

  data.questionlist = data.questionlist.filter(question => !questionIdsToDelete.includes(question.id));
  res.json('success');
})

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})