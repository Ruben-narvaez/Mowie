import React, { Component } from 'react'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import CommentService from '../../../service/comment.service'
import './Comment.css'

class CommentCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props._id,
            creator: this.props.creator,
            content: this.props.content,
        }
        this.commentService = new CommentService()
    }

    handleDelete = (id) => {
        this.commentService.deleteComment(id)
            .then(() => {
                this.props.componentDidMount()
                this.props.history.push(`/projects/details/${this.props.project}`)
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                <div className="comments">
                    <Col md={{ span: 8, offset: 1 }}>
                        {this.state.creator && <h6 className="user-info">{this.state.creator.username}</h6>}
                        <hr></hr>
                    </Col>
                    <Col md={{ span: 8, offset: 1 }} >
                        {this.state.content}
                        {this.props.creator._id === this.props.loggedInUser._id && <Button className="redButton" onClick={() => this.handleDelete(this.state.id)} variant="danger" size="md">Borrar</Button>}
                    </Col>
                </div>
            </>
        )
    }
}

export default CommentCard