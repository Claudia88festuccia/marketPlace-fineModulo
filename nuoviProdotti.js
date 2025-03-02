const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JkYjliZTFlMTQwNjAwMTUzMTRjOTQiLCJpYXQiOjE3NDA0ODcxMDIsImV4cCI6MTc0MTY5NjcwMn0.oIqIzqRyfxsA6XJ1F2r_NN5c8VZhXfdrP2OiVfRSEMs';
const resultTable = document.getElementById("resultsTb");


let products = [];



document.addEventListener("DOMContentLoaded", getProducts);

//  Funzione per ottenere i prodotti
function getProducts() {
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
    .then(response => {
        if (!response.ok) {
            console.error(`Errore HTTP! Status: ${response.status}`);
            return null;
        }
        return response.json();
    })
    .then(data => {
        if (data) {
            products = data;
            renderProducts(products);
        }
    })
    .catch(error => console.error("Errore nel caricamento dei prodotti:", error));
}

// Funzione per mostrare i prodotti nella tabella
function renderProducts(products) {
    const resultsTb = document.getElementById("resultsTb");
    resultsTb.innerHTML = "";

    products.forEach(product => {
        resultsTb.innerHTML += `
            <tr>
                <td>${product.name}</td>
                <td>${product.price} €</td>
                <td>${product.description}</td>
                <td>${product.brand}</td>
                <td>${product._id}</td>
            </tr>`;
    });
}

//  Funzione per aggiungere un prodotto
const addProductForm = document.getElementById("addProductForm");
if (addProductForm) {
    addProductForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const description = document.getElementById("description").value.trim();
        const brand = document.getElementById("brand").value.trim();
        const price = parseFloat(document.getElementById("price").value.trim());
        const imageUrl = document.getElementById("imageUrl").value.trim();
        const alertMsg = document.getElementById("alertMsg");

        // Controllo se i campi sono vuoti
        if (!name || !description || !brand || isNaN(price) || price <= 0 || !imageUrl) {
            alertMsg.classList.remove("d-none");
            alertMsg.innerText = "Tutti i campi sono obbligatori e il prezzo deve essere valido!";
            
            setTimeout(() => {
                alertMsg.classList.add("d-none");
            }, 3000);

            return;
        }

        const newProduct = { name, description, brand, price, imageUrl };

        fetch("https://striveschool-api.herokuapp.com/api/product/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(newProduct)
        })
        .then(response => {
            if (!response.ok) {
                console.log(`Errore HTTP! Status: ${response.status}`);
                return null;
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                alert("Prodotto aggiunto con successo!");
                getProducts();
                addProductForm.reset();
            }
        })
        .catch(error => console.error("Errore nell'aggiunta del prodotto:", error));
    });
}


    // Funzione per mostrare i prodotti nella tabella
    function renderProducts(data) {
        resultTable.innerHTML = "";
        data.forEach((item) => {
            const row = document.createElement("tr");
            
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.price}€</td>
                <td>${item.description}</td>
                <td>${item.brand}</td>
                <td>${item._id}</td>
                
            `;
            resultTable.appendChild(row);
        });
    }

 
   
    getProducts();




function vaiAllaPagina() {
    window.location.href = "home.html";
}

function vaiAllaPagina2() {
    window.location.href = "backOffice.html";
}


function updateProduct(id) {
    window.location.href = `update.html?id=${id}`; // Reindirizza a una pagina di modifica
}


