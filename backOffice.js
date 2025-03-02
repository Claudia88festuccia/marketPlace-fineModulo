
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JkYjliZTFlMTQwNjAwMTUzMTRjOTQiLCJpYXQiOjE3NDA0ODcxMDIsImV4cCI6MTc0MTY5NjcwMn0.oIqIzqRyfxsA6XJ1F2r_NN5c8VZhXfdrP2OiVfRSEMs';

const resultTable = document.getElementById("resultsTb");
const searchInput = document.getElementById('searchInput');
const mySpinner = document.getElementById('loadingSpinner');


function vaiAllaPagina() {
    window.location.href = "nuoviProdotti.html";
}
document.addEventListener("DOMContentLoaded", function () {
    
    const resultTable = document.getElementById("resultsTb");
    if (!resultTable) return; 

    
    getProducts(); 
});




let products = []; // Array globale per i prodotti

//  Funzione per ottenere i prodotti dal server
function getProducts() {
    mySpinner.classList.remove("d-none"); // Mostra lo spinner

    fetch("https://striveschool-api.herokuapp.com/api/product/", {
       
        headers: {
            
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        products = data; 
        renderProducts(products); 
    })
    .catch(error => console.error("Errore nel recupero dei prodotti:", error))
    .finally(() => {
        mySpinner.classList.add("d-none");
    });
}

// Funzione per visualizzare i prodotti nella tabella
function renderProducts(data) {
    resultTable.innerHTML = ""; // Pulisce la tabella

    if (data.length === 0) {
        resultTable.innerHTML = `<tr><td colspan="5" class="text-center">Nessun prodotto trovato</td></tr>`;
        return;
    }

    data.forEach(item => {
        const row = document.createElement("tr");
        
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.description}</td>
            <td>${item.brand}</td>
            <td>${item.price} €</td>
            <td>
                <button class="btn btn-danger" onclick="deleteProduct('${item._id}')">Delete</button>
                <button class="btn btn-primary" onclick="vaiAllaPagina()">Update</button>
            </td>
        `;
        resultTable.appendChild(row);
    });
}

//  Funzione per eliminare un prodotto
function deleteProduct(id) {
    const conferma = confirm("Sei sicuro di voler eliminare questo prodotto?");
    
    if (conferma) {
        fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            if (response.ok) {
                alert("Prodotto eliminato con successo!");
                getProducts(); // Aggiorna la lista
            } else {
                alert("Errore nell'eliminazione del prodotto.");
            }
        })
        .catch(error => console.error("Errore nella cancellazione:", error));
    }
}

//  Funzione per la ricerca live con spinner
function liveSearch() {
    mySpinner.classList.remove("d-none"); 

    setTimeout(() => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === "") {
            renderProducts(products); 
        } else {
            const filteredData = products.filter(item => 
                item.name.toLowerCase().includes(searchTerm) ||
                item.description.toLowerCase().includes(searchTerm) ||
                item.brand.toLowerCase().includes(searchTerm)
            );
            renderProducts(filteredData);
        }

        mySpinner.classList.add("d-none"); 
    }, 500); 
}


searchInput.addEventListener('input', liveSearch);


function vaiAllaPagina() {
    window.location.href = "nuoviProdotti.html";
}


getProducts();
