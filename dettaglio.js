
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JkYjliZTFlMTQwNjAwMTUzMTRjOTQiLCJpYXQiOjE3NDA0ODcxMDIsImV4cCI6MTc0MTY5NjcwMn0.oIqIzqRyfxsA6XJ1F2r_NN5c8VZhXfdrP2OiVfRSEMs'; 



const params = new URLSearchParams(window.location.search);
const asin = params.get("asin");
if (asin) {
    fetch(`https://striveschool-api.herokuapp.com/api/product/${asin}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())

        .then(product => {
            if (product) {
                document.getElementById('dettaglio').innerHTML = `
                    <div class="card shadow-lg border-0 rounded p-4 text-center mx-auto" style="max-width: 500px;">
                        <img src="${product.imageUrl}" class="img-fluid rounded mb-3" alt="${product.name}" style="height: 250px; object-fit: cover;">
                        <div class="card-body">
                            <h3 class="card-title font-weight-bold">${product.name}</h3>
                            <p class="card-text text-muted">${product.brand}</p>
                            <p class="card-text">${product.description}</p>
                            <h4 class="text-primary font-weight-bold">${product.price}€</h4>
                            <a href="/home.html" class="btn btn-outline-secondary mt-3">Torna indietro</a>
                        </div>
                    </div>
                `;
            } else {
                document.getElementById("dettaglio").innerHTML = `<p class="text-center text-danger">Prodotto non trovato.</p>`;
            }
        })
        
        .catch(error => {
            console.error(error);
        })
}
