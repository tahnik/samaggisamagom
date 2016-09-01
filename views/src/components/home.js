import React, { Component } from 'react';
import NewsHome from '../containers/home_containers/news_home';

class Home extends Component {
    render() {
        return(
            <div className="row">
                <NewsHome />
            </div>
        );
    }
}

export default Home;
