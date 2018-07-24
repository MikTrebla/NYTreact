import React from 'react';
import axios from 'axios';

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
            console.log(results.data);
            this.setState({
                result:results.data
            })
        })
    }

    deleteArticle = (id) => {
        axios.delete(`/api/articles/${id}`).then(results => {
            console.log('deleted' + results);
            // window.location.href = '/saved';
        }).catch(err => {
            console.log(err);
        })
    }
    
    render() {
        return (
        <div>
            <h1 id = 'resultHeader'>Saved Articles</h1>
            {this.state.result.map((article, i) => {
                return (
                    <div>
                        <p ><a 
                            className = 'articleName' 
                            key={i} 
                            id = {article._id} 
                            href={article.url}>
                            {article.title}
                        </a></p>
                            Published:{article.date}
                        <button onClick = {() => this.deleteArticle(article._id)}
                            type = 'submit'> 
                            DELETE 
                        </button>
                    </div>
                )
            })}
        </div>  
        )}
}

export default Saved;