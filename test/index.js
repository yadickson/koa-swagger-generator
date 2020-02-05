const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

 const swaggerConfig = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'localhost:3000',
        basePath: '/',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['*.js']
};


/**
 * This function comment is parsed by doctrine
 * @route GET /hi
 * @group foo - Operations about user
 * @returns {string} 200 - Hello World
 * @returns {Error}  default - Unexpected error
 */
router.get('/hi', async (ctx) => {
    ctx.body = "Hello World"
});

const koaSwagger = require('../index')(app);
koaSwagger(swaggerConfig);
app.use(router.routes());
app.listen(3000);
