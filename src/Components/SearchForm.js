import React, { Component } from 'react';

export default class SearchForm extends Component {
	state = {
		searchText: ''
	};

	onSearchChange = e => {
		this.setState({ searchText: e.target.value });
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.onSearch(this.state.searchText,'submit');
		e.currentTarget.reset();
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<span htmlFor="search">Search for a photo</span>
				<input
					type="search"
					className="searchBox"
					onChange={this.onSearchChange}
					value={this.state.searchText}
				    name="search"
					placeholder="Search..."
				/>
				 <button type="submit" className="searchButton">
					<i className="fa fa-search"></i>
				</button>
			</form>
		);
	}
}