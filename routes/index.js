var express = require('express');
var router = express.Router();
var csv = require('ya-csv'),  
    fs = require('fs');

var questions = [];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pop-Up Confessional' });
});

router.get('/edit', function(req, res, next) {
	var text = [];
	var tags = [];
	questions = [];
	var reader = csv.createCsvFileReader('public/questions.csv');
	console.log(reader.parsingStatus);
	reader.addListener('data', function(data) {
		questions.push(data);
	});

	reader.addListener('end', function() {
		console.log("printed");
		var tags = ['', 'staller', 'followup', 'escapehatch', 'booth1', 'booth2', 'booth3', 'notfirst', 'belief', 'childhood', 'hurt', 'love', 'secret', 'sex', 'worry', 'wrong', 'warmup', 'gettingwarmer', 'aboutyou'];
		for (var i = 1; i < questions.length; i++) {
			text.push(questions[i][0]);
		}

		res.render('edit', { title: 'Edit Question', tags:tags, text:text, questions:questions });
	});
	// console.log(questions);
});

router.post('/edit', function(req, res, next) {
	console.log(questions.length);
	var chosenQuestion = (req.body.chosenQuestion);
	var newText = req.body.currentText.replace(/,/g, "");
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
	var keyword11 = req.body.keyword11;
	var keyword12 = req.body.keyword12;
	var keyword13 = req.body.keyword13;
	var keyword14 = req.body.keyword14;
	var keyword15 = req.body.keyword15;
	var keyword16 = req.body.keyword16;
	var keyword17 = req.body.keyword17;
	var keyword18 = req.body.keyword18;
	var keyword19 = req.body.keyword19;
	var keyword20 = req.body.keyword20;

	var toSave = [chosenQuestion, filename, futype, fufile1, fufile2, tag1, tag2, tag3, keyword1, keyword2, keyword3, keyword4, keyword5, keyword6, keyword7, keyword8, keyword9, keyword10, keyword11, keyword12, keyword13, keyword14, keyword15, keyword16, keyword17, keyword18, keyword19, keyword20];

	console.log(toSave);

	// var reader = csv.createCsvFileReader('public/test.csv');
	var writer = csv.createCsvStreamWriter(fs.createWriteStream('public/questions.csv'));

	for (var i = 0; i < questions.length; i++) {
		var oldQuestion = questions[i][0];

		if (oldQuestion === toSave[0]) {
			toSave[0] = newText;
			questions[i] = toSave;
			console.log("replaced!");
			console.log(questions[i]);
		}

		writer.writeRecord(questions[i]);
	}

	res.redirect('/');

});

router.get('/add', function(req, res, next) {
  var tags = ['', 'staller', 'followup', 'escapehatch', 'booth1', 'booth2', 'booth3', 'notfirst', 'belief', 'childhood', 'hurt', 'love', 'secret', 'sex', 'worry', 'wrong', 'warmup', 'gettingwarmer', 'aboutyou'];
  var types = ['', 'hardfollow', 'length', 'yesno'];
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
	var keyword11 = req.body.keyword11;
	var keyword12 = req.body.keyword12;
	var keyword13 = req.body.keyword13;
	var keyword14 = req.body.keyword14;
	var keyword15 = req.body.keyword15;
	var keyword16 = req.body.keyword16;
	var keyword17 = req.body.keyword17;
	var keyword18 = req.body.keyword18;
	var keyword19 = req.body.keyword19;
	var keyword20 = req.body.keyword20;

	var toSave = [questionText, filename, futype, fufile1, fufile2, tag1, tag2, tag3, keyword1, keyword2, keyword3, keyword4, keyword5, keyword6, keyword7, keyword8, keyword9, keyword10, keyword11, keyword12, keyword13, keyword14, keyword15, keyword16, keyword17, keyword18, keyword19, keyword20];

	console.log(toSave);
	var writer = csv.createCsvStreamWriter(fs.createWriteStream('public/questions.csv', {'flags': 'a'}));  
	writer.writeRecord(toSave);
	res.redirect('/');
});

module.exports = router;
