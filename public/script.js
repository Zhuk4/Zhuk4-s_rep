document.addEventListener('DOMContentLoaded', (event) => {
    var products = [
        {
            name: 'Кольцо',
            description: 'Это красивое ручное кольцо, изготовленное из стерлингового серебра с уникальным крафтовым дизайном.',
            image: 'https://static.insales-cdn.com/images/products/1/100/409059428/large_IMG_9138.HEIC',
            price: '5000 руб.'
        },
        // Добавьте остальные продукты здесь...
    ];

    var productGrid = document.getElementById('product-grid');

    products.forEach(function(product) {
        var productCard = document.createElement('div');
        productCard.className = 'product-card';

        var productImage = document.createElement('div');
        productImage.className = 'product-image';
        productImage.style.backgroundImage = 'url(' + product.image + ')';
        productImage.onclick = function() { openModal(product); };
        productCard.appendChild(productImage);

        var productName = document.createElement('div');
        productName.className = 'product-name';
        productName.textContent = product.name;
        productCard.appendChild(productName);

        var productDescription = document.createElement('div');
        productDescription.className = 'product-description';
        productDescription.textContent = product.description;
        productCard.appendChild(productDescription);

        productGrid.appendChild(productCard);

        // Создаем модальное окно для каждого продукта
        var modal = document.createElement('div');
        modal.id = 'modal-' + product.name; // Уникальный ID для каждого модального окна
        modal.className = 'modal';

        var modalContent = document.createElement('div');
        modalContent.className = 'modal-content';

        var closeBtn = document.createElement('span');
        closeBtn.className = 'close';
        closeBtn.onclick = function() { closeModal(modal); };
        closeBtn.textContent = '×';
        modalContent.appendChild(closeBtn);

        var img = document.createElement('img');
        img.id = 'img-' + product.name; // Уникальный ID для каждого изображения
        img.src = product.image;
        modalContent.appendChild(img);

        var modalProductName = document.createElement('h2');
        modalProductName.id = 'product-name-' + product.name; // Уникальный ID для каждого имени продукта
        modalProductName.textContent = product.name;
        modalContent.appendChild(modalProductName);

        var caption = document.createElement('p');
        caption.id = 'caption-' + product.name; // Уникальный ID для каждого описания продукта
        caption.textContent = product.description;
        modalContent.appendChild(caption);

        var price = document.createElement('p');
        price.id = 'price-' + product.name; // Уникальный ID для каждой цены продукта
        price.textContent = product.price;
        modalContent.appendChild(price);

        var addToWishlistBtn = document.createElement('button');
        addToWishlistBtn.onclick = function() { addToWishlist(product); };
        addToWishlistBtn.textContent = 'Добавить в желания';
        modalContent.appendChild(addToWishlistBtn);

        modal.appendChild(modalContent);
        document.body.appendChild(modal); // Добавляем модальное окно в body
    });

    function openModal(product) {
        var modal = document.getElementById('modal-' + product.name);
        modal.style.display = "block";
    }

    function closeModal(modal) {
        modal.style.display = "none";
    }

    function addToWishlist(product) {
        // Отправляем POST-запрос на сервер с информацией о продукте
        fetch('/add-to-wishlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: product.name,
                price: product.price,
                image: product.image
            }),
        })
        .then(response => response.text())
        .then(data => alert(data))
        .catch((error) => {
            console.error('Error:', error);
        });
    }
});
