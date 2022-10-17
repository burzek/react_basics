import React, {Component} from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, CardImg } from "react-bootstrap";
import { Card, CardText, CardBody, CardTitle, Label, Row, Col, Modal, ModalBody, ModalHeader, Button } from "reactstrap";
import {LocalForm, Control, Errors } from 'react-redux-form';

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
          };
  
          this.toggleModal = this.toggleModal.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(values) {
        alert("Comment values are: " + JSON.stringify(values));
    }


    toggleModal() {
        this.setState({
            isModalOpen : !this.state.isModalOpen
        })
    }

    

    render() {
        
        const CommentDialog = () => {
            const required = (val) => val && val.length;
            const maxLength = (len) => (val) => !(val) || (val.length <= len);
            const minLength = (len) => (val) => val && (val.length >= len);
        
            return (
                <Modal $isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Col md={{size:3, offset:1}}>
                                    <Control.select 
                                        model=".rating"
                                        name="rating"
                                        className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name" md={2}>Your name</Label>
                                <Col md={10}>
                                    <Control.text 
                                        model=".name" 
                                        id="name" 
                                        name="name" 
                                        placeholder="Your Name" 
                                        className="form-control"
                                        validators={{ 
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }} 
                                    /> 
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea
                                        model=".comment"
                                        id="comment" 
                                        name="comment" 
                                        rows="6" 
                                        className="form-control" /> 
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset:2}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
        
            )
        }

        return (
            <React.Fragment>
                <CommentDialog/>
                <Button outline onClick={this.toggleModal}>
                    <span className='fa fa-edit fa-lg'></span>Submit Comment
                </Button>
            </React.Fragment>
        );
    }
}

function RenderDish({dish}) {
    return (
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg top="true" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({comments}) {
    if (comments != null) {
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comments.map((comment) => {
                        return (
                            <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                            </li>
                        );
                    })}
                </ul>
                <CommentForm/>
            </div>
            
        );
    }
}

const DishDetail = (props) => {
    if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish}/>
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    } else {
        return <div></div>
    }
}


export default DishDetail;