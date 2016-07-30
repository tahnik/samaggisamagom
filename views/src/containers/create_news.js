import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/news_actions';
import { Link } from 'react-router';

class CreatePost extends Component {
	onSubmit(props) {
		this.props.createPost(props);
	}
	render() {
		if(!this.props.authenticated){
			return (
				<div>
    				Loading...
    			</div>
			)
		}
		const { fields: { title, body, news_image }, handleSubmit } = this.props;
		return(
			<div className="row">
				<div className="col-md-offset-3 col-md-6" style={{ marginTop: '1em' }}>
					<form onSubmit={handleSubmit((props) => this.onSubmit(props))}>
						<h3>Create A New Post</h3>

						<div className="form-group">
							<label>Title</label>
							<input type="text" className="form-control" {...title} />
						</div>

						<div className="form-group">
							<label>Body</label>
							<textarea className="form-control" {...body} />
						</div>

						<div className="form-group">
							<label>Upload a file</label>
							<input type="file" className="form-control" {...news_image} value={null} />
						</div>


						<button type="submit" className="btn btn-primary">Submit</button>
						<Link to="/" className="btn btn-danger" style={{ marginLeft: 10 }}>Cancel</Link>
					</form>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		authenticated: state.authentication.authenticated
	}
}

export default reduxForm({
	form: 'PostsNewNews',
	fields: ['title', 'body', 'news_image']
}, mapStateToProps, { createPost })(CreatePost);
