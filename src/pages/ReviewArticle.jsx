import React, { useEffect, useState } from "react";
import "../css/ReviewArticle.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { connect, useDispatch } from "react-redux";
import {
  deleteRepo,
  getRepoContent,
  postArticle,
} from "../store/dispatch/dispatch";
import LoadingBox from "../components/LoadingBox";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState } from "draft-js";
import { Button } from "react-bootstrap";
import { POST_ARTICLE_RESET } from "../store/actionType";
import { Modal } from "react-bootstrap";

function ReviewArticle({
  getRepoContent,
  match,
  repoContent,
  history,
  postArticle,
  articlePublished,
  deleteRepo,
}) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { loading, repo } = repoContent;
  const { loading: loadingPublish, success: successPublish } = articlePublished;
  const [postModal, setPostModal] = useState(false);
  const [isPost, setIsPost] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getRepoContent(match.params.id);
    if (successPublish) {
      dispatch({ type: POST_ARTICLE_RESET });
      history.push("/article-repo");
    }
  }, [match.params.id, getRepoContent, successPublish, history, dispatch]);

  useEffect(() => {
    if (repo && repo?.content) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(repo.content)))
      );
    }
    if (isPost) {
      postArticle(repo);
    }
  }, [repo, isPost, postArticle]);

  const postModelClose = () => {
    setPostModal(false);
  };

  return (
    <div>
      <Header />
      <div className="reviewArticle__container">
        {loading && <LoadingBox />}
        {repo && (
          <section class="blog-content-area section-padding-100">
            <div class="container">
              <div class="row justify-content-between">
                {/* <!-- Blog Posts Area --> */}
                <div class="col-12 col-lg-12">
                  <div class="blog-posts-area">
                    {/* <!-- Post Details Area Start --> */}

                    <div class="single-post-details-area">
                      {/* <!-- <div class="post-thumbnail mb-30 col-12 col-lg-2"><img src="" alt=""></div> --> */}

                      <div class="post-content col-12 col-lg-auto">
                        {repo.isLetters ? (
                          <h2 class="post-title">{repo.title}</h2>
                        ) : (
                          <h2 class="post-title">Parish Activies</h2>
                        )}
                        <Editor
                          readOnly
                          toolbarHidden
                          editorState={editorState}
                        />
                      </div>
                    </div>
                    {/* <!-- Post Details Area End --> */}
                  </div>
                  <div className="reviewArticle__buttonGroup">
                    <Button
                      variant="primary"
                      onClick={() => history.push(`/write-article/${repo._id}`)}
                    >
                      Editor
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => history.push(`/article-repo`)}
                    >
                      Repository
                    </Button>
                    <Button
                      variant="success"
                      onClick={() => setPostModal(true)}
                    >
                      {loadingPublish ? <LoadingBox /> : "Post"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <Modal show={postModal} onHide={postModelClose}>
              <Modal.Header>
                <div>
                  Are you wanting to post{" "}
                  <b>
                    <i>{repo.title ? repo.title : repo.date}.</i>
                  </b>
                </div>
              </Modal.Header>
              <Modal.Footer>
                <Button variant="primary" onClick={postModelClose}>
                  Cancel
                </Button>
                <Button variant="success" onClick={() => setIsPost(true)}>
                  Post
                </Button>
              </Modal.Footer>
            </Modal>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  repoContent: state.repoContent,
  articlePublished: state.articlePublished,
});

const mapDispatchToProps = (dispatch) => ({
  getRepoContent: (repoId) => getRepoContent(dispatch, repoId),
  postArticle: (repo) => postArticle(dispatch, repo),
  deleteRepo: (repoId) => deleteRepo(dispatch, repoId),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewArticle);
