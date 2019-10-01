import React from "react";
import {
    Card, CardImg, CardText, CardBody, CardTitle
} from 'reactstrap';


export default class UserCard extends React.Component {
    constructor(props) {
        super();
    }
    render() {
        return (
            <div>
                <Card>
                    <CardImg top width="100%" src={this.props.avatar} alt="Card image cap" />
                    <CardBody>
                        <CardTitle><span className="sub-title">Name:</span> {this.props.name}</CardTitle>
                        <CardText><span className="sub-title">Phone</span>: {this.props.phone}</CardText>
                        <CardText>
                            <small className="text-muted">Thich chi do</small>
                        </CardText>
                    </CardBody>
                </Card>
            </div>

        )

    }
}