import React from 'react';
import axios from 'axios';
import './SearchForm.css';

class SearchForm extends React.Component {
    state = {
        result: [],
        topic: '',
        saved : {
            title: '',
            date: '',
            url:''
        },
        start:'',
        end:''
    }

    componentDidMount() {
        this.searchNYT();
    }
    
    searchNYT = () => {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1;
        let yyyy = today.getFullYear();
        if(dd<10) {
            dd = '0'+dd
        } 
        if(mm<10) {
            mm = '0'+mm
        } 
        today = `${yyyy}-${mm}-${dd}`

        if (this.state.start === '' || this.state.end === '') {
            axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?sort=newest&api-key=8d1a8f1f8fac472d8dd55584973f5e02&begin_date=${today}&q=${this.state.topic}`)
            .then(res => {
                this.setState({
                    result : res.data.response.docs
                })
            });
        } else {
           axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?sort=newest&api-key=8d1a8f1f8fac472d8dd55584973f5e02&begin_date=${this.state.start}&end_date=${this.state.end}&q=${this.state.topic}`)
           .then(res => {
                this.setState({
                    result : res.data.response.docs
                })
            }); 
        }
        
    }

    saveArticle = (id) => {

        let filterArray = this.state.result.filter(article => {
            return article._id === id;
        });
        let filtered = filterArray[0];
        this.setState({
            saved : {
                title:filtered.headline.main,
                date:filtered.pub_date,
                url:filtered.web_url
            }
        }, () => {
            axios.post('/api/articles',this.state.saved)
            .then( response => {
                alert('Saved successfully')
            }).catch(err => {
                alert('Sorry, there was an error. Please try again.')
            })
        })
    }

    searchInputChange = (event) => {
        const {name,value} = event.target;
        this.setState({
            [name]: value
        })

    }
    searchDateRange = (event) => {
        const {name,value} = event.target;
        this.setState({
            [name]:value
        }, () => {
            console.log(this.state.start, this.state.end)
        })
    }
    handleFormSubmit = (event) => {
        event.preventDefault();
        this.searchNYT(this.state.search);
    }

    render() {
        return ( 
            <div id = 'container' className='row'>
            <div className='col-md-3'>
            <h1 id = 'searchHeader'> Search </h1> 
                <div id='searchForm'>
                    <div className = 'form-group-row' >
                        <label htmlFor = "example-text-input" 
                            > Topic 
                        </label>
                        <div className = "col-12" >
                            <input className = "form-control" 
                            name = 'topic' 
                            type = "text" 
                            value = {this.state.topic} onChange = {this.searchInputChange}
                            id = "example-text-input"/>
                        </div>
                       
                    </div>
                    <div className = 'form-group-row'>
                        <label htmlFor="start">Start</label>
                        <div className = "col-12" >
                            <input className = "form-control"  onChange ={this.searchDateRange} type="date" id="start" name="start"
                            value={this.state.start}/>
                        </div>
                    </div>
                <div className = 'form-group-row'>
                    <label htmlFor="end">End</label>
                    <div className = "col-12" >
                        <input className = "form-control" onChange ={this.searchDateRange} type="date" id="end" name="end"
                        value={this.state.end}/>
                    </div>
                </div>
                    <br/>
                    <div className = 'button-container'>
                        <button type = "submit"
                        className = "btn btn-info"
                        onClick = {this.handleFormSubmit}> Submit 
                        </button> 
                    </div>
                </div>
            </div>
                
                <div id='resultsContainer col-md-8'>
                    <h1 id = 'resultHeader'>
                        Results
                    </h1>
                    <div className = 'row'>

                        <div className = 'col-md-8 result-container'>
                            {this.state.result.map( (article, i) => {
                                return (
                                    <div key = {i}>
                                        <p ><a className = 'articleName' 
                                            id = {article._id} target = '_blank' 
                                            href={article.web_url}>{article.headline.main}
                                        </a></p>
                                            Published:{article.pub_date}
                                        <button className = 'btn btn-info'onClick = {() => this.saveArticle(article._id)}
                                            type = 'submit'> 
                                            SAVE 
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    </div> 
                </div>  
            </div>
        )
              
    }
}

export default SearchForm;