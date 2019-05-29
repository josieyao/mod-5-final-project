import React from 'react';
import { connect } from 'react-redux'
import { Route } from 'react-router-dom';
import { withRouter } from "react-router"

const mapStateToProps = (state) => ({
    currentUser: state.currentUser
})

// Add the prop methods you want to dispatch to state here:
const mapDispatchToProps = {
    setUser: (user) => {
        return dispatch => {
            dispatch({ type: 'CURRENT_USER', currentUser: user })
        }
    },
}

class PrivateRoute extends React.PureComponent {

    state = {
        redirect: false
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/authorize", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
        })
            .then(async res => {
                if (!res.ok) {
                    this.props.history.push('/login')
                } else {
                    res.json().then(data => {
                        this.props.setUser(data.user)
                    })
                }
            })

    }

    render() {
        const { component: Component, render, ...rest } = this.props;

        const renderRoute = props => {
            return (
                render
                    ? render(rest)
                    : <Component {...props} />
            );

        }

        return (
            <Route {...rest} render={renderRoute} />
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRoute));  