import { useState } from 'react'
import { useSelector } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GiPuppet } from "react-icons/gi";
import { GiDeathSkull } from "react-icons/gi";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import "./Bibliography.scss";

function Bibliography() {

    const events = useSelector((state) => state.events.events);
    const characters = useSelector((state) => state.characters.characters);
    const ends = useSelector((state) => state.ends.ends);
    const [display_characters, setDisplayCharacters] = useState(false);
    const [display_ends, setDisplayEnds] = useState(false);
    const [display_events, setDisplayEvents] = useState(false);

    function toggleCarousel(carousel) {
        console.log('depuis toggleCarousel carousel: ', carousel)
        switch (carousel) {
            case 'characters':
                setDisplayCharacters(value => !value);
            break;
            case 'events':
                setDisplayEvents(value => !value);
            break;
            case 'ends':
                setDisplayEnds(value => !value);
            break;
        }
    }

    var settings = {
        dots: true,
        fade: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: true,
        speed: 500,
        responsive: [
            {
              breakpoint: 750,
              settings: {
                dots: false,
                fade: true,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 1000,
              settings: {
                dots: true,
                fade: false,
                slidesToShow: 3,
                slidesToScroll: 3,
                initialSlide: 2
              }
            },
            {
                breakpoint: 1490,
                settings: {
                  dots: true,
                  fade: false,
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  initialSlide: 2
                }
            },
        ]
    };
    return ( 
        <div className="bibliography">
            <div className="collection">
                <h2 onClick={() => toggleCarousel('characters')}><GiPuppet />{characters.title}</h2>
                <div className="slider-container" style={{
                    display: display_characters ? "block" : "none"
                }}>
                    <Slider {...settings}>
                        {characters.characters.map((character) => (
                            <div className='character__item' key={`col_item_chara_${character.name}-${character.id}`}>
                                <div className='item'>
                                    <div className='item__description'>
                                        <h3>Character #{character.id}</h3>
                                        <h3>{character.name}</h3>
                                        <h3>{character.description}</h3>
                                    </div>
                                    <div className='item__img' style={{ backgroundImage: 'url(' + character.image + ')' }}></div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
            <div className="collection">
                <h2 onClick={() => toggleCarousel('events')}><GiPerspectiveDiceSixFacesRandom />{events.title}</h2>
                <div className="slider-container" style={{
                    display: display_events ? "block" : "none"
                }}>
                    <Slider {...settings}>
                        {events.events.map((event) => (
                            <div className='event__item' key={`col_item_event_${event.id}`}>
                                <div className='item'>
                                    <h3>Event #{event.id}</h3>
                                    <h3>Content: {event.content}</h3>
                                    <h3>Left: {event.left.text}</h3>
                                    <h3>Right: {event.right.text}</h3>
                                </div> 
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
            <div className="collection">
                <h2 onClick={() => toggleCarousel('ends')}><GiDeathSkull />{ends.title}</h2>
                <div className="slider-container" style={{
                    display: display_ends ? "block" : "none"
                }}>
                    <Slider {...settings}>
                        {ends.ends.map((end) => (
                            <div className='end__item' key={`col_item_end_${end.title}-${end.id}`}>
                                <div className="item">
                                    <div className="item__description">
                                        <h3>End #{end.id}</h3>
                                        <h3>{end.title}</h3>
                                        <h3>Content: {end.content}</h3>
                                    </div>
                                    <div className="item__img" style={{ backgroundImage: 'url(' + end.image + ')' }}></div>
                                    {/* <img src={end.image} alt={end.title} /> */}
                                </div>   
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default Bibliography