var express = require('express');
var router = express.Router();
var csv = require('ya-csv'),  
    fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pop-Up Confessional' });
});

router.get('/edit', function(req, res, next) {
	var questions = [];
	var reader = csv.createCsvFileReader('questions.csv');
	console.log(reader.length);
	reader.addListener('data', function(data) {
    	questions.push(data[0]);
    	console.log(data[0]);
	});
	console.log("printed");
	res.render('edit', { title: 'Edit Question', questions:questions });
	// console.log(questions);
});

router.get('/add', function(req, res, next) {
  var tags = ['', 'followup', 'escapehatch', 'booth1', 'booth2', 'booth3', 'notfirst', 'belief', 'childhood', 'hurt', 'love', 'secret', 'sex', 'worry', 'wrong'];
  var types = ['', 'none', 'hardfollow', 'length', 'yesno'];
  res.render('add', { title: 'Add Question', tags:tags, types:types });
});

router.get('/add', function(req, res, next) {
  var tags = ['', 'belief', 'childhood', 'hurt', 'love', 'secret', 'sex', 'worry', 'wrong'];
  var types = ['none', 'hardfollow', 'length', 'yesno'];
  res.render('add', { title: 'Add Question', tags:tags, types:types });
});

router.post('/add', function(req, res, next) {
	var questionText = req.body.questionText.replace(/,/g, "");
	var filename = req.body.filename;
	var futype = req.body.followuptype;
	var fufile1 = req.body.fufile1;
	var fufile2 = req.body.fufile2;
	var tag1 = req.body.tag1;
	var tag2 = req.body.tag2;
	var tag3 = req.body.tag3;
	var keyword1 = req.body.keyword1;
	var keyword2 = req.body.keyword2;
	var keyword3 = req.body.keyword3;
	var keyword4 = req.body.keyword4;
	var keyword5 = req.body.keyword5;
	var keyword6 = req.body.keyword6;
	var keyword7 = req.body.keyword7;
	var keyword8 = req.body.keyword8;
	var keyword9 = req.body.keyword9;
	var keyword10 = req.body.keyword10;

	var toSave = [questionText, filename, futype, fufile1, fufile2, tag1, tag2, tag3, keyword1, keyword2, keyword3, keyword4, keyword5, keyword6, keyword7, keyword8, keyword9, keyword10];

	console.log(toSave);
	var writer = csv.createCsvStreamWriter(fs.createWriteStream('test.csv', {'flags': 'a'}));  
	writer.writeRecord(toSave);
	res.redirect('/');
});

module.exports = router;
