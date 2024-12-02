import { Alert } from "react-bootstrap";
import Pagina from "../layouts/Pagina";
import { useState } from "react";
import FormCadUsuarios from "./Formularios/FormCadUsuario";
import TabelaUsuarios from "./Tabelas/TabelaUsuarios";

export default function TelaCadastroUsuario(props) {
    const [exibirTabela, setExibirTabela] = useState(true)
    const [modoEdicao, setModoEdicao] = useState(false)
    const [usuarioSelecionado, setUsuarioSelecionado] = useState({
        id:0,
        nickname:"",
        urlAvatar:"",
        dataIngresso:"",
        mensagens: [{}]
    })
  
    return (
        <div>
            <Pagina>
                <Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de Usuario
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaUsuarios
                            setExibirTabela = {setExibirTabela}
                            setModoEdicao = {setModoEdicao}
                            setUsuarioSelecionado = {setUsuarioSelecionado}
                        /> :
                        <FormCadUsuarios
                            setExibirTabela = {setExibirTabela}
                            usuarioSelecionado = {usuarioSelecionado}
                            setUsuarioSelecionado = {setUsuarioSelecionado}
                            modoEdicao = {modoEdicao}
                            setModoEdicao = {setModoEdicao}
                        />
                }
            </Pagina>
        </div>
    )
}