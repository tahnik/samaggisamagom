import React, { Component } from 'react';
import { Link } from 'react-router';
import { ROOT_URL } from '../../root_url';
import $ from 'jquery';

var FBsdk;

class NewsHomeItem extends Component {
    componentDidMount(){
        $(document).ready(function() {
            $.ajaxSetup({ cache: true });
            $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
                FB.init({
                    appId: '1762733060676283',
                    version: 'v2.7' // or v2.1, v2.2, v2.3, ...
                });
                $('#loginbutton,#feedbutton').removeAttr('disabled');
                FB.getLoginStatus();
                FBsdk = FB;
            });
        });
    }
    shareViaFacebook() {
        console.log(window.location.href);
        FBsdk.ui({
            method: 'share',
            href: `http://www.samaggisamagom.org/news/${this.props.news.id}`,
        }, function(response){});
    }
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
            <div className="card">
                <div className="card-block">
                    <h3 className="card-title">{this.props.news.title}</h3>
                    <h6 className="card-subtitle text-muted">{this.props.news.created_on.toString().replace(/T|Z/g, ' ')}</h6>
                </div>
                <img style={{ width: '100%' }} src={url} alt="Card image" />
                <div className="card-block">
                    <p className="card-text">{trimmedString}</p>
                    <Link to={`/news/${this.props.news.id}`}><button type="button" className="btn top_nav_buttons">Read more</button></Link>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-4">
                        <button className="btn btn-primary FB_Share" style={{ marginBottom: '1rem' }} onClick={() => this.shareViaFacebook()}>Share</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsHomeItem;
