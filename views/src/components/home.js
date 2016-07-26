import React, { Component } from 'react';
import NewsHomeGrid from '../containers/news_home_grid';

class Home extends Component {
    render() {
        return(
            <div className="row">
                <NewsHomeGrid />
            </div>
        );
    }
}

export default Home;
