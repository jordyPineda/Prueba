import {actualizarCuadrangular,onGetCuadrangulares} from '../coneccion/coneccion.js'

const data=[];
const id=[];
const opciones= document.getElementById("opciones")
const tabla = document.getElementById("tabla")
const partidos = document.getElementById("partidos")
let cuadrangularActual=0;

window.addEventListener('DOMContentLoaded',async ()=>{

    onGetCuadrangulares((querySnapshot)=>{

        querySnapshot.forEach(element => {
            data.push(element.data().cuadrangular);
            id.push(element.id)
        });

        darOpciones();
    })
    
})


const darOpciones=()=>{
    let aux=`<option disabled selected="">Seleccione un cuadrangular</option>`
    if(!opciones.value){
        console.log("algo")
        data.forEach(element=>{
            aux+=`<option>${element.nombre}</option>`
        })
        opciones.innerHTML= aux;
    }else{
        let i=0;
        data.forEach(element=>{
        if(element.nombre==opciones.value){
            cuadrangularActual = id[i];
            console.log(cuadrangularActual)
            generarTabla(element)
            generarPartidos(element)
        }
        i++;
    })
    }
    
}




opciones.addEventListener('change',(e)=>{

    let i=0;
    data.forEach(element=>{
        if(element.nombre==e.target.value){
            cuadrangularActual = id[i];
            console.log(cuadrangularActual)
            generarTabla(element)
            generarPartidos(element)
        }
        i++;
    })
})


const generarTabla=(element)=>{
    let aux=`<rt>
                <th>Equipo</th>
                <th>Goles a Favor</th>
                <th>Goles en Contra</th>
                <th>Diferencia de Goles</th>
                <th>Puntos</th>
             </tr>  `;

    for(var i = 1; i <= 4; i++){
        aux+=`<tr>
                <td>${element.Tabla[i].equipo}</td>
                <td>${element.Tabla[i].goles_a_favor}</td>
                <td>${element.Tabla[i].goles_en_contra}</td>
                <td>${element.Tabla[i].goles_a_favor - element.Tabla[i].goles_en_contra}</td>
                <td>${element.Tabla[i].puntos}</td>
            </tr>`
            }
    tabla.innerHTML=aux;
}

const generarPartidos=(element)=>{
    let aux=``;

 for(let i = 1; i <= 6; i++){

        let concluido=``;
        let mensaje="Ingresar marcador";
        if(element.Partidos[i].concluido=="si"){
            concluido= `disabled`;
            mensaje="Partido Finalizado";
        }
        aux+=`  <div class="marcador_partido">
                    <div>
                        <p id="${i}_nombreEquipo1">${element.Partidos[i].equipo1}</p>
                        <input ${concluido} type="number" id="${i}_equipo1" value="${element.Partidos[i].goles_1}" min="0" max="100"></imput>
                    </div>  
                    <p> vs </p>
                    <div>
                        <p id="${i}_nombreEquipo2">${element.Partidos[i].equipo2}</p>
                        <input ${concluido}  type="number" id="${i}_equipo2" value="${element.Partidos[i].goles_2}" min="0" max="100"></imput>
                    </div>
                    <button ${concluido}  id="${i}" >${mensaje}</button> 
                    </div>`

            }
    partidos.innerHTML=aux;
    btnIngresoMarcador(element);
}


const btnIngresoMarcador=(element)=>{
    for(let i=1;i<=6;i++){
        let btn = document.getElementById(""+i).addEventListener('click',e=>{
            let goles1 =document.getElementById(i+"_equipo1").value;
            let goles2 =document.getElementById(i+"_equipo2").value;
            let nombreEquipo1= document.getElementById(i+"_nombreEquipo1").innerHTML;
            let nombreEquipo2= document.getElementById(i+"_nombreEquipo2").innerHTML;

            element.Partidos[i].goles_1=goles1;
            element.Partidos[i].goles_2=goles2;
            element.Partidos[i].concluido="si";

            actualizarTabla(element,nombreEquipo1,nombreEquipo2,goles1,goles2)


        })
    }
}


const actualizarTabla=(cuadrangular,equipo1,equipo2,goles1,goles2)=>{

    let puntos1=0;
    let puntos2=0;
    if(goles1>goles2){
        puntos1=3;
        puntos2=0;
    } else if(goles2>goles1){
        puntos2=3;
        puntos1=0;
    }else{
        puntos1=1;
        puntos2=1;
    }

    for(var i = 1; i <= 4; i++){
        if(cuadrangular.Tabla[i].equipo==equipo1){
            cuadrangular.Tabla[i].goles_a_favor= parseInt(goles1)+ parseInt(cuadrangular.Tabla[i].goles_a_favor) +""
            cuadrangular.Tabla[i].goles_en_contra= parseInt(goles2)+ parseInt(cuadrangular.Tabla[i].goles_en_contra)+""
            cuadrangular.Tabla[i].puntos=puntos1+parseInt(cuadrangular.Tabla[i].puntos)+""
        }
        if(cuadrangular.Tabla[i].equipo==equipo2){
            cuadrangular.Tabla[i].goles_a_favor= parseInt(goles2)+ parseInt(cuadrangular.Tabla[i].goles_a_favor)+""
            cuadrangular.Tabla[i].goles_en_contra= parseInt(goles1)+ parseInt(cuadrangular.Tabla[i].goles_en_contra)+""
            cuadrangular.Tabla[i].puntos=puntos2+parseInt(cuadrangular.Tabla[i].puntos) +""
        }
    }
    cuadrangular={"cuadrangular":cuadrangular}
    actualizarCuadrangular(cuadrangularActual,cuadrangular)

}