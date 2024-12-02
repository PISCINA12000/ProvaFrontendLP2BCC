import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consultarMensagem, excluirMensagem } from "../servicos/servicoMensagem";
import ESTADO from "./estados";

export const buscarMensagens = createAsyncThunk('buscarMensagens', async ()=>{
    //lista de mensagens
    const resultado = await consultarMensagem()
    //se for um array/lista a consulta funcionou
    try {
        if (Array.isArray(resultado)){
            return {
                "status":true,
                "mensagem":"Mensagens recuperadas com sucesso",
                "listaDeMensagens":resultado
            }
        }
        else
        {
            return {
                "status":false,
                "mensagem":"Erro ao recuperar as mensagens do backend.",
                "listaDeMensagens":[]
            }
        }
    }
    catch(erro){
        return {
            "status":false,
            "mensagem":"Erro: " + erro.message,
            "listaDeMensagens":[]
        }
    }
});

export const apagarMensagem = createAsyncThunk('apagarMensagem', async (mensagem)=>{
    //dar previsibilidade ao conteúdo do payload
    //lista de mensagens
    console.log(mensagem)
    const resultado = await excluirMensagem(mensagem)
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
});

const mensagemReducer = createSlice({
    name:'mensagem',
    initialState:{
        estado: ESTADO.OCIOSO,
        mensagem:"",
        listaDeMensagens:[]
    },
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(buscarMensagens.pending, (state, action) =>{
            state.estado = ESTADO.PENDENTE
            state.mensagem = "Processando requisição (buscando mensagens)"
        })
        .addCase(buscarMensagens.fulfilled, (state, action) =>{
          if (action.payload.status){
            state.estado = ESTADO.OCIOSO;
            state.mensagem = action.payload.mensagem;
            state.listaDeMensagens = action.payload.listaDeMensagens;
          } 
          else{
            state.estado = ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeMensagens = action.payload.listaDeMensagens;
          } 
        })
        .addCase(buscarMensagens.rejected, (state, action) =>{
            state.estado = ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeMensagens = action.payload.listaDeMensagens;
        })
        .addCase(apagarMensagem.pending, (state,action) =>{
            state.estado = ESTADO.PENDENTE;
            state.mensagem = action.payload.mensagem;
        })
        .addCase(apagarMensagem.fulfilled,(state,action) =>{
            state.estado = ESTADO.OCIOSO;
            state.mensagem = action.payload.mensagem;
        })
        .addCase(apagarMensagem.rejected,(state,action)=>{
            state.estado = ESTADO.ERRO;
            state.mensagem = ""//action.payload.mensagem;
        })
    }
})

export default mensagemReducer.reducer