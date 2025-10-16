        const products = [
            { id: 1, name: "Смартфон X1", category: "Электроника", price: 29999, rating: 4.5, stock: 15 },
            { id: 2, name: "Ноутбук Pro", category: "Электроника", price: 75999, rating: 4.8, stock: 8 },
            { id: 3, name: "Кофемашина", category: "Бытовая техника", price: 24999, rating: 4.2, stock: 12 },
            { id: 4, name: "Беспроводные наушники", category: "Электроника", price: 8999, rating: 4.6, stock: 0 },
            { id: 5, name: "Игровая консоль", category: "Электроника", price: 45999, rating: 4.9, stock: 5 },
            { id: 6, name: "Микроволновая печь", category: "Бытовая техника", price: 12999, rating: 4.0, stock: 20 },
            { id: 7, name: "Фитнес-браслет", category: "Электроника", price: 3999, rating: 4.3, stock: 25 },
            { id: 8, name: "Пылесос робот", category: "Бытовая техника", price: 32999, rating: 4.7, stock: 7 },
            { id: 9, name: "Электронная книга", category: "Электроника", price: 11999, rating: 4.4, stock: 0 },
            { id: 10, name: "Умные часы", category: "Электроника", price: 19999, rating: 4.6, stock: 18 }
        ];

        let currentSort = { column: 'name', direction: 'asc' };
        let filteredProducts = [...products];

        function initTable() {
            renderTable();
            renderCards();
            updateCounter();
            
            document.querySelectorAll('th[data-sort]').forEach(th => {
                th.addEventListener('click', () => {
                    const column = th.getAttribute('data-sort');
                    sortTable(column);
                });
            });
            
            document.getElementById('search').addEventListener('input', (e) => {
                filterTable(e.target.value);
            });
        }

        function renderTable() {
            const tbody = document.getElementById('table-body');
            tbody.innerHTML = '';
            
            filteredProducts.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.name}</td>
                    <td>${product.category}</td>
                    <td>${product.price.toLocaleString()} руб.</td>
                    <td>${product.rating}</td>
                    <td>${product.stock > 0 ? `${product.stock} шт.` : 'Нет в наличии'}</td>
                `;
                tbody.appendChild(row);
            });
            
            document.querySelectorAll('th').forEach(th => {
                th.classList.remove('sort-asc', 'sort-desc');
            });
            
            const currentTh = document.querySelector(`th[data-sort="${currentSort.column}"]`);
            if (currentTh) {
                currentTh.classList.add(currentSort.direction === 'asc' ? 'sort-asc' : 'sort-desc');
            }
        }

        function renderCards() {
            const container = document.getElementById('cards-container');
            container.innerHTML = '';
            
            if (filteredProducts.length === 0) {
                container.innerHTML = '<div class="no-results">Товары не найдены</div>';
                return;
            }
            
            filteredProducts.forEach(product => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <div class="card-header">${product.name}</div>
                    <div class="card-row">
                        <span class="card-label">Категория:</span>
                        <span>${product.category}</span>
                    </div>
                    <div class="card-row">
                        <span class="card-label">Цена:</span>
                        <span>${product.price.toLocaleString()} руб.</span>
                    </div>
                    <div class="card-row">
                        <span class="card-label">Рейтинг:</span>
                        <span>${product.rating}</span>
                    </div>
                    <div class="card-row">
                        <span class="card-label">Наличие:</span>
                        <span>${product.stock > 0 ? `${product.stock} шт.` : 'Нет в наличии'}</span>
                    </div>
                `;
                container.appendChild(card);
            });
        }

        function sortTable(column) {
            if (currentSort.column === column) {
                currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
            } else {
                currentSort.column = column;
                currentSort.direction = 'asc';
            }
            
            filteredProducts.sort((a, b) => {
                let aVal = a[column];
                let bVal = b[column];
                
                if (typeof aVal === 'string') {
                    aVal = aVal.toLowerCase();
                    bVal = bVal.toLowerCase();
                }
                
                if (aVal < bVal) return currentSort.direction === 'asc' ? -1 : 1;
                if (aVal > bVal) return currentSort.direction === 'asc' ? 1 : -1;
                return 0;
            });
            
            renderTable();
            renderCards();
        }

        function filterTable(searchTerm) {
            if (!searchTerm) {
                filteredProducts = [...products];
            } else {
                const term = searchTerm.toLowerCase();
                filteredProducts = products.filter(product => 
                    product.name.toLowerCase().includes(term) ||
                    product.category.toLowerCase().includes(term) ||
                    product.price.toString().includes(term) ||
                    product.rating.toString().includes(term) ||
                    product.stock.toString().includes(term)
                );
            }
            
            sortTable(currentSort.column);
            updateCounter();
        }

        function updateCounter() {
            document.getElementById('count').textContent = filteredProducts.length;
        }

        document.addEventListener('DOMContentLoaded', initTable);