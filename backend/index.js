'use strict'

const Fastify = require('fastify')
const f = require('./functions')
var MongoClient = require('mongodb').MongoClient;
var urldb = "mongodb://185.20.225.204:27017/";



function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
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
        f.getCatalog( req.body.leng ).then( (result) => reply.send( result ))
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
        f.getCatalog("ru")
          .then((result) => {
            let arr = f.checkNewType(result, req.body.type, req.body.newValue)

            f.updateCatalog(arr, "ru")
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
        f.getCatalog("ru")
        .then((result) => {
        result = f.goodArticleMood(result[0].catalog)
        f.updateCatalog(result[0].catalog, "ru")
        .then((result_last) => reply.send(JSON.stringify("finded")))

      })
      }
    })
    fastify.route({
      method: 'POST',
      url: '/badArticleUpdate',
      handler: (req, reply) => {
        f.getCatalog("ru")
          .then((result) => {
        result = f.noDisplayNewArticle (result, req.body.id)
        f.updateCatalog(result[0].catalog, "ru")
          .then((result_last) => reply.send(JSON.stringify("finded")))
        })
      }
    })
    fastify.route({
      method: 'POST',
      url: '/article',
      handler: (req, reply) => {
        f.getArticle(req.body.leng, req.body.id).then((result_article) => {
        f.getCatalog(req.body.leng).then((result) => {
        let arr = f.countPPInAllCatalog(result, req.body.id)
        if(arr){
          f.updateCatalog(arr, "ru")
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
        f.pushRedactionArticle(req.body)
        .then((result) => reply.send())
      }
    })
    fastify.route({
      method: 'POST',
      url: '/comments',
      handler: (req, reply) => {
        f.getComments(req.body.id).then((result) => { reply.send(result) })
      }
    })    
    fastify.route({
      method: 'POST',
      url: '/deletecomment',
      handler: (req, reply) => {
        f.deleteComment(req.body.comment).then((result) => { reply.send(result) })
      }
    })    
    fastify.route({
      method: 'POST',
      url: '/appendcomment',
      handler: (req, reply) => {
        f.pushComment(req.body).then((result) => {reply.send(result)})
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
        f.getCatalog("ru").then((result) => {
          result = f.pushNewArticle(result, req.body.type, req.body.under_type, tutorial)
          
          if (result) {
            f.updateCatalog(result, "ru").then(reply.send(JSON.stringify("finded")))
          } else {
            reply.send("oops")
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
    fastify.listen(10000, err => {
      if (err) throw err
      console.log(`Server listening at http://localhost:${fastify.server.address().port}`)
      db.close();

    })
  });
}





module.exports = build
