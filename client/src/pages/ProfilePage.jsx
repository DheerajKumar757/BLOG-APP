import React from 'react'
import { useParams } from 'react-router-dom';

const ProfilePage = () => {

    let { id: profileId } = useParams();

  return (
    <div>ProfilePage of the User - {profileId}</div>
  )
}

export default ProfilePage