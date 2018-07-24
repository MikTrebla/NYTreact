import React from 'react';
import axios from 'axios';

class SearchForm extends React.Component {
    state = {
        result: [],
        topic: '',
        saved : {
            title: '',
            date: '',
            url:''
        }
    }

    searchNYT = query => {
        axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=8d1a8f1f8fac472d8dd55584973f5e02&q=${this.state.topic}`).then(res => {
            this.setState({
                result : res.data.response.docs
            }, () => {
                console.log(this.state.result)
            })
           
            
        });
    }

    saveArticle = id => {
        // id.preventDefault();
        // console.log('saved pressed');
        let filterArray = this.state.result.filter(article => {
            return article._id === id;
        });
        let filtered = filterArray[0];
        console.log(filtered);
        this.setState({
            saved : {
                title:filtered.headline.main,
                date:filtered.pub_date,
                url:filtered.web_url
            }
        }, () => {
            axios.post('/api/articles',this.state.saved)
            .then( response => {
                console.log('sent to back-end' + response);
            }).catch(err => {
                console.log(err);
            })
        })
    }

    searchInputChange = event => {
        const {
            name,
            value
        } = event.target;
        this.setState({
            [name]: value
        })

    }

    handleFormSubmit = event => {
        event.preventDefault();
        this.searchNYT(this.state.search);
    }

    render() {
        return ( 
            <div >
                <h1 > Search </h1> 
                <div className = 'form-group-row' >
                    <label htmlFor = "example-text-input" 
                        className = "col-2 col-form-label"> Topic 
                    </label> 
                    <div className = "col-10" >
                        <input className = "form-control" 
                        name = 'topic' 
                        type = "text" 
                        value = {this.state.topic} onChange = {this.searchInputChange}
                        id = "example-text-input"/>
                    </div>
                </div> 
            
                <div className = "form-group-row" >
                    <label
                        htmlFor = "example-date-input"
                        className = "col-2 col-form-label" > Date Start 
                    </label> 
                    <br/>
                    <div className = "col-10" >
                        <input className = "form-control"
                        name = 'startdate'
                        type = "date"
                        value = {this.state.startdate}
                        onChange = {this.searchInputChange}
                        id = "example-date-input"/>
                    </div> 
                </div>   
                <div className = "form-group-row" >
                    <label htmlFor = "example-date-input" 
                        className = "col-2 col-form-label"> Date End 
                    </label> 
                    <br/>
                    <div className = "col-10" >
                        <input className = "form-control" 
                            type = "date" 
                            name = 'enddate' 
                            value = {this.state.enddate} 
                            onChange = {this.searchInputChange} 
                            id = "example-date-input"/>
                    </div> 
                </div> 
                    <button type = "submit"
                    className = "btn btn-primary"
                    onClick = {this.handleFormSubmit}> Submit 
                    </button> 

                <div>
                    <h1>Result</h1>
                    {this.state.result.map( (article, i) => {
                        return (
                            <div>
                                <p><a key = {i} 
                                    id = {article._id} 
                                    href={article.web_url}>{article.headline.main}
                                </a></p>
                                <p>
                                    Published:{article.pub_date}
                                </p>
                                <button onClick = {() => this.saveArticle(article._id)}
                                    type = 'submit'> SAVE 
                                </button>
                            </div>
                        )
                    })}
                </div>  
            </div>
        )
              
    }
}

export default SearchForm;