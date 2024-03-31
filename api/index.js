const path = require('path');
const express = require('express');

import { fileURLToPath } from 'url';
import peopleJSON from './people.json';



const app = express();
app.use(express.static('public')); 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));



function createTable(data) {
    // Create a table element
    const datosADevolver = [];

    data.forEach(person => {
        const arregloDatos = [];
        const datosSeleccionados = parsearDatosJson(person);
        
        datosSeleccionados.forEach(dato => {
            arregloDatos.push(dato);
        });
        
        datosADevolver.push(arregloDatos);
    });

    return datosADevolver;
}

function parsearDatosJson(personJSON) {
    var datosSeleccionados = [];
    datosSeleccionados.push(personJSON.name);
    datosSeleccionados.push(personJSON.birth_year);
    datosSeleccionados.push(personJSON.films.length);
    return datosSeleccionados;
}

app.get("/express", (req, res) => {
    res.render("express/express_listado", { data: createTable(peopleJSON) });
});


app.get("/api", (req, res) => res.send(peopleJSON));


app.listen(3001, () => console.log("Server ready on port 3001."));


module.exports = app;





