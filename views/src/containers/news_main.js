import React, { Component } from 'react';
import NewsMainItem from './news_main_item';
import { getAllNews } from '../actions/news_actions';
import { connect } from 'react-redux';

class NewsMain extends Component {
	componentDidMount() {
		this.props.getAllNews();
	}
	render() {
		if(this.props.allNews.length == 0) {
			return (
				<div>
					Loading...
				</div>
			)
		}
		return(
			<div className="col-md-offset-1 col-md-10" style={{ marginTop: '1em', marginLeft: '2vw' }}>
   				{ this.props.allNews.map((news) => {
					return (
						<NewsMainItem key={news.id} news={news} />
					)
				}) }
   			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		allNews: state.allNews
	}
}

export default connect(mapStateToProps, { getAllNews })(NewsMain);
