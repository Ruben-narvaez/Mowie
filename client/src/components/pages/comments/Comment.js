import React, { Component } from 'react'
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
        const { creator, content, id } = this.state
        
        return (
            <>
                <div className="comments">
                    <div className="profileComment">
                        <img src={creator.picture} alt="creador" />
                        {<p className="user-info">{creator.name} {creator.lastname}</p>}
                        {this.props.creator._id === this.props.loggedInUser._id && <Button className="deleteCommentBtn" onClick={() => this.handleDelete(id)}>Borrar</Button>}
                    </div>
                    <div className="commentContent">
                        {content}
                    </div>               
                </div>
            </>
        )
    }
}

export default CommentCard