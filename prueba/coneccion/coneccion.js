// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
  import { 
            getFirestore,
            collection, 
            addDoc,
            getDocs,
            doc,
            updateDoc,
            onSnapshot} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAnGv4IpmK1u5qNSbCxv31LsWsAv1e83xE",
    authDomain: "prueba-78adb.firebaseapp.com",
    databaseURL: "https://prueba-78adb-default-rtdb.firebaseio.com",
    projectId: "prueba-78adb",
    storageBucket: "prueba-78adb.appspot.com",
    messagingSenderId: "1087775156762",
    appId: "1:1087775156762:web:a804c687744c105c253fa3"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db=getFirestore()




  export const onGetCuadrangulares=(callback)=>{onSnapshot(collection(db,'cuadrangulares'),callback)}

  export const guardarCuadrangular=(equipo1,equipo2,equipo3,equipo4,nombre)=>{
    addDoc(collection(db,"cuadrangulares"),{
        "cuadrangular":{ 
            nombre,
            "Partidos":{
                "1":{
                    "equipo1":equipo1,
                    "equipo2":equipo2,
                    "concluido":"no",
                    "goles_1":"0",
                    "goles_2":"0"
                },
                "2":{
                    "equipo1":equipo3,
                    "equipo2":equipo4,
                    "concluido":"no",
                    "goles_1":"0",
                    "goles_2":"0"
                },
                "3":{
                    "equipo1":equipo1,
                    "equipo2":equipo4,
                    "concluido":"no",
                    "goles_1":"0",
                    "goles_2":"0"
                }
                ,"4":{
                    "equipo1":equipo2,
                    "equipo2":equipo3,
                    "concluido":"no",
                    "goles_1":"0",
                    "goles_2":"0"
                },
                "5":{
                    "equipo1":equipo1,
                    "equipo2":equipo3,
                    "concluido":"no",
                    "goles_1":"0",
                    "goles_2":"0"
                },
                "6":{
                    "equipo1":equipo2,
                    "equipo2":equipo4,
                    "concluido":"no",
                    "goles_1":"0",
                    "goles_2":"0"
                }
            },
            "Tabla":{
                "1":{
                    "equipo":equipo1,
                    "goles_a_favor":"0",
                    "goles_en_contra":"0",
                    "puntos":"0"
                },
                "2":{
                    "equipo":equipo2,
                    "goles_a_favor":"0",
                    "goles_en_contra":"0",
                    "puntos":"0"
                },
                "3":{
                    "equipo":equipo3,
                    "goles_a_favor":"0",
                    "goles_en_contra":"0",
                    "puntos":"0"
                },
                "4":{
                    "equipo":equipo4,
                    "goles_a_favor":"0",
                    "goles_en_contra":"0",
                    "puntos":"0"
                    }
            }
        }
    })
  }

export const actualizarCuadrangular = (id,data) =>{
    updateDoc(doc(db,'cuadrangulares',id),data)
}

