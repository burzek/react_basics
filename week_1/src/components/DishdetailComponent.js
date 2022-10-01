import { Component } from "react";
import { CardImg, Card, CardBody, CardTitle, CardText} from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {ss : props.selectedDish}
    }

    renderDish(dish) {
        return (
            <Card>
                <CardImg width="30%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }

    renderComments(dish) {
            if (Array.isArray(dish.comments) && dish.comments.length === 0) {
                return (<div></div>)
            } else {
                const comments = dish.comments.map((c) => {
                    return (
                        <ul key={c.id} className="list-unstyled">
                            <li>{c.comment}</li>
                            <li>-- {c.author}, {new Date(c.date).toDateString()}</li>
                        </ul>
                    )
                });
                return (
                    <div>
                        <h4>Comments</h4>
                        {comments}
                    </div>
            )}
    }

    render() {
        const selectedDish = this.props.selectedDish;
        
        if (selectedDish == null) {
            return (
                <div></div>
            );
        } else {
            return(
                <div className='row'>
                    <div className='col-12 col-md-5 m-1'>
                        {this.renderDish(selectedDish)}
                    </div>
                    <div className='col-12 col-md-5 m-1'>
                        {this.renderComments(selectedDish)}
                    </div>
                </div>
            );
        }
    }

}

export default DishDetail;

