import React, { Component } from 'react';


class CommentBox extends React.Component {
    constructor() {
      super();
      
      this.state = {
        showComments: false,
        comments: [
        ]
        
      };
    }
    
    
    render () {
      const comments = this._getComments();
      let commentNodes;
      let buttonText = 'Show All Comments';


     
      
      if (this.state.showComments) {
        buttonText = 'Hide Comments';
        commentNodes = <div className="comment-list">{comments}</div>;
      }
      
      return(
        <div className="comment-box">
          <h2>Comments</h2>
          <CommentForm addComment={this._addComment.bind(this)}/>
          <button id="comment-reveal" className="badge m-2 badge-warning" onClick={this._handleClick.bind(this)}>
            {buttonText }
          </button>
  
          <h4 className="comment-count">
            {this._getCommentsTitle(comments.length)}
          </h4>
          {commentNodes}
        </div>  
      );
    } 
    
    _addComment( body) {
      const comment = {
        id: this.state.comments.length + 1,
        
        body
      };
      this.setState({ comments: this.state.comments.concat([comment]) });
    }
    
    _handleClick() {
      this.setState({
        showComments: !this.state.showComments
      });
    }

    
    
    _getComments() {    
      return this.state.comments.map((comment) => { 
        return (
          <Comment 
            body={comment.body} 
           />
        ); 
      });
    }
    
    _getCommentsTitle(commentCount) {
      if (commentCount === 0) {
          
        return ' 0 comments';
      } else if (commentCount === 1) {
        return "1 comment";
      } else {
        return `${commentCount} comments`;
      }
    }
  } 
  
  class CommentForm extends React.Component {
    render() {
      return (
        <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
          <div className="comment-form-fields">
            
            <textarea placeholder="Please enter your comment" style={{width:"500px"}}  maxLength={140} rows="5" required ref={(textarea) => this._body = textarea}></textarea>
          </div>
          <div className="comment-form-actions">
             
            <button  className="badge badge-primary m-2"  variant="primary" type="submit">Post Your Comment</button>
          </div>
        </form>
      );
    } 
    
    _handleSubmit(event) { 
      event.preventDefault();   
      let body = this._body;
      this.props.addComment( body.value);
    }
  } 
  
  class Comment extends React.Component {
    render () {
      return(
        <div className="comment">
        
          <p className="comment-body">- {this.props.body}</p>
          <div className="comment-footer">
        
          </div>
          
        </div>
      );
    }
    
  }
  
export default CommentBox;
