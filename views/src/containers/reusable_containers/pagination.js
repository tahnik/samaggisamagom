import React, { Component } from 'react';
import { Link } from 'react-router';

class Pagination extends Component {
    renderNonActive() {
        var pagination = [];
        /* Algorithm to find out which page numbers to show. A better one might exist. */
        var leftMostPageNumber = 1;
        var rightMostPageNumber = this.props.maxPage > 10 ? 9 : this.props.maxPage;

        // this checks if the current page is more then 5. Then sets the page numbers accordingly
        if(this.props.currentPage >= 5 && this.props.maxPage > 10) {
            leftMostPageNumber = this.props.currentPage - 4;

            // We've reached the end of pages. Need to truncate the last parts
            if((this.props.currentPage + 4) > this.props.maxPage) {
                rightMostPageNumber = this.props.currentPage + (this.props.maxPage - this.props.currentPage)
                leftMostPageNumber = this.props.currentPage - ((this.props.currentPage + 4) - rightMostPageNumber) - 4;
            }else {
                rightMostPageNumber = this.props.currentPage + 4;
            }
        }
        for(var i = leftMostPageNumber; i <= rightMostPageNumber ; i++) {
            if(i == this.props.currentPage) {
                pagination.push(
                    <li key={i} className="page-item active">
                        <Link to={`${this.props.root_url}?page=${i}`} className="page-link">{i} <span className="sr-only">(current)</span></Link>
                    </li>
                )
            }else {
                pagination.push(
                    <li key={i} className="page-item">
                        <Link to={`${this.props.root_url}?page=${i}`} className="page-link">{i}</Link>
                    </li>
                );
            }
        }
        return pagination;
    }
    render() {
        return(
            <nav aria-label="...">
                <ul className="pagination">
                    <li className="page-item">
                        <Link className="page-link" to={`${this.props.root_url}?page=1`} aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </Link>
                    </li>
                    { this.renderNonActive() }
                    <li className="page-item">
                        <Link className="page-link" to={`${this.props.root_url}?page=${this.props.maxPage}`} aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Pagination;
