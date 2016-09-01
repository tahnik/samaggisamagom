import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { signup } from '../../actions/auth_actions';
import { Link } from 'react-router';

class Signup extends Component {
	onSubmit(props) {
		this.props.signup(props);
	}
	renderSubmitButton() {
		if(this.props.authentication.loading) {
			return (
				<button type="submit" className="btn btn-primary" disabled>Sign up</button>
			)
		} else {
			return (
				<button type="submit" className="btn btn-primary">Sign up</button>
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
		const { fields: { email, password, confirmPassword }, handleSubmit } = this.props;
		return(
			<div className="row">
				<div className="col-md-offset-4 col-md-4" style={{ marginTop: '1em' }}>
					<form onSubmit={handleSubmit((props) => this.onSubmit(props))}>
						<h3>Sign up</h3>

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

						<div className={ `form-group ${confirmPassword.touched && (confirmPassword.error && "has-danger") || (!confirmPassword.active && !confirmPassword.error && "has-success")}` }>
							<label>Confirm Password</label>
							<input type="password" className={ `form-control ${confirmPassword.touched && (confirmPassword.error && "form-control-danger") || (!confirmPassword.active && !confirmPassword.error && "form-control-success")}` } {...confirmPassword} />
							{confirmPassword.touched && confirmPassword.error && <div className="form-control-feedback">{confirmPassword.error}</div>}
						</div>


						{ !this.props.authentication.loading && this.props.authentication.signUperror ? <div style={{ marginBottom: 5, color: "rgb(217, 83, 79)" }}>Something went wrong. Please try again later</div> : <div></div>}
						{ this.renderSubmitButton() }
						<Link to="/" className="btn btn-danger" style={{ marginLeft: 10 }}>Cancel</Link>
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

	if(!formProps.confirmPassword){
		errors.confirmPassword = "Please confirm the password";
	}else if(formProps.password !== formProps.confirmPassword) {
		errors.confirmPassword = "Passwords doesn't match";
	}

	return errors;
}

function mapStateToProps(state) {
	return {
		authentication: state.authentication
	}
}

export default reduxForm({
	form: 'Signup',
	fields: ['email', 'password', 'confirmPassword'],
	validate
}, mapStateToProps, { signup })(Signup);
