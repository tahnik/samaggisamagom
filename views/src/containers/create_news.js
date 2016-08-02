import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/news_actions';
import { Link } from 'react-router';

class CreatePost extends Component {
	onSubmit(props) {
		this.props.createPost(props);
	}
	renderSubmitButton() {
		if(this.props.create_news.loading) {
			return (
				<button type="submit" className="btn btn-primary" disabled>Submit News</button>
			)
		} else {
			return (
				<button type="submit" className="btn btn-primary">Submit News</button>
			)
		}
	}
	render() {
		if(!this.props.authenticated || this.props.role == 0){
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

						<div className={ `form-group ${title.touched && (title.error && "has-danger") || (!title.active && !title.error && "has-success")}` }>
							<label>Title</label>
							<input type="text" className={ `form-control ${title.touched && (title.error && "form-control-danger") || (!title.active && !title.error && "form-control-success")}` } {...title} />
							{title.touched && title.error && <div className="form-control-feedback">{title.error}</div>}
						</div>

						<div className={ `form-group ${body.touched && (body.error && "has-danger") || (!body.active && !body.error && "has-success")}` }>
							<label>Body</label>
							<textarea type="textarea" className={ `form-control ${body.touched && (body.error && "form-control-danger") || (!body.active && !body.error && "form-control-success")}` } {...body} />
							{body.touched && body.error && <div className="form-control-feedback">{body.error}</div>}
						</div>

						<div className="form-group">
							<label>Upload a file</label>
							<input type="file" className="form-control" {...news_image} value={null} />
							{news_image.touched && news_image.error && <div className="form-control-feedback">{news_image.error}</div>}
						</div>


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

	if (!formProps.title) {
		errors.title = 'Please enter an title';
	}

	if (!formProps.body) {
		errors.body = 'Please enter a body';
	}

	if(!formProps.news_image){
		errors.news_image = "Please choose an image";
	}

	return errors;
}

function mapStateToProps(state) {
	return {
		authenticated: state.authentication.authenticated,
		create_news: state.create_news
	}
}

export default reduxForm({
	form: 'PostsNewNews',
	fields: ['title', 'body', 'news_image'],
	validate
}, mapStateToProps, { createPost })(CreatePost);
