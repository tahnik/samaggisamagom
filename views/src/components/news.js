import React, { Component } from 'react';
import NewsMain from '../containers/news_containers/news_main';

class News extends Component {
    render() {
        return(
            <div className="row">
                <NewsMain params={this.props} />
            </div>
        );
    }
}

export default News;
