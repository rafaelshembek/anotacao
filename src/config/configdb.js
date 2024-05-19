import { initializeApp } from "firebase/app";
import {getFirestore, getDocs, collection, addDoc, deleteDoc, doc} from 'firebase/firestore';


const configFireBase = {
    apiKey: "**********************************",
    authDomain: "**********************************",
    projectId: "**********************************",
    storageBucket: "**********************************",
    messagingSenderId: "**********************************",
    appId: "**********************************"
}

const Firebase = initializeApp(configFireBase)
const db = getFirestore(Firebase)

// funcção para retornar os dados
const getCollection = async (collectionName) => {
    try {
        const colRef = collection(db, collectionName)
        const snapshot = await getDocs(colRef)
    
        let myDados = snapshot.docs.map( e => (
            {
                id: e.id, //retornar o ID do documento
                ...e.data() //retornar as Informações do Documentos
            }
        ))
        return myDados
    } catch (error) {
        console.log(`Error ao consultar dados ${error}`)
      
    }
}
// função para excluir Item do banco de dados
const delItem = async (id,collectionName) => {
    try {
        const docRef = doc(db,collectionName,id)
        await deleteDoc(docRef)
        console.log(`Item excluido com sucesso!`) 
    } catch (error) {
        console.log(`Error ao excluir.... ${error}`)
        
    }
}
// função para adicionar informação no banco de dados
const addItems = async (collectionName, dados) => {
    try {
        const colRef = collection(db,collectionName)
        await addDoc(colRef, dados)
        // if(colRef.id.length >= 0){
        //     const docRef = await setDoc(colRef, dados)
        //     .then( (i) => {

        //         console.log(`Informação adicionado com sucesso... ${i}`)
        //     } )
        // }
    } catch (error) {
        console.log(`======================== ERROR =================`)
        console.log(`Error ao adicionar informação no db... ${error}`)
        console.log(`================================================`)
        throw error
    }
}

export default {

    Firebase,
    getCollection,
    addItems,
    delItem
}
