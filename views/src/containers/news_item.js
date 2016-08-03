import React, { Component } from 'react';
import { getNews, destroyActiveNews } from '../actions/news_actions';
import { connect } from 'react-redux';
import { ROOT_URL } from '../root_url';

class NewsItem extends Component {
    componentWillUnmount() {
        this.props.destroyActiveNews();
    }
    componentDidMount() {
        this.props.getNews(this.props.params.id);
    }
    render() {
        if(!this.props.activeNews) {
            return (
                <div>
                    loading...
                </div>
            )
        }
        const url=`${ROOT_URL}/news_images/large/${this.props.activeNews.image_path}`;

        return (
            <div className="container">
                <div className="col-md-10">
                    <div className="card">
                        <div className="card-block">
                            <h4 className="card-title">{this.props.activeNews.title}</h4>
                            <h6 className="card-subtitle text-muted">{this.props.activeNews.created_on.replace(/T|Z/g, ' ')}</h6>
                        </div>
                        <img style={{ width: '100%' }} src={url} alt="Card image" />
                        <div className="card-block">
                            <p className="card-text">{ this.props.activeNews.body }</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        activeNews: state.activeNews
    }
}

export default connect(mapStateToProps, { getNews, destroyActiveNews })(NewsItem);
