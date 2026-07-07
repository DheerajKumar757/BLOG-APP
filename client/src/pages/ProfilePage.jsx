import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

// this let's us destructure the data and use these keys
// even if these values are not yet fetched from server.
export const profileDataStructure = {
    personal_info: {
        fullname: "",
        username: "",
        profile_img: "",
        bio: "",
    },
    account_info: {
        total_posts: 0,
        total_reads: 0
    },
    social_links: {},
    joinedAt: ""
}

const ProfilePage = () => {

    let { id: profileId } = useParams();

    let [ profile, setProfile ] = useState(profileDataStructure);

    // without profileDataStructure we can not destructure below.
    // for destructuring key value pair should be available.
    // destructuring from null gives error.
    let {
        personal_info: { fullname, username: profile_username, profile_img, bio },
        account_info: { total_posts, total_reads },
        social_links,
        joinedAt
    } = profile;

    const fetchUserProfile = () => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-profile", { username: profileId})
        .then(({ data: user }) => {
            setProfile(user)
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchUserProfile()
    }, [])

  return (
    <div>ProfilePage of the User - {profileId}</div>
  )
}

export default ProfilePage