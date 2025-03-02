
// 1 - Chiamata GET
//2 render prodotti
//3 pagina dettaglio
//4 pagina backOffice
//5 delete e post prodotti in altra pagina
const url = 'https://striveschool-api.herokuapp.com/api/product/';
 const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JkYjliZTFlMTQwNjAwMTUzMTRjOTQiLCJpYXQiOjE3NDA0ODcxMDIsImV4cCI6MTc0MTY5NjcwMn0.oIqIzqRyfxsA6XJ1F2r_NN5c8VZhXfdrP2OiVfRSEMs'; // Sostituisci con il tuo token
async function getProducts() {
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();
        renderProducts(json);
        console.log(json);
    } catch (error) {
        console.error( error);
    }
}

const renderProducts = (products) => {
    const productsContainer = document.querySelector('.row');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('col-md-3', 'mb-4', 'd-flex'); 
        
        card.innerHTML = `
            <div class="card shadow-sm border-0 rounded">
                <img src="${product.imageUrl}" class="card-img-top img-fluid" alt="${product.name}" style="height: 200px; object-fit: cover;">
                <div class="card-body text-center">
                    <h5 class="card-title font-weight-bold">${product.name}</h5>
                    <p class="card-text text-muted">${product.brand}</p>
                    <p class="card-text">${product.price}€</p>
                    <button class='btn btn-primary dettaglio-btn' data-asin="${product._id}">Dettaglio</button>
                </div>
            </div>
        `;
        
        productsContainer.appendChild(card);
    });

    document.querySelectorAll(".dettaglio-btn").forEach((button) => {
        button.addEventListener("click", (event) => {
            let asin = event.target.getAttribute("data-asin"); 
            window.location.href = `dettaglio.html?asin=${asin}`;
        });
    });
};

function vaiAllaPagina() {
    window.location.href = "backOffice.html";
}


// Chiamata alla funzione
getProducts();






