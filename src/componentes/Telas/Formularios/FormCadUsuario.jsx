import { Button, Spinner, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { gravarUsuario } from '../../../servicos/servicoUsuario';

export default function FormCadUsuarios(props) {
    const [usuario, setUsuario] = useState(props.usuarioSelecionado);
    const [formValidado, setFormValidado] = useState(false);

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {

            if (!props.modoEdicao) {
                //cadastrar o produto
                gravarUsuario(usuario)
                    .then((resultado) => {
                        if (resultado.status) {
                            //exibir tabela com o produto incluído
                            props.setExibirTabela(true);
                        }
                        else {
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
                props.setListaDeUsuarios(props.listaDeUsuarios.map((item) => {
                    if (item.id !== usuario.id)
                        return item
                    else
                        return usuario
                }));

                //voltar para o modo de inclusão
                props.setModoEdicao(false);
                props.setUsuarioSelecionado({
                    id: 0,
                    nickname: "",
                    urlAvatar: "",
                    senha: ""
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
        setUsuario({
            ...usuario,
            [elemento]: valor
        })
    }

    return (
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>

            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Nickname</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="nickname"
                        name="nickname"
                        value={usuario.mensagem}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o nickname do usuário!</Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row>
                <Form.Group as={Col} md="12">
                    <Form.Label>Url do seu avatar:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="urlAvatar"
                        name="urlAvatar"
                        value={usuario.urlAvatar}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a url da imagem de seu avatar!</Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row className='mt-2 mb-2'>
                <Col md={1}>
                    <Button type="submit"> {props.modoEdicao ? "Alterar" : "Confirmar"} </Button>
                </Col>
                <Col md={{ offset: 1 }}>
                    <Button
                        onClick={() => {
                            props.setExibirTabela(true);
                        }}>Voltar
                    </Button>
                </Col>
            </Row>
            <Toaster position="top-right" />
        </Form>
    )
}