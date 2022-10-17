import React, { Component } from 'react';
import { Button, Label, Row, Col, Modal, ModalBody, ModalHeader, Form } from 'reactstrap'
import { Control, LocalForm, Errors } from 'react-redux-form';


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
        alert("Comment values is is: " + JSON.stringify(values));
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

export default CommentForm;