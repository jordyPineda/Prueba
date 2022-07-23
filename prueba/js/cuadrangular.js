import {guardarCuadrangular} from '../coneccion/coneccion.js'

let formulario= document.getElementsByName("formulario")[0];

formulario.addEventListener("submit",(e)=>{

    e.preventDefault();
    let nombre = formulario["nombre"].value
    let equipo1 = formulario["equipo1"].value
    let equipo2 = formulario["equipo2"].value
    let equipo3 = formulario["equipo3"].value
    let equipo4 = formulario["equipo4"].value

    guardarCuadrangular(equipo1,equipo2,equipo3,equipo4,nombre)

    formulario.reset();

    alert("Cuadrangular registrado!")

})