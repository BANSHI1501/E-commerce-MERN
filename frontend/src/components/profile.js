import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: 'exmaple',
        phoneNumber: '7250152489',
        email: 'prasadbanshi123@gmail.com',
        address: 'Phagwara, Punjab, Pin code - 144401',
        profilePic: ""
    });

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const dataResponse = await fetch(SummaryApi.current_user.url, {
                    method: SummaryApi.current_user.method,
                    credentials: 'include',
                });

                if (!dataResponse.ok) {
                    throw new Error('Failed to fetch user details');
                }

                const dataApi = await dataResponse.json();

                if (dataApi.success) {
                    const { name, email, profilePic } = dataApi.data
                    setProfile({
                        name: name,
                        phoneNumber: '7250152489',
                        email: email,
                        address: 'Phagwara, Punjab, Pin code - 144401',
                        profilePic: profilePic
                    })
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, []);

    const handleLogout = async () => {
        const fetchData = await fetch(SummaryApi.logout_user.url, {
            method: SummaryApi.logout_user.method,
            credentials: "include",
        });

        const data = await fetchData.json();

        if (data.success) {
            toast.success(data.message);
            dispatch(setUserDetails(null));
            navigate("/");
        }

        if (data.error) {
            toast.error(data.message);
        }
    };

    return (
        <div className=" mx-96 md:p-6 lg:p-8 bg-white rounded-xl shadow-2xl mt-[100px]">
            <div className="flex items-center justify-between mb-16">
                <h2 className="text-5xl font-bold text-blue-600 mx-14">Profile</h2>
                <div className="flex items-center space-x-2">
                    <button
                        className="px-4 py-2 font-bold text-white bg-green-500 hover:bg-green-700 rounded-xl"
                        onClick={() => window.location.href = '/'}
                    >
                        Home
                    </button>
                    <button
                        className="px-4 py-2 font-bold text-white bg-red-500 hover:bg-red-700 rounded-xl"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
            <div className="flex items-center space-x-4">

                <img
                    src={profile?.profilePic}
                    className="w-[150px] h-[150px] rounded-full bg-blue-500 mx-14 mr-20"
                    alt="img"
                />
                <div className='p-6 border-2 border-black rounded-2xl'>
                    <h3 className="text-lg font-bold">Name: {profile.name}</h3>
                    <p className="text-gray-600">Phone: {profile.phoneNumber}</p>
                    <p className="text-gray-600">Email: {profile.email}</p>
                    <div className="mb-2">
                        <h3 className="mt-5 text-lg font-bold">Address:</h3>
                        <p className="text-gray-600">{profile.address}</p>
                    </div>
                </div>
            </div>
            <Link to="/editProfile">
                <button
                    className="px-4 py-2 mx-10 mt-5 font-bold text-white bg-green-500 hover:bg-green-700 rounded-xl"
                    onClick={() => navigate('/editProfile', { state: profile })}
                >
                    Edit Profile
                </button>
            </Link>
        </div>
    );
};

export default ProfilePage;