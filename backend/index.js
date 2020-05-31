'use strict'

const Fastify = require('fastify')
var MongoClient = require('mongodb').MongoClient;
var urldb = "mongodb://185.20.225.204:27017/";



function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}



const noDisplayNewArticle = ( result, id ) => {
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

const countPPInAllCatalog = ( result, id ) => {
  let arr = result[0].catalog
  for (let i=0; i<result[0].catalog.length; i++){              
    for (let j=1; j<result[0].catalog[i].length; j++){                     
      for (let k=0; k<result[0].catalog[i][j][1].length; k++){
        if(result[0].catalog[i][j][1][k][1] === id){
          arr[i][j][1][k][3]++
        }
      }                  
    }            
  }
  return arr
}


function build (opts) {
  const fastify = Fastify(opts)

  fastify
    .register(require('fastify-cors'), {})
    .register(require('fastify-jwt'), { secret: 'supersecret' })
    .register(require('fastify-leveldb'), { name: 'authdb' })
    .register(require('fastify-auth'))

    .after(routes)

  fastify.decorate('verifyJWTandLevelDB', verifyJWTandLevelDB)
  fastify.decorate('verifyUserAndPassword', verifyUserAndPassword)

  function verifyJWTandLevelDB (request, reply, done) {
    const jwt = this.jwt
    const level = this.level

    if (request.body && request.body.failureWithReply) {
      reply.code(401).send({ error: 'Unauthorized' })
      return done(new Error())
    }

    if (!request.req.headers.auth) {
      return done(new Error('Missing token header'))
    }

    jwt.verify(request.req.headers.auth, onVerify)

    function onVerify (err, decoded) {
      if (err || !decoded.user || !decoded.password) {
        return done(new Error('Token not valid'))
      }

      level.get(decoded.user, onUser)

      function onUser (err, password) {
        if (err) {
          if (err.notFound) {
            return done(new Error('Token not valid'))
          }
          return done(err)
        }

        if (!password || password !== decoded.password) {
          return done(new Error('Token not valid'))
        }

        done()
      }
    }
  }

  function verifyUserAndPassword (request, reply, done) {
    const level = this.level

    if (!request.body || !request.body.user) {
      return done(new Error('Missing user in request body'))
    }

    level.get(request.body.user, onUser)

    function onUser (err, password) {
      if (err) {
        if (err.notFound) {
          return done(new Error('Password not valid'))
        }
        return done(err)
      }

      if (!password || password !== request.body.password) {
        return done(new Error('Password not valid'))
      }

      done()
    }
  }

  function routes () {

    fastify.route({
      method: 'GET',
      url: '/no-auth',
      handler: (req, reply) => {
        req.log.info('Auth free route')
        reply.send({ hello: 'world' })
      }
    })


    fastify.route({
      method: 'POST',
      url: '/allcatalog',
      handler: (req, reply) => {
        let collection = "allcatalog"
        if (req.body.leng === "en"){
          collection = "allcatalogEN"
        }
        MongoClient.connect(urldb)
          .then((db) => db.db("tutorialsdb"))
          .then((dbo) => dbo.collection(collection).find({}).toArray())
          .catch((err) => { console.log(err, "err")})
          .then((result) => {
            reply.send(result[0].catalog)
          })
      }
    })
    fastify.route({
      method: 'GET',
      url: '/redactions',
      handler: (req, reply) => {
        MongoClient.connect(urldb)
          .then((db) => db.db("tutorialsdb"))
          .then((dbo) => dbo.collection("redactions").find({}, {projection:{_id:0}}).toArray())
          .catch((err) => { console.log(err, "err")})
          .then((result) => {
            if(result[0]){
              MongoClient.connect(urldb)
              .then((db) => db.db("tutorialsdb"))
              .then((dbo) => dbo.collection("tutorials").find({id: result[0].id }, {projection:{_id:0}}).toArray())
              .catch((err) => { console.log(err, "err")})
              .then((result_article) => {
                
                  reply.send({
                    id: result[0].id,
                    article: result_article[0].article,
                    newArticle: result[0].article
                  })
                

              })
            } else (
              reply.send("no")
            )
          })
      }
    })

    fastify.route({
      method: 'POST',
      url: '/redactionAppdate',
      handler: (req, reply) => {
        console.log(req.body)
        MongoClient.connect(urldb)
          .then((db) => db.db("tutorialsdb"))
          .then((dbo) => {
            dbo.collection("tutorials").updateOne({id: req.body.id}, { $set:{article: req.body.article}});
            dbo.collection("redactions").deleteOne({id: req.body.id});
          })
          .catch((err) => { console.log(err, "err")})
          .then((result) => {
            reply.send()
          })
      }
    })
    fastify.route({
      method: 'POST',
      url: '/newType',
      handler: (req, reply) => {
        MongoClient.connect(urldb)
          .then((db) => db.db("tutorialsdb"))
          .then((dbo) => dbo.collection("allcatalog").find({}).toArray())
          .catch((err) => { console.log(err, "err")})
          .then((result) => {
            let arr = result[0].catalog
            if(req.body.type === -1){
              arr.push([req.body.newValue])
              
            } else  {
              for ( let i = 0; i<arr.length; i++ ){
                if ( arr[i][0] === req.body.type ){
                  arr[i].push([req.body.newValue, []])
                  break;
                }
              }
            }

            MongoClient.connect(urldb)
              .then((db) => db.db("tutorialsdb"))
              .then((dbo) => {
                dbo.collection("allcatalog").updateOne({name: "name"}, { $set:{catalog: arr}});
              })
              .catch((err) => { console.log(err, "err")})
              .then((result) => {
                reply.send()
              })
          })

      }
    })
    fastify.route({
      method: 'POST',
      url: '/goodArticleUpdate',
      handler: (req, reply) => {
        MongoClient.connect(urldb)
          .then((db) => db.db("tutorialsdb"))
          .then((dbo) => dbo.collection("allcatalog").find({}).toArray())
          .catch((err) => { console.log(err, "err")})
          .then((result) => {
            for (let i=0; i<result[0].catalog.length; i++){
              if(result[0].catalog[i][0] === req.body.id[1]){
                for (let j=1; j<result[0].catalog[i].length; j++){   
                  if(result[0].catalog[i][j][0] === req.body.id[2]){
                    for (let k=0; k<result[0].catalog[i][j][1].length; k++){   
                      if(result[0].catalog[i][j][1][k][1] && result[0].catalog[i][j][1][k][1].toString() === req.body.id[0][1].toString()){
                        result[0].catalog[i][j][1][k][2] = "mod" 
                      }
                    }
                  }
                }
              }
            }
            MongoClient.connect(urldb)
              .then((db) => db.db("tutorialsdb"))
              .then((dbo) => {
                dbo.collection("allcatalog").deleteOne({})
                dbo.collection("allcatalog").insertOne(result[0])
                })
              .catch((err) => { console.log(err, "err")})
              .then((result_last) => reply.send(JSON.stringify("finded")))

          })
      }
    })
    fastify.route({
      method: 'POST',
      url: '/badArticleUpdate',
      handler: (req, reply) => {
        MongoClient.connect(urldb)
          .then((db) => db.db("tutorialsdb"))
          .then((dbo) => dbo.collection("allcatalog").find({}).toArray())
          .catch((err) => { console.log(err, "err")})
          .then((result) => {
            result = noDisplayNewArticle (result, req.body.id)
            MongoClient.connect(urldb)
              .then((db) => db.db("tutorialsdb"))
              .then((dbo) => {
                dbo.collection("allcatalog").deleteOne({})
                dbo.collection("allcatalog").insertOne(result[0])
                })
              .catch((err) => { console.log(err, "err")})
              .then((result_last) => reply.send(JSON.stringify("finded")))
          })
      }
    })
    fastify.route({
      method: 'POST',
      url: '/article',
      handler: (req, reply) => {
        let collection = "tutorials"
        if (req.body.leng === "en"){
          collection = "tutorialsEN"
        }
        console.log(req.body.leng)
        MongoClient.connect(urldb)
          .then((db) => db.db("tutorialsdb"))
          .then((dbo) => dbo.collection(collection).find({id: req.body.id}).toArray())
          .catch((err) => { console.log(err, "err")})
          .then((result_article) => {

            MongoClient.connect(urldb)
            .then((db) => db.db("tutorialsdb"))
            .then((dbo) => dbo.collection("allcatalog").find({}, {projection:{_id:0}} ).toArray())
            .catch((err) => { console.log(err, "err")})
            .then((result) => {
              let arr = countPPInAllCatalog(result, req.body.id)
              if(arr){
                MongoClient.connect(urldb)
                .then((db) => db.db("tutorialsdb"))
                .then((dbo) => {
                  dbo.collection("allcatalog").updateOne(
                    {name: "name"}, { $set:{catalog: arr}});
                  })
                .catch((err) => { console.log(err, "err")})
                .then((result) => {
                  reply.send(result_article)
                })
              } else {
                reply.send("oops")
              }
  
            })
          })
      }
    })
    fastify.route({
      method: 'POST',
      url: '/redactorArticleAppend',
      handler: (req, reply) => {
        let arr = ({
          id: req.body.id,
          article: req.body.article
        })
        MongoClient.connect(urldb)
        .then((db) => db.db("tutorialsdb"))
        .then((dbo) => dbo.collection("redactions").insertOne(arr))
        .catch((err) => { console.log(err, "err")})
        .then((result) => {
          reply.send()
        })
      }
    })
    fastify.route({
      method: 'POST',
      url: '/comments',
      handler: (req, reply) => {
        MongoClient.connect(urldb)
          .then((db) => db.db("tutorialsdb"))
          .then((dbo) => dbo.collection("comments").find({id: req.body.id}, {projection:{_id:0}}).toArray())
          .catch((err) => { console.log(err, "err")})
          .then((result) => {
            reply.send(result)
          })
      }
    })    
    fastify.route({
      method: 'POST',
      url: '/deletecomment',
      handler: (req, reply) => {
        MongoClient.connect(urldb)
          .then((db) => db.db("tutorialsdb"))
          .then((dbo) => dbo.collection("comments").deleteOne({id:req.body.comment.id, date: req.body.comment.date}))
          .catch((err) => { console.log(err, "err")})
          .then((result) => {
            reply.send(result)
          })
      }
    })    
    fastify.route({
      method: 'POST',
      url: '/appendcomment',
      handler: (req, reply) => {

            let arr = ({
              id: req.body.articleId,
              header: req.body.header,
              text: req.body.text,
              author: req.body.name,
              date: Date.now()
            })
            MongoClient.connect(urldb)
            .then((db) => db.db("tutorialsdb"))
            .then((dbo) => dbo.collection("comments").insertOne(arr))
            .catch((err) => { console.log(err, "err")})
            .then((result) => {
              reply.send()
            })
      }
    }) 

    fastify.route({
      method: 'POST',
      url: '/createarticle',
      handler: (req, reply) => {
        let id = Date.now()
        id = id.toString()
        let tutorial = {
          id: id,
          article: req.body.article
        }        
        console.log(tutorial)
        MongoClient.connect(urldb)
          .then((db) => db.db("tutorialsdb"))
          .then((dbo) => dbo.collection("allcatalog").find({}).toArray())
          .catch((err) => { console.log(err, "err")})
          .then((result) => {
            console.log(req.body)
            let indexes = []
            for (let i=0; i<result[0].catalog.length; i++){
              if(result[0].catalog[i][0] === req.body.type){
                for (let j=1; j<result[0].catalog[i].length; j++){   
                  if(result[0].catalog[i][j][0] === req.body.under_type){
                    console.log(tutorial.article[0][0])
                    result[0].catalog[i][j][1].push([tutorial.article[0][0], id, "unmod", 1])
                    MongoClient.connect(urldb)
                      .then((db) => db.db("tutorialsdb"))
                      .then((dbo) => {
                        dbo.collection("tutorials").insertOne(tutorial);
                        dbo.collection("allcatalog").updateOne({name:"name"}, { $set:{catalog: result[0].catalog}})

                        })
                      .catch((err) => { console.log(err, "err")})
                      .then((result_last) => reply.send(JSON.stringify("finded")))
                  }
                }
              }
            }
          })


      }
    })
  }

  return fastify
}

if (require.main === module) {
  const fastify = build({
    logger: {
      level: 'info'
    }
  })
  MongoClient.connect(urldb, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    fastify.listen(8000, err => {
      if (err) throw err
      console.log(`Server listening at http://localhost:${fastify.server.address().port}`)
      db.close();

    })
  });
}





module.exports = build