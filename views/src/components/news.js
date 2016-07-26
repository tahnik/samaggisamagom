import React, { Component } from 'react';
import NewsMain from '../containers/news_main';

class News extends Component {
    render() {
        return(
            <div className="row">
                <NewsMain />
            </div>
        );
    }
}

export default News;
