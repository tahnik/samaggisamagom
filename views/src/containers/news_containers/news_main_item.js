import React, { Component, StyleSheet } from 'react';
import { Link } from 'react-router';
import { ROOT_URL } from '../../root_url';

class NewsMainItem extends Component {
    render() {
        const url=`${ROOT_URL}/news_images/small/${this.props.news.image_path}`;
        var maxLength = 200;
        var trimmedString = this.props.news.body.substr(0, maxLength);

        //re-trim if we are in the middle of a word
        trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))) + '...';
        if(this.props.news.body.length < 300) {
            trimmedString = this.props.news.body;
        }
        return (
            <Link className="news_main_link" to={`/news/${this.props.news.id}`}>
                <div className="col-md-4">
                    <div className="card item news_main_card" style={{ border: 'none' }}>
                        <img style={{ width: '100%' }} src={url} alt="Card image" />
                        <div className="card-block">
                            <h4 className="card-title">{this.props.news.title}</h4>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}

export default NewsMainItem;

//<p className="card-text">{trimmedString}</p>
