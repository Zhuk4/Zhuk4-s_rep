document.addEventListener('DOMContentLoaded', (event) => {
    fetch('wishlist.csv')
        .then(response => response.text())
        .then(data => {
            var lines = data.split('\n');
            var total = 0;
            lines.forEach(function(line) {
                var parts = line.split(',');
                var name = parts[0];
                var price = parts[1];
                var image = parts[2];

                if (name && price && image) {
                    var productCard = document.createElement('div');
                    productCard.className = 'product-card';

                    var productImage = document.createElement('div');
                    productImage.className = 'product-image';
                    productImage.style.backgroundImage = 'url(' + image + ')';
                    productCard.appendChild(productImage);

                    var productName = document.createElement('div');
                    productName.className = 'product-name';
                    productName.textContent = name;
                    productCard.appendChild(productName);

                    var productPrice = document.createElement('div');
                    productPrice.className = 'product-price';
                    productPrice.textContent = price;
                    productCard.appendChild(productPrice);

                    var buyButton = document.createElement('button');
                    buyButton.textContent = 'Купить';
                    buyButton.onclick = function() { buyProduct(name, price); };
                    productCard.appendChild(buyButton);

                    document.getElementById('wishlist').appendChild(productCard);

                    total += parseInt(price);
                }
            });

            document.getElementById('total-price').textContent = total + ' руб.';
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

function buyProduct(name, price) {
    // Генерируем случайный ID заказа
    var id = Math.floor(Math.random() * 1000000);

    // Отправляем POST-запрос на сервер с информацией о покупке
    fetch('/buy-product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            name: name,
            price: price
        }),
    })
    .then(response => response.text())
    .then(data => alert(data))
    .catch((error) => {
        console.error('Error:', error);
    });
}
