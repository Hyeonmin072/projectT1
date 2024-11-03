import axios from 'axios';
import { useEffect, useState } from 'react';

const UserProfile = ({ userid }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProfileData = async () => {
        try {
            const response = await axios.get(`/gamesnap/profile/${userid}`);
            setProfile(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching profile data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, [userid]); // userId가 변경될 때마다 다시 데이터 요청

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <p></p>
                </div>
            )}
        </div>
    );
};

export default UserProfile;