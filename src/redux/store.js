import { configureStore } from "@reduxjs/toolkit";
import mensagemReducer from "./MensagemReducer";
import usuarioReducer from "./UsuarioReducer";

const store = configureStore({
    reducer:{
        "mensagem":mensagemReducer,
        "usuario":usuarioReducer
    }
})

export default store