import React, { useState } from 'react';
import { Button, Form, Nav, Navbar } from 'react-bootstrap';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import searchIcon from '../assets/images/search-icon.png';
import youtubeIconLight from '../assets/images/youtube-icon-light.png';
import youtubeIconDark from '../assets/images/youtube-icon-dark.webp';
import daymode from '../assets/images/daymode.png'
import nightmode from '../assets/images/nightmode.webp'

function Home(props) {
    const { activeVid, addComment, comment, comments, getVideos, handleChange, handleSelect, handleSubmit, query, result } = props;
    const baseURL = "https://www.youtube.com/";
    const video = activeVid ? activeVid.id.videoId : "";
    const url = baseURL + "embed/" + video;

    const channel = activeVid ? activeVid.snippet.channelId : "";
    const channelUrl = baseURL + "channel/" + channel;

    let counter = [0, 0];
    const [count, setCount] = useState(counter);

    const [theme, setTheme] = useState('light');

    function handleCounter(index) {
        let curr = count;
        curr[index] = count[index] + 1;
        setCount([
            ...count, curr
        ]);
    }

    const toggleTheme = () => {
        if (theme === 'light') {
            document.getElementById('html').classList.remove('light');
            setTheme('dark');
        } else {
            document.getElementById('html').classList.remove('dark');
            setTheme('light');
        }
    }

    document.getElementById('html').classList.add(theme);

    return (
        <div className={theme}>
            <Navbar>
                <Navbar.Brand href='/'>
                    <img src={theme === 'light' ? youtubeIconDark : youtubeIconLight} alt='YouTube icon' className='youtube' />
                </Navbar.Brand>

                <Nav>
                    <Form className='form' onSubmit={handleSubmit} style={{ width: '750px' }}>
                        <Form.Control
                            type='text'
                            placeholder='Search'
                            className='search-field'
                            name='query'
                            value={query}
                            onChange={handleChange}
                        />
                        <button
                            type='submit'
                            className='search-button'
                            onClick={getVideos}
                        >
                            <img
                                src={searchIcon}
                                alt='Search icon'
                                width={'40px'}
                            />
                        </button>
                    </Form>
                </Nav>

                <button onClick={toggleTheme} className={theme}>
                    {theme ==='light' ? 'dark ' : 'light '}
                    <img src={theme === 'dark' ? daymode : nightmode} alt={theme === 'dark' ? 'day mode' : 'night mode'} className="display-mode"/>
                    mode
                </button>
            </Navbar>

            <main>
                <div id='playing-video' className={theme}>
                    <iframe
                        width='100%'
                        height='63%'
                        src={url}
                        title='YouTube video'
                        allow='autoplay; clipboard-write; encrypted-media; picture-in-picture; fullscreen'
                    ></iframe>
                    <h1>{activeVid && activeVid.snippet.title}</h1>
                    <p>{activeVid && activeVid.snippet.description}</p>

                    <div className="comments">
                        <Form onSubmit={addComment}>
                            <Form.Group className="mb-3" controlId="formText">
                                <Form.Label><h2>Post Comment</h2></Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder='Add a comment...'
                                    style={{ resize: 'none' }}
                                    name='comment'
                                    value={comment}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Button type='submit' className='comment-btn'>Comment</Button>
                        </Form>
                        {
                            comments.map(com => {
                                return (
                                    <div className="comments-list">
                                        <div className="avatar">
                                            AU
                                        </div>
                                        <div className="comment-info">
                                            <p className="user">{com.userName}</p>
                                            <p className="comment">{com.userComment}</p>

                                            <div className="reactions">
                                                <div className="like" onClick={() => { handleCounter(0) }}>
                                                    <FaRegThumbsUp
                                                        className='reactions'
                                                        id='like'
                                                    /><span>{count[0]}</span>
                                                </div>

                                                <div className="dislike" onClick={() => { handleCounter(1) }}>
                                                    <FaRegThumbsDown
                                                        className='reactions'
                                                        id='dislike'
                                                    /><span>{count[1]}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }).reverse()
                        }
                    </div>
                </div>

                <div className='suggestions'>
                    {
                        result.map(res => {
                            return (
                                <div className='suggestion' key={res.id.videoId} onClick={() => handleSelect(res)}>
                                    <div className='video'>
                                        <img src={res.snippet.thumbnails.medium.url} alt={res.snippet.title} />
                                    </div>
                                    <div className='channel'>
                                        <h2>{res.snippet.title}</h2>
                                        <h3><a href={channelUrl} target="_blank" rel="noopener noreferrer">{res.snippet.channelTitle}</a></h3>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </main>
        </div >
    )
}

export default Home;