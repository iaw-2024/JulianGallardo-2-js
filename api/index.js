const express = require("express");
const app = express();
const fs = require('fs');



app.get("/express", (req, res) => {
    fs.readFile('api/people.json', 'utf8', (err, data) => {

        if (err) {
            console.error(err);
            return;
        }
        const jsonData = JSON.parse(data);
        const dataTable = createTable(jsonData);
        res.render('../express/listado_tailwind.ejs', {data: dataTable});
    });
});
app.get("/api", (req, res) => {
    fs.readFile('api/people.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        res.send(data);
    });
});

app.get("/cliente_servidor", (req, res) => {
    fs.readFile('cliente_servidor/index.html', 'utf8', (err, data) => {

        if (err) {
            console.error(err);
            return;
        }
        res.send(data);
    });
});
app.use(express.static('public'));
app.use(express.static('cliente_servidor'));
app.set('view engine', 'ejs');


app.listen(3001, () => console.log("Server ready on port 3001."));

module.exports = app;





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