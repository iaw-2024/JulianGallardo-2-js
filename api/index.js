const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();


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
    var direccion = path.join(__dirname, '../api/people.json');
    fs.readFile(direccion, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const jsonData = JSON.parse(data);
        const dataTable = createTable(jsonData);
        direccion = path.join(__dirname, '../express/index.ejs');
        res.render(direccion, {data: dataTable});
    });
});
app.get("/api", (req, res) => {
    const direccion = path.join(__dirname, '../api/people.json');
    fs.readFile(direccion, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        res.send(data);
    });
});

app.get("/cliente_servidor", (req, res) => {
    const direccion = path.join(__dirname, '../cliente_servidor/index.html');
    fs.readFile(direccion, 'utf8', (err, data) => {

        if (err) {
            console.error(err);
            return;
        }
        res.send(data);
    });
});
app.use(express.static('public')); 
app.use(express.static('cliente_servidor'));
app.use(express.static('express'));
app.set('views', path.join(__dirname, '/..'));
app.set('view engine', 'ejs');


app.listen(3001, () => console.log("Server ready on port 3001."));








module.exports = app;





