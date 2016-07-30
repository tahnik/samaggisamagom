import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { signup } from '../actions/auth_actions';
import { Link } from 'react-router';

class Signin extends Component {
	onSubmit(props) {
		this.props.signup(props);
	}
	render() {
		const { fields: { email, password }, handleSubmit } = this.props;
		return(
			<div className="row">
				<div className="col-md-offset-4 col-md-4" style={{ marginTop: '1em' }}>
					<form onSubmit={handleSubmit((props) => this.onSubmit(props))}>
						<h3>Sign up</h3>

						<div className="form-group">
							<label>Email</label>
							<input type="text" className="form-control" {...email} />
						</div>

						<div className="form-group">
							<label>Password</label>
							<input type="password" className="form-control" {...password} />
						</div>

						<button type="submit" className="btn btn-primary">Sign up</button>
						<Link to="/" className="btn btn-danger" style={{ marginLeft: 10 }}>Cancel</Link>
					</form>
				</div>
			</div>
		)
	}
}

export default reduxForm({
	form: 'PostsNewNews',
	fields: ['email', 'password']
}, null, { signup })(Signin);
