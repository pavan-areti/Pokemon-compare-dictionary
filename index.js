const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
})
router.get('/compare',function(req,res){
  res.sendFile(path.join(__dirname+'/compare.html'));
});
app.use('/', router);
app.use(express.static('public'))

app.listen(process.env.PORT || 3000)
