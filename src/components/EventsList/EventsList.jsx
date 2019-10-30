import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { parseDate, parseTime } from '../usingFuncs';
// import auth from '../../auth';

import Header from '../Header/Header';

import './EventsList.scss';

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

    let [tags, setTags] = useState([]);
    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://195.123.221.101:8080/api/v1/tag/',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(response => {
                setTags(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    const onAddTagClick = (e) => {
        e.currentTarget.nextElementSibling.classList.toggle('hide');
    }

    const onTagCkick = (e) => {
        if (!e.currentTarget.classList.contains('active')) {
            e.currentTarget.classList.add('active');
            setChosenTags(chosenTags.concat(+e.currentTarget.id));
        } else {
            e.currentTarget.classList.remove('active');
            let temp = chosenTags.slice();
            temp.splice(temp.indexOf(+e.currentTarget.id), 1);
            setChosenTags(temp);
        }
    }

    let filteredMeetups = meetups.filter(meetup => {
        if (chosenTags.length === 0) return true;

        let tagsId = meetup.tags.map(tag => tag.id);

        let res = false;
        tagsId.forEach(tagId => {
            if (chosenTags.includes(tagId))
                res = true;
        });

        return res;
    });

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
                                    id={tag.id}
                                >
                                    {tag.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="EventsList__meetups">
                    {filteredMeetups
                        .map((meetup) => (
                            <Link to={`/event-page/${meetup.id}`} key={meetup.id}>
                                <div
                                    className="EventsList__meetup meetup"
                                    style={{ backgroundImage: `url(${meetup.imageUrl})` }}
                                >
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
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    )
};