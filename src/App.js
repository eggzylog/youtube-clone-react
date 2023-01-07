import React, { Component } from 'react';
import Home from './components/Home';
import YoutubeAPI from './api/YoutubeAPI';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			maxResults: 25,
			query: '',
			result: [],
			activeVid: false,
			comment: '',
			commentList: []
		}
	}

	handleChange = (e) => {
		// console.log(e.target.name, e.target.value);
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({
			commentList: []
		});
		// console.log('query submitted');
	}

	getVideos = () => {
		const { maxResults, query } = this.state;
		const url = `/search?part=snippet&maxResults=${maxResults}&q=${query}&key=${process.env.REACT_APP_VIDEO_SEARCH_API_KEY}`;
		// get api
		const promise = new Promise((resolve) => {
			const response = YoutubeAPI.get(url);
			resolve(response);
		});
		// promise
		promise.then((response) => {
			this.setState({
				result: response.data.items,
				activeVid: response.data.items[0]
			});
		});
	}

	handleSelect = (selected) => {
		this.setState({
			activeVid: selected,
			commentList: []
		});
	}

	addComment = (e) => {
		e.preventDefault();

		this.state.commentList.push({
			userName: "Anonymous User",
			userComment: this.state.comment
		});

		this.setState({
			comment: ''
		});
	}

	componentDidMount() {
		this.getVideos();
	}

	render() {
		return (
			<React.Fragment>
				<Home
					activeVid={this.state.activeVid}
					comment={this.state.comment}
					comments={this.state.commentList}
					query={this.state.query}
					result={this.state.result}
					addComment={this.addComment}
					getVideos={this.getVideos}
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
					handleSelect={this.handleSelect}
				/>
			</React.Fragment>
		)
	}
}

export default App;