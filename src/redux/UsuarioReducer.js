import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consultarUsuario, excluirUsuario } from "../servicos/servicoUsuario";
import ESTADO from "./estados";

export const buscarUsuarios = createAsyncThunk('buscarUsuarios', async ()=>{
    //lista de mensagens
    const resultado = await consultarUsuario()
    //se for um array/lista a consulta funcionou
    try {
        if (Array.isArray(resultado)){
            return {
                "status":true,
                "mensagem":"Usuarios recuperados com sucesso",
                "listaDeUsuarios":resultado
            }
        }
        else
        {
            return {
                "status":false,
                "mensagem":"Erro ao recuperar os usuarios do backend.",
                "listaDeUsuarios":[]
            }
        }
    }
    catch(erro){
        return {
            "status":false,
            "mensagem":"Erro: " + erro.message,
            "listaDeUsuarios":[]
        }
    }
})

export const apagarUsuario = createAsyncThunk('apagarUsuario', async (usuario)=>{
    //dar previsibilidade ao conteúdo do payload
    //lista de mensagens
    console.log(usuario)
    const resultado = await excluirUsuario(usuario)
    //se for um array/lista a consulta funcionou
    console.log(resultado);
    try {
        return {
            "status":resultado.status,
            "mensagem":resultado.mensagem,
        }
    }
    catch(erro){
        return {
            "status":false,
            "mensagem":"Erro: " + erro.message,
        }
    } 
})

const usuarioReducer = createSlice({
    name:'mensagem',
    initialState:{
        estado: ESTADO.OCIOSO,
        mensagem:"",
        listaDeUsuarios:[]
    },
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(buscarUsuarios.pending, (state, action) =>{
            state.estado = ESTADO.PENDENTE
            state.mensagem = "Processando requisição (buscando usuarios)"
        })
        .addCase(buscarUsuarios.fulfilled, (state, action) =>{
          if (action.payload.status){
            state.estado = ESTADO.OCIOSO;
            state.mensagem = action.payload.mensagem;
            state.listaDeUsuarios = action.payload.listaDeUsuarios;
          }
          else{
            state.estado = ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeUsuarios = action.payload.listaDeUsuarios;
          }
        })
        .addCase(buscarUsuarios.rejected, (state, action) =>{
            state.estado = ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeUsuarios = action.payload.listaDeUsuarios;
        })
        .addCase(apagarUsuario.pending, (state,action) =>{
            state.estado = ESTADO.PENDENTE;
            state.mensagem = action.payload.mensagem;
        })
        .addCase(apagarUsuario.fulfilled,(state,action) =>{
            state.estado = ESTADO.OCIOSO;
            state.mensagem = action.payload.mensagem;
        })
        .addCase(apagarUsuario.rejected,(state,action)=>{
            state.estado = ESTADO.ERRO;
            state.mensagem = ""//action.payload.mensagem;
        })
    }
})

export default usuarioReducer.reducer