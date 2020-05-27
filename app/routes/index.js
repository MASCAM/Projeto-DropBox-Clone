var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });

});

router.get('/file', (req, res) => {

  let path = './' + req.query.path; //achando o cmainho do arquivo a ser aberto
  if (fs.existsSync(path)) {

    fs.readFile(path, (err, data) => { //lendo o arquivo efetivamente no caminho escolhido

      if (err) {

        console.error(err);
        res.status(400).json({

          error: err,

        });

      } else {

        res.status(200).end(data);

      }

    });

  } else {

    res.status(404).json({

      error: 'File not found.'

    });

  }

});

router.delete('/file', (req, res) => {

  let form = new formidable.IncomingForm({ //configurando o formuláro que será enviado

    uploadDir: './upload',
    keepExtensions: true,

  }); 
  form.parse(req, (err, fields, files) => {

    let path = "./" + fields.path;
    if (fs.existsSync(path)) { //se o arquivo existe remove o arquivo do diretório no computador

      fs.unlink(path, err => {

        if (err) {

          res.status(400).json({

            err,

          }); //devolve o json com status de erro da resposta

        } else { 
          
          res.status(404).json({ //caso não ache o arquivo retorna um erro

            error: 'File not found.',
    
          });

        }

      });

    }

  });

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
