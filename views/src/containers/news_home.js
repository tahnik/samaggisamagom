import React, { Component } from 'react';
import NewsHomeItem from './news_home_item';
import { getTopNews } from '../actions/news_actions';
import { connect } from 'react-redux';

class NewsHome extends Component {
	componentDidMount() {
		this.props.getTopNews();
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
			<div className="col-md-6" style={{ marginTop: '1em', marginLeft: '2vw' }}>
   				{ this.props.allNews.map((news) => {
					return (
						<NewsHomeItem key={news.id} news={news} />
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

export default connect(mapStateToProps, { getTopNews })(NewsHome);
