import { Button, Spinner, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import toast, {Toaster} from 'react-hot-toast';
import { consultarUsuario } from "../../../servicos/servicoUsuario";
import { gravarMensagem } from '../../../servicos/servicoMensagem';

export default function FormCadMensagens(props) {
    const [mensagem, setMensagem] = useState(props.mensagemSelecionada);
    const [formValidado, setFormValidado] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [temUsuarios, setTemUsuarios] = useState(false);

    useEffect(()=>{
        consultarUsuario().then((resultado)=>{
            if (Array.isArray(resultado)){
                setUsuarios(resultado);
                setTemUsuarios(true);
            }
            else{
                toast.error("Não foi possível carregar os usuários");
            }
        }).catch((erro)=>{
            setTemUsuarios(false);
            toast.error("Não foi possível carregar os usuários");
        })
        
    },[]); //didMount

    function selecionarUsuario(evento){
        setMensagem({
            ...mensagem,
            usuario:{
                id: evento.currentTarget.value
            }
        })
    }

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {

            if (!props.modoEdicao) {
                //cadastrar o produto
                gravarMensagem(mensagem)
                .then((resultado)=>{
                    if (resultado.status){
                        //exibir tabela com o produto incluído
                        props.setExibirTabela(true);
                    }
                    else{
                        toast.error(resultado.mensagem);
                    }
                })
            }
            else {
                //editar o produto
                /*altera a ordem dos registros
                props.setListaDeProdutos([...props.listaDeProdutos.filter(
                    (item) => {
                        return item.codigo !== produto.codigo;
                    }
                ), produto]);*/

                //não altera a ordem dos registros
                props.setListaDeMensagens(props.listaDeMensagens.map((item) => {
                    if (item.id !== mensagem.id)
                        return item
                    else
                        return mensagem
                }));

                //voltar para o modo de inclusão
                props.setModoEdicao(false);
                props.setMensagemSelecionada({
                    id: 0,
                    dataHora: "",
                    lida: false,
                    mensagem: "",
                    usuario: {}
                })
                props.setExibirTabela(true)
            }
        }
        else {
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        setMensagem({
            ...mensagem,
            [elemento]: valor 
        })
    }

    return (
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>

            {
                //texto da mensagem
            }
            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Texto</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="texto"
                        name="texto"
                        value={mensagem.mensagem}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o texto da mensagem!</Form.Control.Feedback>
                </Form.Group>
            </Row>

            {
                //usuarios que podem enviar uma mensagem
            }
            <Row className="mb-4">
                <Form.Group as={Col} md={7}>
                    <Form.Label>Usuario:</Form.Label>
                    <Form.Select id='usuario' name='usuario' onChange={selecionarUsuario}>
                        {
                            usuarios.map((usuario) =>{
                                return <option value={usuario.id}> {usuario.nickname} </option>
                            })
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md={1}>
                    {
                      !temUsuarios ?
                        <Spinner className='mt-4' animation="border" variant="success" /> 
                        :
                        ""
                    }
                </Form.Group>
            </Row>

            {
                //botão para confirmar ou alterar alguma mensagem
            }
            <Row className='mt-2 mb-2'>
                <Col md={1}>
                    <Button type="submit" disabled={!temUsuarios}> {props.modoEdicao ? "Alterar" : "Confirmar"} </Button>
                </Col>
                <Col md={{ offset: 1 }}>
                    <Button onClick={() => {
                        props.setExibirTabela(true);
                    }}>Voltar</Button>
                </Col>
            </Row>
            <Toaster position="top-right"/>
        </Form>
    )
}