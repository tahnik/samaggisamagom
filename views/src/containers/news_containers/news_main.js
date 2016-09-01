import React, { Component } from 'react';
import NewsMainItem from './news_main_item';
import { getNewsWithPage } from '../../actions/news_actions';
import { connect } from 'react-redux';
import Pagination from '../reusable_containers/pagination';

class NewsMain extends Component {
	/* When the component has mounter check if there's a parameter otherwise grab the first page
	 * Had to use parseInt as the param is string and it was causing problems in if statements inside pagination
	 */
	componentDidMount() {
		if(this.props.params.location.query.page){
			this.props.getNewsWithPage(parseInt(this.props.params.location.query.page));
		}else {
			this.props.getNewsWithPage(1);
		}
	}
	componentDidUpdate() {
		/* Might need a fix in future but working perfectly for now. Not sure if this is an anti pattern.
		 * This code here prevents an inifinte loop. Every time the news page loads it updates once or twice because
		 * of the promise in the action creator. But <Link /> from react router only updates the /news so
		 * the only way to change pages is by updating this news component. So I can get new news whenever the
		 * the component updates. But because it update twice everytime it grabs a new news it gets stuck into
		 * an infinite loop. Below I am checking if the current page and the parameter is same. If it is it doesn't send
		 * any request to action creator and waits for it to finish. Otherwise it sends a new request getting the new
		 * page items. After browsing news with params, if someone goes back to /news it gets into infinite loop
		 * again because the page number in params doesn't exists and it fails the second test. For that the third
		 * test has been added
		 */
		if(this.props.news_pagination.page != null
			&& this.props.news_pagination.page != this.props.params.location.query.page
			&& typeof this.props.params.location.query.page !== 'undefined'
		) {
			if(this.props.params.location.query.page){
				this.props.getNewsWithPage(parseInt(this.props.params.location.query.page));
			}else {
				this.props.getNewsWithPage(1);
			}
		}
		window.scrollTo(0, 0);
	}
	renderNews(){
		var i = 0;
		var newsItems = [];
		this.props.allNews.map((news) => {
			if(i === 3) {
				newsItems.push(<div className="col-md-12" style={{ marginBottom: "20px" }} />)
			}
			newsItems.push(<NewsMainItem key={news.id} news={news} />);
			i++;
		})
		return newsItems;
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
			<div className="col-md-offset-1 col-md-10" style={{ marginTop: '1em'}}>
				<div className="row">
	   				{this.renderNews()}
				</div>
				<Pagination
					currentPage={this.props.news_pagination.page}
					maxPage={this.props.news_pagination.maxPage}
					root_url={"/news"}
					/>
   			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		allNews: state.allNews,
		news_pagination: state.news_pagination
	}
}

export default connect(mapStateToProps, { getNewsWithPage })(NewsMain);
