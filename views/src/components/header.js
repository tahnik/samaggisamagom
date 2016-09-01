import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { signout } from '../actions/auth_actions';
import { browserHistory } from 'react-router';


class Header extends Component {
    componentDidMount() {
        var header = ReactDOM.findDOMNode(this.refs.top_navbar);
        window.addEventListener('scroll', function() {
            if(window.scrollY > 10) {
            	header.style.height = '8vh';
            }else {
                header.style.height = '15vh';
            }
        });
    }
    redirectAuth() {
        if(this.props.authentication.authenticated){
            this.props.signout();
        }else {
            browserHistory.push('/signin');
        }
    }
    renderRole(){
        if(this.props.authentication.role == 1){
            return(
                <Link to={`/create/news`}><button type="button" className="dropdown-item">Create News</button></Link>
            )
        }else {
            return (<div></div>)
        }
    }
    renderCreatePost(){
        if(this.props.authentication.authenticated){
            return (
                <li className="nav-item active">
                    <div className="btn-group">
                        <button className="btn top_nav_buttons dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Navigation
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ borderRadius: 0, backgroundColor: "#e04226" }}>
                            {this.renderRole()}
                            <button type="button" className="dropdown-item" onClick={() => this.redirectAuth()}>Sign out</button>
                        </div>
                    </div>
                </li>
            )
        }else {
            return (
                <li className="nav-item">
                    <button type="button" className="btn top_nav_buttons" onClick={() => this.redirectAuth()}>Sign in</button>
                </li>
            )
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
                <div className="row top_navbar" ref="top_navbar">
                    <div className="col-xs-offset-3 col-xs-6 col-sm-offset-4 col-sm-4 col-md-offset-5 col-md-2 col-lg-offset-0 col-lg-2">
                        <img src="http://samaggisamagom.org/resources/samaggi.png" />
                    </div>
                    <div className="col-xs-12 col-md-12 col-lg-10 top_nav">
                            <nav className="navbar" ref="navbar">
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

                                        { this.renderCreatePost() }
                                    </ul>
                                </div>
                            </nav>
                    </div>
                </div>
                <div className="main_body">
                    { this.props.children }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { authentication: state.authentication };
}

export default connect(mapStateToProps, { signout })(Header);
