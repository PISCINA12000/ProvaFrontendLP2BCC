import { Alert } from "react-bootstrap";
import FormCadProdutos from "./Formularios/FormCadProduto";
import Pagina from "../layouts/Pagina";
import { useState } from "react";
import TabelaProdutos from "./Tabelas/TabelaProdutos";

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
                        <TabelaProdutos
                            setExibirTabela = {setExibirTabela}
                            setModoEdicao = {setModoEdicao}
                            setMensagemSelecionada = {setMensagemSelecionada}
                        /> :
                        <FormCadProdutos
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