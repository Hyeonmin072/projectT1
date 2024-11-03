import axios from 'axios';
import { useEffect, useState } from 'react';

const UserProfile = ({ userId }) => {
    const [profile, setProfile] = useState(null);

    const fetchProfileData = async () => {
        try {
            const response = await axios.get(`/gamesnap/profile/${userId}`);
            setProfile(response.data);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, [userId]); // userId가 변경될 때마다 다시 데이터 요청

    return (
        <div>
            {profile ? (
                <div>
                    <h1>{profile.name}</h1>
                    <p>Email: {profile.email}</p>
                    <input type="tel" name="phone">전화번호 : </input>
                    <input type="password" name="pw">비밀번호 : </input>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UserProfile;