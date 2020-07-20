import React, { Component } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import 'font-awesome/css/font-awesome.min.css';

import './App.css';

import SearchForm from './Components/SearchForm';


export default class App extends Component {
	constructor() {
		super();
		this.state = {
			data: [],
			perPage: 10,
			currentPage: 1,
			query:''
		};
		
		this.handlePageClick = this.handlePageClick.bind(this);
	}

	handlePageClick = (e) => {
		const selectedPage = (e.selected + 1);
		//const offset = selectedPage * this.state.perPage;
  
		this.setState({
			currentPage: selectedPage
		}, () => {
			this.performSearch(this.state.query)
		});
  
	};

	
	componentDidMount() {
		this.performSearch();
	}

	// method to retirve the photos after calling the Unspalsh API
	getPhotos(query)
	{
		let client_id='9sJfO7IvQxI1wZE1ZhDBf_LmDOYJeam9g4L3XjPmWxI';
		axios
			.get(
				`https://api.unsplash.com/search/photos?page=${this.state.currentPage}&per_page=10&query=${query}&client_id=${client_id}`
			)
			.then(res => {
			//this.setState({ imgs: data.data.results, loadingState: false });
			//const data = res.data.results;
				let totalPages=res.data.total_pages;
				
				this.setState({query:query});
				this.setState({ data: res.data.results, loadingState: false });
				this.setState({ pageCount: Math.ceil(totalPages / this.state.perPage)})
			})
			.catch(err => {
				console.log('Error happened during fetching!', err);
			});
		
	}
	
	// main method which calls the getphotos method to search for photos
	performSearch = (query,formstatus="") => {

		if (formstatus=="submit")
		{
            // to reset the page link when a new qyery is entered
			this.setState({
				currentPage: 1
			}, () => {
				this.getPhotos(query);
		    });
		}
		else
		{
			this.getPhotos(query);
		}
   
	};

	render() {
		return (
			<div className="divstyle">
				<div className="main-header">
					<div className="inner">
						<h1 className="main-title">Search for photos by tag</h1>
						<SearchForm onSearch={this.performSearch} />
					</div>
					
				</div>
			 
		  	
          <div className="divstyle">
             <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={this.state.pageCount}
                  marginPagesDisplayed={2}
				  pageRangeDisplayed={5}
				  onPageChange={this.handlePageClick}
				  forcePage={this.state.currentPage - 1}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}/>
          </div>

    {this.state.data.map((objImage, index) => (
       <div className="card">
		   <p key={objImage.id}>{objImage.alt_description}</p>
		   <img className="imgstyle" src={objImage.urls.small} ></img>
      </div>
    ))}
         
			</div>
		);
	}
}