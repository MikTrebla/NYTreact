import React from 'react';
import axios from 'axios';
import './Saved.css';
class Saved extends React.Component {
    state = {
        result : [],
        deleted : {
            id:''
        }
    }

    componentDidMount() {
        this.getArticles();
    }

    getArticles = () => {
        axios.get('/api/articles').then(results => {
            this.setState({
                result:results.data
            })
        })
    }

    deleteArticle = (id) => {
        axios.delete(`/api/articles/${id}`).then(results => {
            this.getArticles();
        }).catch(err => {
            console.log(err);
        })
    }
    
    render() {
        return (
        <div id ='savedContainer'>
            <h1 id = 'savedHeader'>Saved Articles</h1>
            <div className = 'row'>
                <div className = 'col-md-2'></div>
                <div className = 'col-md-8'>
                {this.state.result.map((article, i) => {
                    return (
                        <div key = {i}>
                            <p ><a 
                                className = 'articleName' 
                                id = {article._id} 
                                href={article.url}>
                                {article.title}
                            </a></p>
                                Published:{article.date}
                            <button className = 'btn btn-danger' onClick = {() => this.deleteArticle(article._id)}
                                type = 'submit'> 
                                DELETE 
                            </button>
                        </div>
                    )
                })}
                </div>
                <div className = 'col-md-2'></div>
            </div>
        </div>  
        )}
}

export default Saved;