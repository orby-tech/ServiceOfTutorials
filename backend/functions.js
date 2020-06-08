
var MongoClient = require('mongodb').MongoClient;
var urldb = "mongodb://localhost:27017/";


module.exports.getCatalog = function (leng) {
  return new Promise ((resolve, reject) =>
    {
      let collection = "allcatalog"
      if (leng === "en"){
        collection = "allcatalogEN"
      }
      console.log(collection)
      MongoClient.connect(urldb)
        .then((db) => db.db("tutorialsdb"))
        .then((dbo) => dbo.collection(collection).find({name: "name"}).toArray())        
        .then((result) => {console.log(result); resolve(result[0].catalog)})
        .catch((err) => { console.log(err, "err")})
    }
  )
}

module.exports.getArticle = function(leng, id){
  return new Promise ((resolve, reject) =>{
    let collection = "tutorials"
    if (leng === "en"){
      collection = "tutorialsEN"
    }
    MongoClient.connect(urldb)
      .then((db) => db.db("tutorialsdb"))
      .then((dbo) => dbo.collection(collection).find({id: id}).toArray())
      .then((result_article) => resolve(result_article))
      .catch((err) => { console.log(err, "err")})
  })
}

module.exports.updateCatalog = function(arr, leng) {
  return new Promise ((resolve, reject) => {
    let collection = "allcatalog"
      if (leng === "en"){
        collection = "allcatalogEN"
      }
    MongoClient.connect(urldb)
    .then((db) => db.db("tutorialsdb"))
    .then((dbo) => {
      dbo.collection(collection).updateOne(
        {name: "name"}, { $set:{catalog: arr}});
      })
    .catch((err) => { console.log(err, "err")})
    .then((result) => resolve(result))
  })
}

module.exports.deleteComment = function (comment) {
  return new Promise ((resolve,reject) => {
    MongoClient.connect(urldb)
    .then((db) => db.db("tutorialsdb"))
    .then((dbo) => dbo.collection("comments").deleteOne({id: comment.id, date: comment.date}))
    .catch((err) => { console.log(err, "err")})
    .then((result) => {
      resolve(result)
    })
  })
}

module.exports.getComments = function (id) {
  return new Promise ((resolve,reject) => {
    MongoClient.connect(urldb)
          .then((db) => db.db("tutorialsdb"))
          .then((dbo) => dbo.collection("comments").find({id: id}, {projection:{_id:0}}).toArray())
          .catch((err) => { console.log(err, "err")})
          .then((result) => { resolve(result) })
  })
}

module.exports.pushComment = function (body) {
  return new Promise ((resolve, reject) =>{
    let arr = ({
      id: body.articleId,
      header: body.header,
      text: body.text,
      author: body.name,
      date: Date.now()
    })
    MongoClient.connect(urldb)
    .then((db) => db.db("tutorialsdb"))
    .then((dbo) => dbo.collection("comments").insertOne(arr))
    .catch((err) => { console.log(err, "err")})
    .then((result) => { resolve(result) })
  })
}

module.exports.pushRedactionArticle = function (body) {
  return new Promise ((resolve, reject) => {
    let arr = ({
      id: body.id,
      article: body.article
    })
    MongoClient.connect(urldb)
    .then((db) => db.db("tutorialsdb"))
    .then((dbo) => dbo.collection("redactions").insertOne(arr))
    .catch((err) => { console.log(err, "err")})
    .then((result) => resolve(result))
  })
}

module.exports.noDisplayNewArticle = function ( result, id ) {
  for (let i=0; i<result[0].catalog.length; i++){
    if(result[0].catalog[i][0] === req.body.id[1]){
      for (let j=1; j<result[0].catalog[i].length; j++){   
        if(result[0].catalog[i][j][0] === req.body.id[2]){
          for (let k=0; k<result[0].catalog[i][j][1].length; k++){   
            if(result[0].catalog[i][j][1][k][1] && result[0].catalog[i][j][1][k][1].toString() === req.body.id[0][1].toString()){
              result[0].catalog[i][j][1][k][2] = "noDisplay" 
              return result
              break;
            }
          }
        }
      }
    }
  }
}

module.exports.goodArticleMood = function(result, id) {
  for (let i=0; i<result.length; i++){
    if(result[i][0] === id[1]){
      for (let j=1; j<result[i].length; j++){   
        if(result[i][j][0] === id[2]){
          for (let k=0; k<result[i][j][1].length; k++){   
            if(result[i][j][1][k][1] 
              && result[i][j][1][k][1].toString() === id[0][1].toString()){
              result[i][j][1][k][2] = "mod" 
            }
          }
        }
      }
    }
  }
}


module.exports.countPPInAllCatalog = function ( result, id ) {
  let arr = result
  for (let i=0; i<result.length; i++){              
    for (let j=1; j<result[i].length; j++){                     
      for (let k=0; k<result[i][j][1].length; k++){
        if(result[i][j][1][k][1] === id){
          arr[i][j][1][k][3]++
        }
      }                  
    }            
  }
  return arr
}

module.exports.checkNewType = function (result, type, newValue){
  let arr = result
  if(type === -1){
    arr.push([newValue])
    
  } else  {
    for ( let i = 0; i < arr.length; i++ ){
      if ( arr[i][0] === type ){
        arr[i].push( [ newValue, [] ] )
        break;
      }
    }
  }
  return arr
}


module.exports.pushNewArticle = function ( result, type, under_type, tutorial ) {
  for (let i=0; i<result.length; i++){
    if(result[i][0] === type){
      for (let j=1; j<result[i].length; j++){   
        if(result[i][j][0] === under_type){
          result[i][j][1].push([tutorial.article[0][0], id, "unmod", 1])
          return result
        }
      }
    }
  }
}