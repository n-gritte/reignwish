import React, { useState, useEffect } from 'react';
import { updateProfile } from '../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import './Profile.scss';

function Profile() {

    const dispatch = useDispatch()
    const profile = useSelector((state) => state.user.profile)
    const [pseudo, setPseudo] = useState(!profile.pseudo ? "" : profile.pseudo)
    const [email, setEmail] = useState(!profile.email ? "" : profile.email)

    useEffect(() => {
        if (profile != null) {
            setPseudo(profile.pseudo)
            setEmail(profile.email)
        }
    }, [profile])


    const handleProfile = (e) => {
        e.preventDefault()
        let user = {
            pseudo: pseudo,
            email: email,
        }
        dispatch(updateProfile(user))
    }

    return (
        <div className='profile'>
            <div className='profile__msg__block'>
                <h1>Bonjour {profile == null ? "User" : profile.pseudo}</h1>
                <h2>Créez votre profil pour suivre votre progression et améliorer votre expérience</h2>
            </div>
            <div className='profile__form__block'>
                <form onSubmit={handleProfile}>
                    <div className='profile__input__block'>
                        <label>Pseudo</label>
                        <input type="text" value={pseudo || ''} onChange={(e) => setPseudo(e.target.value)} placeholder="Name ..." />
                    </div>
                    <div className='profile__input__block'>
                        <label>Email</label>
                        <input type="text" value={email || ''} onChange={(e) => setEmail(e.target.value)} placeholder="Email ..." />
                    </div>
                    <div className='profile__submit__block'>
                        <input type='submit'/>
                    </div>
                </form>
            </div>
            {profile.trophies && 
                <div className='profile__achievements__block'>
                    Liste des trophées :
                    <ul>
                        {profile.trophies.map((trophy, index) => (
                            <li key={index}>{trophy}</li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    )
}

export default Profile