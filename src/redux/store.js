import { configureStore } from "@reduxjs/toolkit";
import mensagemReducer from "./MensagemReducer";

const store = configureStore({
    reducer:{
        'mensagem':mensagemReducer
    }
})

export default store