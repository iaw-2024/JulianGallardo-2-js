fetch('/api')
    .then(response => response.json())
    .then(data => {
        // Process the data and create the table
        createTable(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

async function createTable(data) {
    // Create a table element
    const table = document.createElement('table');
    table.setAttribute("id", "tablaPersonas");
    table.setAttribute("class", "table table-striped table-bordered w-1x2  sm:w-full shadow-md rounded-lg bg-gray-800 bg-opacity-90 text-white");


    // Create table headers
    
    const thead = document.createElement('thead');
    thead.setAttribute("class", "text-xs md:text-2x1 bg-gray-500 uppercase");
    const headersSeleccionados = parsearHeadersJson();
    const headerRow = document.createElement('tr');
    headersSeleccionados.forEach(header => {
        const cell = document.createElement('th');
        cell.scope = "col";

        cell.textContent = header;
        headerRow.appendChild(cell);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
    

    // Create table rows
    const tbody = document.createElement('tbody');
    data.forEach(person => {
        const row = document.createElement('tr');
        row.setAttribute("class", "border-b  text-center");
        const datosSeleccionados = parsearDatosJson(person).then(datos => {
            datos.forEach(dato => {
                const cell = document.createElement('td');
                cell.setAttribute("class", "px-auto py-auto text-xs md:text-xl md:px-6 md:py-4 md:px-6 py-4");
                cell.textContent = dato;
                row.appendChild(cell);
            });
            tbody.appendChild(row);
        });
    });
    table.appendChild(tbody);

    // Append the table to the document body
    document.getElementById("containerTabla").appendChild(table);
}


async function parsearDatosJson(personJSON) {
    var datosSeleccionados = [];
    datosSeleccionados.push(personJSON.name);
    datosSeleccionados.push(personJSON.birth_year);
    var planeta = await parsearPlanetaOrigen(personJSON.homeworld);
    console.log(planeta)
    datosSeleccionados.push(planeta);
    var especie = await parsearEspecie(personJSON.species);
    console.log(especie)
    datosSeleccionados.push((personJSON.species.length > 0) ? especie : "Desconocida");
    datosSeleccionados.push(personJSON.films.length);
    return datosSeleccionados;
}

function parsearHeadersJson() {
    var headers = [];
    headers.push("Nombre");
    headers.push("Año de nacimiento");
    headers.push("Planeta de origen");
    headers.push("Especie");
    headers.push("Peliculas en las que aparece");
    return headers;
}

async function parsearPlanetaOrigen(planeta) {
    return fetch(planeta)
        .then(response => response.json())
        .then(data => {
            return data.name;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

async function parsearEspecie(especie) {
    return fetch(especie)
        .then(response => response.json())
        .then(data => {
            return data.name;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}