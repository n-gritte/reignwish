import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from '../store/userSlice';
import { Link } from "react-router-dom";
import "./GameOver.scss";

function GameOver(props) {
    const ends = useSelector((state) => state.ends.ends.ends);
    const end = selectEnd(ends, props.gameTriggers);
    const profile = useSelector((state) => state.user.profile);
    const dispatch = useDispatch();

    useEffect(() => {
        if(end) {
            const audioElement = new Audio(end.sound);
            const playAudio = () => {
                audioElement.play()
                .catch(error => {
                    console.error('Erreur de lecture audio:', error);
                });
            };

            if(profile.pseudo && profile.email){
                let user = {...profile};
                if(user.trophies){
                    if(user.trophies.indexOf(end.title) === -1) user.trophies = [...user.trophies, end.title];
                }else{
                    user.trophies = [end.title]
                }
                dispatch(updateProfile(user))
            }
            playAudio();
        }
    }, [end]);

    function selectEnd(ends, gameTriggers) {
        
        if (!gameTriggers || !gameTriggers.name || gameTriggers.value === undefined) {
            return null;
        }
        return ends.find(end => {

            const condition = end.condition;
            return condition.some(cond => {
                return cond.name === gameTriggers.name 
                && ((cond.value === 'min' && gameTriggers.value <= 0) || (cond.value === 'max' && gameTriggers.value >= 100));
            });
        });
    }
    
    return(
        <Link className="demo__card" to="/Profile">
            <div className="demo__card__top" style={{ backgroundImage: 'url(' + end.image + ')' }}>
                <p className="demo__card__name">{end.title}</p>
            </div>
            <p className="end__content">
                { end.content }
            </p>
        </Link>
    )
}

export default GameOver;