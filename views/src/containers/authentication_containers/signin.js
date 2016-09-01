import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { signin } from '../../actions/auth_actions';
import { Link } from 'react-router';

class Signin extends Component {
	onSubmit(values, dispatch) {
		this.props.signin(values);
	}
	renderSubmitButton() {
		if(this.props.authentication.loading) {
			return (
				<button type="submit" className="btn btn-primary" disabled>Sign in</button>
			)
		} else {
			return (
				<button type="submit" className="btn btn-primary">Sign in</button>
			)
		}
	}
	render() {
		if(this.props.authentication.authenticated){
			return (
				<div>
    				Loading...
    			</div>
			)
		}
		const { fields: { email, password }, handleSubmit } = this.props;
		return(
			<div className="row">
				<div className="col-md-offset-4 col-md-4" style={{ marginTop: '1em' }}>
					<form onSubmit={handleSubmit((values, dispatch) => this.onSubmit(values, dispatch))}>
						<h3>Sign in</h3>

						<div className={ `form-group ${email.touched && (email.error && "has-danger") || (!email.active && !email.error && "has-success")}` }>
							<label>Email</label>
							<input type="text" className={ `form-control ${email.touched && (email.error && "form-control-danger") || (!email.active && !email.error && "form-control-success")}` } {...email} />
							{email.touched && email.error && <div className="form-control-feedback">{email.error}</div>}
						</div>

						<div className={ `form-group ${password.touched && (password.error && "has-danger") || (!password.active && !password.error && "has-success")}` }>
							<label>Password</label>
							<input type="password" className={ `form-control ${password.touched && (password.error && "form-control-danger") || (!password.active && !password.error && "form-control-success")}` } {...password} />
							{password.touched && password.error && <div className="form-control-feedback">{password.error}</div>}
						</div>
						{ !this.props.authentication.loading && this.props.authentication.error ? <div style={{ marginBottom: 5, color: "rgb(217, 83, 79)" }}>Incorrect Username or Password</div> : <div></div>}
						{ this.renderSubmitButton() }
						<Link to="/" className="btn btn-danger" style={{ marginLeft: 10 }}>Cancel</Link>
						<br /> <br />
						<Link to="/signup">Not Registered?</Link>
					</form>
				</div>
			</div>
		)
	}
}

function validate(formProps) {
	const errors = {};
	const EMAIL_VALIDATOR_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
	const PASSWORD_VALIDATOR_REGEX = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

	if (!formProps.email) {
		errors.email = 'Please enter an email';
	}else if(EMAIL_VALIDATOR_REGEX.exec(formProps.email) === null) {
		errors.email = "Please enter a valid email";
	}

	if (!formProps.password) {
		errors.password = 'Please enter a password';
	}else if(PASSWORD_VALIDATOR_REGEX.exec(formProps.password) === null) {
		errors.password = "Password must have an Uppercase and Lowercase Letter and a number. It must be at least 6 characters long"
	}

	return errors;
}

function mapStateToProps(state) {
	return {
		authentication: state.authentication
	}
}

export default reduxForm({
	form: 'Signin',
	fields: ['email', 'password'],
	validate
}, mapStateToProps, { signin })(Signin);
