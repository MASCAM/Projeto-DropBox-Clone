var express = require('express');
var router = express.Router();
var formidable = require('formidable');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', (req, res) => {

  let form = new formidable.IncomingForm({ //configurando o formuláro que será enviado

    uploadDir: './upload',
    keepExtensions: true,

  }); 
  form.parse(req, (err, fields, files) => {

    res.json({ //passando os arquivos pra resposta

      files,

    });

  });
  

});

module.exports = router;
