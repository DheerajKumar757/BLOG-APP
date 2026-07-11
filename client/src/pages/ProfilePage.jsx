import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AnimationWrapper from '../common/page-animation';
import Loader from '../components/Loader';
import { useContext } from 'react';
import { UserContext } from '../App';

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
    let [ loading, setLoading ] = useState(true);

    // without profileDataStructure we can not destructure below.
    // for destructuring key value pair should be available.
    // destructuring from null gives error.
    let {
        personal_info: { fullname, username: profile_username, profile_img, bio },
        account_info: { total_posts, total_reads },
        social_links,
        joinedAt
    } = profile;

    let { userAuth: { username } } = useContext(UserContext);

    const fetchUserProfile = () => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-profile", { username: profileId})
        .then(({ data: user }) => {
            setProfile(user)
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        })
    }

    const resetStates = () => {
        setProfile(profileDataStructure);
        setLoading(true);
    }

    useEffect(() => {
        resetStates();
        fetchUserProfile()
    }, [profileId])

  return (
    <AnimationWrapper>
        {
            loading ?
            <Loader />
            : (
                <section className='h-cover md:flex flex-row-reverse items-start gap-5 min-[1100px]:gap-12'>
                    <div className='flex flex-col max-md:items-center gap-5 min-w-[250px]'>

                        <img src={profile_img} className='w-48 h-48 bg-gray-200 rounded-full md:w-32 md:h-32'/>

                        <h3 className='text-2xl font-medium'>{profile_username}</h3>

                        <p className='text-xl capitalize h-6'>{fullname}</p>

                        <p>
                            {total_posts.toLocaleString()} Blogs - {total_reads.toLocaleString()} Reads
                        </p>

                        <div className='flex gap-4 mt-2'>
                            {
                                profileId == username ?
                                <Link
                                    to="/settings/edit-profile"
                                    className='btn-light rounded-md'
                                >
                                    Edit Profile
                                </Link>
                                : " "
                            }
                        </div>

                    </div>

                </section>
            )
        }
    </AnimationWrapper>

  )
}

export default ProfilePage