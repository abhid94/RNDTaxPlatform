module.exports = function(app) {

  //for file upload
  var multer = require('multer');

  //to convert excel files to JSON
  var xlstojson = require("xls-to-json-lc");
  var xlsxtojson = require("xlsx-to-json-lc");

  //multers disk storage settings
  var storage = multer.diskStorage({ //multers disk storage settings
          destination: function (req, file, cb) {
              cb(null, './uploads/')
          },
          filename: function (req, file, cb) {
              var datetimestamp = Date.now();
              cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
          }
      });


  //multer settings
  var upload = multer({ //multer settings
                      storage: storage,
                      fileFilter : function(req, file, callback) { //file filter
                          if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
                              return callback(new Error('Wrong extension type'));
                          }
                          callback(null, true);
                      }
                  }).single('file');

      /** API path that will upload the files */
      app.post('/upload', function(req, res) {
          var exceltojson;
          upload(req,res,function(err){
              if(err){
                   res.json({error_code:1,err_desc:err});
                   return;
              }
              /** Multer gives us file info in req.file object */
              if(!req.file){
                  res.json({error_code:1,err_desc:"No file passed"});
                  return;
              }
              /** Check the extension of the incoming file and
               *  use the appropriate module
               */
              if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
                  exceltojson = xlsxtojson;
              } else {
                  exceltojson = xlstojson;
              }
              console.log(req.file.path);
              try {
                  exceltojson({
                      input: req.file.path,
                      output: null, //since we don't need output.json
                      lowerCaseHeaders:true
                  }, function(err,result){
                      if(err) {
                          return res.json({error_code:1,err_desc:err, data: null});
                      }
                      res.json({data: result});
                      console.log(result);
                  });
              } catch (e){
                  res.json({error_code:1,err_desc:"Corrupted excel file"});
              }
          })

      });


  // use res.render to load up an ejs view file
  // index page
  app.get('/', function(req, res) {
    //res.sendFile(__dirname + "/index.ejs");
    res.render('pages/index');
  });


};
