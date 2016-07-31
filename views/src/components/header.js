import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { signout } from '../actions/auth_actions';
import { browserHistory } from 'react-router';


class Header extends Component {
    redirectAuth() {
        if(this.props.authentication.authenticated){
            this.props.signout();
        }else {
            browserHistory.push('/signin');
        }
    }
    renderCreatePost(){
        if(this.props.authentication.authenticated){
            return (
                <li className="nav-item active">
                    <Link to={`/create/news`}><button type="button" className="btn top_nav_buttons">Create News</button></Link>
                </li>
            )
        }else {
            return (<div></div>)
        }
    }
    render(){
        var auth_state;
        if(this.props.authentication.authenticated){
            auth_state = 'Sign out';
        }else {
            auth_state = 'Sign in'
        }
        return(
            <div>
                <div className="row">
                    <div className="col-xs-offset-3 col-xs-6 col-sm-offset-4 col-sm-4 col-md-offset-5 col-md-2 col-lg-offset-0 col-lg-2">
                        <img style={{ width: '100%' }} src="http://samaggisamagom.org/resources/samaggi.jpg" />
                    </div>
                    <div className="col-xs-12 col-md-12 col-lg-10 top_nav">
                            <nav className="navbar">
                                <button className="navbar-toggler hidden-lg-up" type="button" data-toggle="collapse" data-target="#exCollapsingNavbar2">
                                    &#9776;
                                </button>
                                <div className="collapse navbar-toggleable-md" id="exCollapsingNavbar2">
                                    <ul className="nav navbar-nav">
                                        <li className="nav-item active">
                                            <Link to={`/`}><button type="button" className="btn top_nav_buttons">Home</button></Link>
                                        </li>
                                        <li className="nav-item active">
                                            <Link to={`/news?page=1`}><button type="button" className="btn top_nav_buttons">News</button></Link>
                                        </li>
                                        <li className="nav-item">
                                            <button type="button" className="btn top_nav_buttons">Events</button>
                                        </li>
                                        <li className="nav-item">
                                            <input type="text" className="form-control" placeholder="Search" />
                                        </li>
                                        <li className="nav-item">
                                            <button type="button" className="btn top_nav_buttons" onClick={() => this.redirectAuth()}>{ auth_state }</button>
                                        </li>
                                        { this.renderCreatePost() }
                                    </ul>
                                </div>
                            </nav>
                    </div>
                </div>
                { this.props.children }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { authentication: state.authentication };
}

export default connect(mapStateToProps, { signout })(Header);
