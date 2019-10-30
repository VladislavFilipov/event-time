import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { parseDate, parseTime } from '../usingFuncs';

import Header from '../Header/Header';

import './EventPage.scss';

export default function (props) {

    let [info, setInfo] = useState({
        imageUrl: "",
        meetup_name: "",
        city: { name_ru: "" },
        start_date: 0,
        description: ''
    });
    useEffect(() => {
        axios({
            method: 'GET',
            url: `http://195.123.221.101:8080/api/v1/meetup/${props.match.params.meetupId}/`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(response => {
                setInfo(response.data);
            })
            .catch(err => console.log(err));
    }, [props.match]);

    return (
        <div className="EventPage">
            <Header />
            <img className="EventPage__picture" src={info.imageUrl} alt="" />
            <div className="EventPage__info">
                <div className="EventPage__name">{info.meetup_name}</div>
                <div className="EventPage__city"> <i className="fas fa-map-marker-alt"></i> {info.city.name_ru}</div>
                <div className="EventPage__datetime">
                    <span className="EventPage__date">{parseDate(info.start_date)}</span>
                    <span className="EventPage__time">{parseTime(info.start_date)}</span>
                </div>
            </div>
            <div className="EventPage__desc">{info.description} Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia odio, quisquam natus veritatis explicabo itaque voluptas eius? Maxime minus aspernatur repellat voluptates quibusdam pariatur! Itaque tempore necessitatibus, qui sint nemo eaque ullam consequatur placeat labore pariatur. Exercitationem blanditiis eum fuga et ratione? Eaque quidem mollitia iusto perspiciatis perferendis architecto, voluptate, distinctio quas delectus earum vero itaque ex at ipsa aut error enim ab illo consectetur molestiae libero officia officiis, doloremque adipisci! Facilis minima iste nostrum praesentium, molestias molestiae perferendis ea ipsum aperiam possimus, laboriosam voluptatum accusantium voluptate fuga sunt perspiciatis! Sint nobis consectetur dolorum quisquam quasi aliquid illum accusantium quam, quo minus itaque commodi autem doloribus nulla cupiditate animi voluptate veritatis magni delectus pariatur eveniet atque voluptatibus. Atque, molestiae? Ipsa, doloremque. Dolorem, commodi ipsum dolor consequuntur, neque quia nisi et pariatur culpa velit eaque sapiente eum optio minima consectetur, dignissimos aliquam excepturi? Nam dignissimos laudantium nemo, magnam impedit, nulla optio asperiores omnis qui accusantium tempora quos voluptatum, neque minima. Nihil suscipit molestias expedita velit praesentium vitae, veniam obcaecati qui quas ducimus quasi iure tenetur dolorum dignissimos fugiat ullam nostrum deserunt est, unde esse. Nostrum fugit ea porro amet, harum in adipisci doloremque incidunt, dignissimos modi dicta veniam fugiat aut laudantium. </div>
        </div>
    );
}