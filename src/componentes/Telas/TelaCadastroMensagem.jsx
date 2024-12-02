import { Alert } from "react-bootstrap";
import Pagina from "../layouts/Pagina";
import { useState } from "react";
import FormCadMensagens from "./Formularios/FormCadMensagem";
import TabelaMensagens from "./Tabelas/TabelaMensagens";

export default function TelaCadastroMensagem(props) {
    const [exibirTabela, setExibirTabela] = useState(true)
    const [modoEdicao, setModoEdicao] = useState(false)
    const [mensagemSelecionada, setMensagemSelecionada] = useState({
        id: 0,
        dataHora: "",
        lida: false,
        mensagem: "",
        usuario: {}
    })
  
    return (
        <div>
            <Pagina>
                <Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de Mensagens
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaMensagens
                            setExibirTabela = {setExibirTabela}
                            setModoEdicao = {setModoEdicao}
                            setMensagemSelecionada = {setMensagemSelecionada}
                        /> :
                        <FormCadMensagens
                            setExibirTabela = {setExibirTabela}
                            mensagemSelecionada = {mensagemSelecionada}
                            setMensagemSelecionada = {setMensagemSelecionada}
                            modoEdicao = {modoEdicao}
                            setModoEdicao = {setModoEdicao}
                        />
                }
            </Pagina>
        </div>
    )
}