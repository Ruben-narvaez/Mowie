import React, { Component } from "react"
import CommentService from "../../../service/comment.service"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

import './CommentForm.css'

class CommentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: "",
            creator: this.props.loggedInUser._id,
            project: this.props.match.params.id,
        }
        this.commentService = new CommentService()
    }

    handleChange = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value,
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.commentService
            .addComment(this.state)
            .then(() => this.props.finishProject())
            .catch((err) => console.log(err))
    }

    render() {

        return (
            <Container className="commentForm" as="section">
                <h2>Escribe tu comentario</h2>
                <hr />
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="description">
                        <Form.Control className="input" name="content" type="textarea" rows="3" value={this.state.content} onChange={this.handleChange} />
                    </Form.Group>
                    <div className="buttons">
                        <Button className="modalButton" type="submit">Crear comentario</Button>
                        <Button className="modalButton" onClick={() => this.props.closeModal()}> Cerrar</Button>
                    </div>
                </Form>
            </Container>
        )
    }
}

export default CommentForm