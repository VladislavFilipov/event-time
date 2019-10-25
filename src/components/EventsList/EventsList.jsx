import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import auth from '../../auth';

import Header from '../Header/Header';

import './EventsList.scss';

const parseDate = (seconds) => {
    const date = new Date(seconds * 1000);
    const month = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ][date.getMonth()];
    const day = date.getDate();

    return month + ' ' + day;
}

const parseTime = (seconds) => {
    const date = new Date(seconds * 1000);
    const time = (date.getHours() < 10 ? `0${date.getHours()}` : date.getHours())
        + ':' +
        (date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes());

    return time;
}

const tags = ['Programming', 'Comics', 'Programming', 'Comics', 'Programming', 'Comics', 'Programming', 'Comics', 'Programming', 'Comics', 'Programming', 'Comics', 'Programming', 'Comics', 'Programming', 'Comics', 'Programming', 'Comics',];


export default function () {

    let [meetups, setMeetups] = useState([]);
    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://195.123.221.101:8080/api/v1/meetup/',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(response => {
                // console.log(response.data);
                // this.setState({
                //     meetups: response.data
                // })
                setMeetups(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    let [chosenTags, setChosenTags] = useState([]);

    // state = {
    //     meetups: [],
    //     tags: ['Programming', 'Comics', 'Programming', 'Comics', 'Programming', 'Comics', 'Programming', 'Comics', 'Programming', 'Comics', 'Programming', 'Comics', 'Programming', 'Comics', 'Programming', 'Comics', 'Programming', 'Comics',],
    //     chosenTags: []
    // }

    const onAddTagClick = (e) => {
        e.currentTarget.nextElementSibling.classList.toggle('hide');
    }

    const onTagCkick = (e) => {
        // console.log(e.currentTarget.textContent)
        if (!e.currentTarget.classList.contains('active')) {
            e.currentTarget.classList.add('active');
            // this.setState({
            //     chosenTags: this.state.chosenTags.concat(e.currentTarget.textContent)
            // })
            setChosenTags(chosenTags.concat(e.currentTarget.textContent));
        } else {
            e.currentTarget.classList.remove('active');
            let temp = chosenTags;
            temp.splice(temp.indexOf(e.currentTarget.textContent), 1);
            // this.setState({
            //     chosenTags: temp
            // });
            setChosenTags(temp);
        }
    }

    // componentDidMount() {

    //     // window.addEventListener('popstate', () => {
    //     //     console.log(this.props.history.replace('/events-list'));
    //     // })

    //     axios({
    //         method: 'GET',
    //         url: 'http://195.123.221.101:8080/api/v1/meetup/',
    //         headers: {
    //             'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //         }
    //     })
    //         .then(response => {
    //             // console.log(response.data);
    //             this.setState({
    //                 meetups: response.data
    //             })
    //         })
    //         .catch(err => console.log(err));
    // }

    return (
        <div className="EventsList">
            <Header />
            <div className="EventsList__content">
                <div className="EventsList__tags tags">
                    <button className="tags__add" onClick={onAddTagClick}>+ Add Tag</button>
                    <ul className="tags__list hide">
                        {tags.map((tag, i) => (
                            <li key={i}>
                                <button
                                    className="tags__list-item"
                                    onClick={onTagCkick}
                                >
                                    {tag}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="EventsList__meetups">
                    {meetups.map((meetup, i) => (
                        <div key={i} className="EventsList__meetup meetup" style={{ backgroundImage: `url(${meetup.imageUrl})` }}>
                            <div className="meetup__info">
                                <div>
                                    <div className="meetup__name">{meetup.meetup_name}</div>
                                    <div className="meetup__city">Russia, {meetup.city.name_en}</div>
                                </div>
                                <div>
                                    <div className="meetup__date">{parseDate(meetup.start_date)}</div>
                                    <div className="meetup__time">{parseTime(meetup.start_date)}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};