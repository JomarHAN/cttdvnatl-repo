import React from "react";
import { Link } from "react-router-dom";

function ArticleListItem({ article }) {
  return (
    <div className="col-12">
      {/* <!-- Single Upcoming Artile Area --> */}
      <div className="single-upcoming-events-area d-flex flex-wrap align-items-center">
        {/* <!-- Thumbnail --> */}
        <div className="upcoming-events-thumbnail">
          <img
            src={
              article.image
                ? article.image
                : "http://hvmatl.net/gallery/img/articles/article-logo.png"
            }
            alt=""
          />
        </div>
        {/* <!-- Content --> */}
        <div className="upcoming-events-content d-flex flex-wrap align-items-center">
          <div className="events-text">
            <h4>{article.title}</h4>
            <div className="events-meta">
              <Link to={`/ArticleDetail/${article.date}&true`}>
                <i className="fa fa-calendar" aria-hidden="true"></i>
                {article.date.split("-").reverse().join("-")}
              </Link>
            </div>
            <p>{article.body.substring(0, 101) + "..."}</p>
            {/* <!-- <a href="#">Read More <i className="fa fa-angle-double-right"></i></a> --> */}
          </div>
          <div className="find-out-more-btn">
            <Link
              to={`/ArticleDetail/${article.date}&true`}
              className="btn crose-btn btn-2"
            >
              Xem thêm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleListItem;