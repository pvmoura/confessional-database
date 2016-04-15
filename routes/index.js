var express = require('express');
var router = express.Router();
var csv = require('ya-csv'),  
    fs = require('fs');

var questions = [];
var deletedquestions = [];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pop-Up Confessional' });
});

router.get('/editTags', function(req, res, next) {
	var text = [];
	var tags = [];
	var reader = csv.createCsvFileReader('public/tags.csv');
	console.log(reader.parsingStatus);
	reader.addListener('data', function(data) {
		tags.push(data);
	});

});

router.get('/viewTags', function(req, res, next) {
	var questions = [];
	var reader = csv.createCsvFileReader('public/questions.csv');
	console.log(reader.parsingStatus);
	reader.addListener('data', function(data) {
		questions.push(data);
	});

	reader.on('end', function (data) {
		var tags = [], tag;
		for (var i = 1; i < questions.length; i++) {
			for (var j = 5; j < 8; j++) {
				tag = questions[i][j];
				if (tag && tags.indexOf(tag) === -1)
					tags.push(tag);
			}
		}
		res.render('allTags', { tags: tags });
	});
});

router.get('/editTag/:tag', function(req,res,next) {
	res.render('editTag', {tag: req.params.tag, title: "Edit Tag"});
});

router.post('/editTag/:tag', function(req, res, next) {
	var reader = csv.createCsvFileReader('public/questions.csv');
	console.log(reader.parsingStatus);
	reader.addListener('data', function(data) {
		questions.push(data);
	});
	reader.on('end', function (data) {
		var tags = [];
		var writer = csv.createCsvStreamWriter(fs.createWriteStream('public/questions.csv'));
		for (var i = 0; i < questions.length; i++) {
			
			for (var j = 5; j < 8; j++) {
				if (req.params.tag === questions[i][j]) {
					questions[i][j] = req.body.formTag;
				}
			}
			writer.writeRecord(questions[i]);
		}
		// res.send(questions[i-1].join('<br />'));
		// res.redirect('/grid');
		res.send(questions.map(function(elem) {
			return elem.join(' ');
		}).join('<br />'));
	});
});

router.get('/deleteTag/:tag', function(req, res, next) {
	var questions = [];
	var reader = csv.createCsvFileReader('public/questions.csv');
	console.log(reader.parsingStatus);
	reader.addListener('data', function(data) {
		questions.push(data);
	});

	reader.on('end', function (data) {
		var tags = [];
		var writer = csv.createCsvStreamWriter(fs.createWriteStream('public/questions.csv'));
		for (var i = 0; i < questions.length; i++) {
			for (var j = 5; j < 8; j++) {
				if (req.params.tag === questions[i][j]) {
					questions[i][j] = '';
				}
			}
			writer.writeRecord(questions[i]);
		}
		// res.send(questions[i-1].join('<br />'));
		// res.redirect('/grid');
		res.send(questions.map(function(elem) {
			return elem.join(' ');
		}).join('<br />'));
	});
});



router.get('/edit', function(req, res, next) {
	var text = [];
	questions = [];
	var reader = csv.createCsvFileReader('public/questions.csv');
	console.log(reader.parsingStatus);
	reader.addListener('data', function(data) {
		questions.push(data);
	});

	reader.addListener('end', function() {
		var tags = [''], tag;
		for (var i = 1; i < questions.length; i++) {
			for (var j = 5; j < 8; j++) {
				tag = questions[i][j];
				if (tag && tags.indexOf(tag) === -1)
					tags.push(tag);
			}
		};
		//res.send(tags.join('<br />'));
		console.log(tags);
		// var tags = ['', 'staller', 'followup', 'escapehatch', 'booth1', 'booth2', 'booth3', 'notfirst', 'belief', 'childhood', 'hurt', 'love', 'secret', 'sex', 'worry', 'wrong', 'warmup', 'gettingwarmer', 'aboutyou'];
		for (var i = 1; i < questions.length; i++) {
			text.push(questions[i][1]);
		}
		text.sort();
		res.render('edit', { title: 'Edit Question', tags:tags, text:text, questions:questions });
	});
	// console.log(questions);
});

router.post('/edit', function(req, res, next) {
	console.log(questions.length);
	var chosenQuestion = (req.body.oldText);
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
  deletedquestions = [];

  var reader = csv.createCsvFileReader('public/deleted-questions.csv');
	console.log(reader.parsingStatus);
	reader.addListener('data', function(data) {
		deletedquestions.push(data);
  });

  reader.addListener('end', function() {
		var tags = [], tag;
	for (var i = 1; i < questions.length; i++) {
		for (var j = 5; j < 8; j++) {
			tag = questions[i][j];
			if (tag && tags.indexOf(tag) === -1)
				tags.push(tag);
		}
	};
	  // var tags = ['', 'staller', 'followup', 'escapehatch', 'booth1', 'booth2', 'booth3', 'notfirst', 'belief', 'childhood', 'hurt', 'love', 'secret', 'sex', 'worry', 'wrong', 'warmup', 'gettingwarmer', 'aboutyou'];
	  var types = ['', 'hardfollow', 'length', 'yesno'];
	  res.render('add', { title: 'Add Question', tags:tags, types:types, questions:deletedquestions });
	});
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
	var dwriter = csv.createCsvStreamWriter(fs.createWriteStream('public/deleted-questions.csv'));
	writer.writeRecord(toSave);

	for (var i = 0; i < deletedquestions.length; i++) {
		if (toSave[0] === deletedquestions[i][0]) {
			deletedquestions.splice(i, 1);
		}
		console.log(deletedquestions[i]);
		dwriter.writeRecord(deletedquestions[i]);
	}
	res.redirect('/');
});

router.get('/delete', function(req, res, next) {
	var text = [];
	var tags = [];
	questions = [];
	deletedQuestions = [];
	var reader = csv.createCsvFileReader('public/questions.csv');
	var dreader = csv.createCsvFileReader('public/deleted-questions.csv');

	console.log(reader.parsingStatus);
	reader.addListener('data', function(data) {
		questions.push(data);
	});

	console.log(dreader.parsingStatus);
	dreader.addListener('data', function(data) {
		deletedQuestions.push(data);
	});

	reader.addListener('end', function() {
		console.log("printed");
		var tags = ['', 'staller', 'followup', 'escapehatch', 'booth1', 'booth2', 'booth3', 'notfirst', 'belief', 'childhood', 'hurt', 'love', 'secret', 'sex', 'worry', 'wrong', 'warmup', 'gettingwarmer', 'aboutyou'];
		for (var i = 1; i < questions.length; i++) {
			text.push(questions[i][1]);
		}
		text.sort();
		res.render('delete', { title: 'Delete Question', tags:tags, text:text, questions:questions });
	});
	// console.log(questions);
});

router.post('/delete', function(req, res, next) {
	console.log(questions.length);
	var toDelete = (req.body.chosenQuestion);

	console.log(toDelete);

	// var reader = csv.createCsvFileReader('public/test.csv');
	var deleted = csv.createCsvStreamWriter(fs.createWriteStream('public/deleted-questions.csv'));
	var writer = csv.createCsvStreamWriter(fs.createWriteStream('public/questions.csv'));

	for (var i = 0; i < questions.length; i++) {
		var oldQuestion = questions[i][1];

		if (oldQuestion === toDelete) {
			console.log(questions[i]);
			deletedQuestions.push(questions[i]);
			questions.splice(i, 1);
			console.log("question deleted");
		} 
	}

	console.log("number of questions: " + questions.length);

	for (var i = 0; i < questions.length; i++) {
		writer.writeRecord(questions[i]);
	}

	for (var i = 0; i < deletedQuestions.length; i++) {
		deleted.writeRecord(deletedQuestions[i]);
	}
	

	res.redirect('/');

});

router.get('/grid', function(req, res, next) {
	questions = [];
	var header = ["", ""];
	var reader = csv.createCsvFileReader('public/questions.csv');
	console.log(reader.parsingStatus);
	reader.addListener('data', function(data) {
		questions.push(data);
	});

	reader.addListener('end', function() {
		for (var i = 0; i < questions[0].length; i++) {
			header.push(questions[0][i]);
		}
		questions.splice(0, 1);
		console.log(questions.length);
		console.log("printed");
		res.render('grid', { title: 'Question Grid', questions:questions, header:header });
	});
	// console.log(questions);
});

router.get('/oldquestions', function(req, res, next) {
	deletedquestions = [];
	var header = [""];
	var reader = csv.createCsvFileReader('public/deleted-questions.csv');
	console.log(reader.parsingStatus);
	reader.addListener('data', function(data) {
		deletedquestions.push(data);
	});

	reader.addListener('end', function() {
		for (var i = 0; i < deletedquestions[0].length; i++) {
			header.push(deletedquestions[0][i]);
		}
		deletedquestions.splice(0, 1);
		console.log(deletedquestions.length);
		console.log("printed");
		res.render('oldquestions', { title: 'Deleted Questions', questions:deletedquestions, header:header });
	});
	// console.log(questions);
});

module.exports = router;
