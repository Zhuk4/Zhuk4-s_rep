var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Добавьте эту строку, чтобы обслуживать статические файлы из папки public
app.use(express.static('public'));

app.use(bodyParser.json());

app.post('/add-to-wishlist', function(req, res) {
    var product = req.body;
    var line = (product.name || 'Неизвестно') + ',' + (product.price || 'Неизвестно') + ',' + (product.image || 'Неизвестно') + '\n'; // Теперь включаем ссылку на изображение

    fs.appendFile('public/wishlist.csv', line, function(err) {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else {
            res.status(200).send('Product added to wishlist');
        }
    });
});

app.post('/buy-product', function(req, res) {
    var product = req.body;
    var line = (product.id || 'Неизвестно') + ',' + (product.name || 'Неизвестно') + ',' + (product.price || 'Неизвестно') + '\n'; // Используем id, name и price

    fs.appendFile('public/orders.csv', line, function(err) {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else {
            // Удаляем продукт из файла wishlist.csv
            fs.readFile('public/wishlist.csv', 'utf8', function(err, data) {
                if (err) {
                    console.error(err);
                    res.status(500).send('Server error');
                } else {
                    var lines = data.split('\n');
                    var updatedLines = lines.filter(function(line) {
                        var parts = line.split(',');
                        var id = parts[0];
                        return id !== product.id;
                    });
                    fs.writeFile('public/wishlist.csv', updatedLines.join('\n'), function(err) {
                        if (err) {
                            console.error(err);
                            res.status(500).send('Server error');
                        } else {
                            res.status(200).send('Product bought successfully');
                        }
                    });
                }
            });
        }
    });
});

app.listen(3000, function() {
    console.log('Server is listening on port 3000');
});
