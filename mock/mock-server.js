let express = require('express');
let Mock = require('mockjs');
const Random = Mock.Random;
// 实例化express,使用express框架搭建node后端
let app = express();
// 解决跨域
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/home/banners', function(req, res){
    res.json(Mock.mock({
        'status': 200,
        'errorMsg': null,
        'data|2-4': [
            {
                'id': /c-\d{6}/,
                'imageUrl': Random.image('550x250', '#4A7BF7', Random.string()),
                'backgroundColor': Random.color(),
                'itemId': Random.string(),
                'catId|1-100': 1,
                'type|1-5': 1,
                'sort|1-5': 1,
                'isShow': 1
            }
        ]
    }));
});

app.get('/home/hot', function(req, res){
    res.json(Mock.mock({
        'status': 200,
        'errorMsg': null,
        'data': {
            'page': req.query.page,
            'totalPages|1-50': 1,
            'totalRec|10-100': 1,
            'rows|5': [
                {
                    'id': /\w{5}-\d{5}/,
                    'itemName': Random.cword(5, 10),
                    'sellCounts': Random.integer(100, 1000),
                    'onOffStatus': 1,
                    'imageUrl': Random.image('450x250'),
                    'priceNormal': Random.integer(1000, 10000),
                    'priceDiscount': Random.integer(1000, 10000),
                    'createdTime': Random.datetime('yyyy-MM-dd HH:mm:ss'),
                    'updatedTime': Random.datetime('yyyy-MM-dd HH:mm:ss')
                }
            ]
        }
    }));
});

app.get('/home/searchHot', function(req, res){
    res.json(Mock.mock({
        'status': 200,
        'errorMsg': null,
        'data|5-10': [
            {
                'hotWord': /\w{5,9}/,
                'hotWords': /\w{5,9}/
            }
        ]
    }));
});

app.get('/home/cats/:type(ONE|TWO|THREE)/:fatherId', function(req, res){
    res.json(Mock.mock({
        'status': 200,
        'errorMsg': null,
        'data|5-9': [
            {
                'id|+1': 1,
                'name': Random.cword(3, 5),
                'type': 1,
                'fatherId': req.params.fatherId,
                'logo': 'img/abc.png',
                'slogan': Random.cword(5, 10),
                'catImage': Random.image('150x150'),
                'bgColor': Random.color()
            }
        ]
    }));
});

app.get('/item/detail/comments/:id', function(req, res){
    res.json(Mock.mock({
        'status': 200,
        'errorMsg': null,
        'data|20-50': [
            {
                'id|+1': 100,
                'userId|3': /\d{3,5}\w{3,5}\-/,
                'itemId': req.params.id,
                'itemName': Random.cword(5, 10),
                'itemSpecId': 'bingan-1001-spec-1',
                'sepcName': Random.cword(3, 5),
                'commentLevel|1-5': 1,
                'content': Random.cword(3, 50),
                'createdTime': Random.datetime('yyyy-MM-dd HH:mm:ss'),
                'updatedTime': Random.datetime('yyyy-MM-dd HH:mm:ss')
            }
        ]
    }));
});

app.get('/item/detail/:id', function(req, res){
    res.json(Mock.mock({
        'status': 200,
        'errorMsg': null,
        'data': {
            'item': {
                'id': req.params.id,
                'itemName': Random.cword(5, 9),
                'catId|10-200': 1,
                'rootCatId|1-10': 1,
                'sellCounts': Random.integer(100, 1000),
                'onOffStatus': 1,
                'createdTime': Random.datetime('yyyy-MM-dd HH:mm:ss'),
                'updatedTime': Random.datetime('yyyy-MM-dd HH:mm:ss'),
                'content': Random.sentence(3, 5)
            },
            'itemParam': {
                'id': /\w{5}-\d{3}-param/,
                'itemId': Random.cword(5, 9),
                'producPlace': Random.cword(3, 5),
                'footPeriod': Random.cword(3, 5),
                'brand': Random.cword(5, 9),
                'factoryName': Random.cword(9, 15),
                'factoryAddress': Random.cword(5, 9),
                'packagingMethod': Random.cword(5, 9),
                'weight': Random.cword(5, 9),
                'storageMethod': Random.cword(5, 9),
                'eatMethod': Random.cword(5, 9),
                'createdTime': Random.datetime('yyyy-MM-dd HH:mm:ss'),
                'updatedTime': Random.datetime('yyyy-MM-dd HH:mm:ss')
            },
            'itemImgs|2-4': [
                {
                    'id': /\w{5}-\d{3}-img/,
                    'itemId': Random.cword(5, 9),
                    'url': Random.image('550x250', '#4A7BF7', Random.string()),
                    'sort|+1': 1,
                    'isMain|0-1': 1,
                    'createdTime': Random.datetime('yyyy-MM-dd HH:mm:ss'),
                    'updatedTime': Random.datetime('yyyy-MM-dd HH:mm:ss')
                }
            ],
            'itemSpecs|2-3': [
              {
                'id': /\w{5}-\d{3}-spec/,
                'itemId': Random.cword(5, 9),
                'name': Random.cword(2, 5),
                'stock|300-600': 1,
                'discounts|0.1-2': 1,
                'priceNormal': Random.integer(1000, 10000),
                'priceDiscount': Random.integer(1000, 10000),
                'createdTime': Random.datetime('yyyy-MM-dd HH:mm:ss'),
                'updatedTime': Random.datetime('yyyy-MM-dd HH:mm:ss')
              }
            ]
        }
    }));
});
// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.post('/cart/getitemsfromcart', function(req, res){
    if (req.body.userId !== 'jason001'){
        res.json('用户不存在');
    }else {
        res.json(Mock.mock({
            'status': 200,
            'errorMsg': null,
            'data|2-3': [
                {
                    'itemId': /\w{5}-\d{3}/,
                    'itemImgUrl': Random.image('550x250', '#4A7BF7', Random.string()),
                    'itemName': /\w{5,9}/,
                    'specId': /\w{5}-\d{3}-spec/,
                    'specName': /\w{3,5}/,
                    'counts': /\d{1}/,
                    'priceNormal': /\d{2,4}/,
                    'priceDiscount': /\d{2,4}/
                }
            ]
        }));
    }
    
});

app.listen('8088', () => {
    console.log('监听端口 8088');
});