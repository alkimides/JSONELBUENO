
document.querySelector('#worker1').addEventListener('click', function(){
    getWorker("5dd668320eab3b3f0000ada6");
});
document.querySelector('#worker2').addEventListener('click', function(){
    getWorker("5dd668320eab3b3f0000ada7");
});
document.querySelector('#worker3').addEventListener('click', function(){
    getWorker("5dd668320eab3b3f0000ada8");
});
document.querySelector('#show').addEventListener('click', getAllWorkers);
document.querySelector('#delete').addEventListener('click', function(){
    deleteWorker();
});

//document.querySelector("#btnAdd").addEventListener('click', function(){
  //  addWorker();
//});

function getWorker(value){
let url = `https://databasealki-d184.restdb.io/rest/workers/${value}`;
const api = new XMLHttpRequest();
api.onreadystatechange = function() {
    if (this.status == 200 && this.readyState == 4)
    {
        //limpiamos
        document.getElementById("wName").innerHTML = "";
        document.getElementById("wLName").innerHTML = "";
        document.getElementById("Wemail").innerHTML = "";

        //declaramos datos como JSON

        let datos = JSON.parse(this.responseText);

        //Metemos data

        document.getElementById("wName").innerHTML = datos.FirstName;
        document.getElementById("wLName").innerHTML = datos.LastName;
        document.getElementById("Wemail").innerHTML = datos.WorkEmail;


    }
}

//para el CORS

api.withCredentials = false;

//abrimos conn
api.open('GET', url, true);

api.setRequestHeader("x-apikey", "5dd672374658275ac9dc1d10");
api.setRequestHeader("content-type", "application/json");
api.setRequestHeader("cache-control", "no-cache");

//enviamos
api.send();
}


//Funcion para añadir empleados mediante POST
function addWorker(){

   let url = 'https://databasealki-d184.restdb.io/rest/workers';
    var data  = JSON.stringify({
        "PersonId" : newid.value,
        "LastName" : newlname.value,
        "FirstName" : newfname.value,
        "DisplayName" : newdname.value,
        "WorkEmail" : newwemail.value,
        "Username" : newusername.value,

    });

    var api = new XMLHttpRequest();
    api.withCredentials = false;

    api.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
        console.log(this.responseText);
        }
    });

    api.open("POST", "https://databasealki-d184.restdb.io/rest/workers");
    api.setRequestHeader("content-type", "application/json");
    api.setRequestHeader("x-apikey", "5dd672374658275ac9dc1d10");
    api.setRequestHeader("cache-control", "no-cache");


    api.send(data);
}

function deleteWorker(value){
var data = null;

var api = new XMLHttpRequest();
api.withCredentials=false;

api.addEventListener("readystatechange", function () {
    if(this.readyState == 4){
        console.log(this.responseText);
        let datos = JSON.parse(this.responseText);
    }
    for (let item of datos){
        if(item.PersonId == idfinder.value){
            value = item.PersonId;
        }
    }
});
    

api.open("DELETE", `https://databasealki-d184.restdb.io/rest/workers/5dd672374658275ac9dc1d10/${value}`);
api.setRequestHeader("content-type", "application/json");
api.setRequestHeader("x-apikey", "5dd672374658275ac9dc1d10");
api.setRequestHeader("cache-control", "no-cache");

api.send(data);
}

function modifyWorker(){

}

function getAllWorkers(){
    console.log('estamos en la funcion');


//////////////////////////////////////////////////////EMPEZAMOS CON AJAX////////////////////////////////////////////////////////


    //declaramos constante
    const xhttp = new XMLHttpRequest();

    //configuramos metodo open

    xhttp.open('GET', 'https://databasealki-d184.restdb.io/rest/workers', true);

    //enviamos
    xhttp.setRequestHeader("x-apikey", "5dd672374658275ac9dc1d10");
    xhttp.setRequestHeader("content-type", "application/json");
    xhttp.setRequestHeader("cache-control", "no-cache");

    xhttp.send();

    //conseguimos respuesta

    xhttp.onreadystatechange = function(){
        //preguntamos por estados
        if(this.readyState == 4 && this.status == 200){
            //obtenemos datos de catalogo.json
            //console.log(this.responseText);
            //obtenemos la respuesta en JSON
            let datos = JSON.parse(this.responseText);

            //console.log(datos)
            
            let res = document.querySelector('#res');
            //limpiamos la respuesta, ya que en el bucle for va a estar reescribiendo todo el rato
            res.innerHTML = '';

            //accedemos a los datos con un bucle for
            for (let item of datos)
            {
                //de esta manera podemos visualizar solo el nombre de uno en uno, al igual que cualquier otro dato
                //console.log(item.FirstName)

                //agregamos informacion por cada ciclo for
                //comillas especiales para poder mezclar con codigo html
                res.innerHTML += `
                    <tr>
                        <td>${item.PersonId}</td>
                        <td>${item.LastName}</td>
                        <td>${item.FirstName}</td>
                        <td>${item.DisplayName}</td>
                        <td>${item.WorkEmail}</td>
                        <td>${item.Username}</td>
                    </tr>
                `
                //con ${} accedemos a las variables del archivo json de oracle

            }
        }
    }
}