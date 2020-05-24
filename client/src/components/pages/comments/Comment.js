import React from 'react'
import Col from 'react-bootstrap/Col'
import './Comment.css'

const CommentCard = props => {
    return (
        <>
            <div className="comments">
                <Col md={{ span: 8, offset: 1 }}>
                    {props.creator && <h6 className="user-info">{props.creator.username}</h6>}
                    <hr></hr>
                </Col>
                <Col md={{ span: 8, offset: 1 }} >
                    {props.content}
                </Col>
                {/* <Col md={{ span: 8, offset: 1 }} className="rating-info">
                    {props.rating}<img style={{ width: '10px' }} src='/images/star-icon.png' alt="Star icon" />
                </Col> */}
            </div>
        </>
    )
}
export default CommentCard