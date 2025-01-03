import React from 'react';
import Header from './Header';

export default function About() {
    const team = [
        { role: "Founder", rolekannada: "ಮುಖ್ಯ ಕಾರ್ಯ  ನಿರ್ವಾಹಕ ಅಧಿಕಾರಿ ", name: "Mr. Sheik Shabbir", photo: "https://i.ibb.co/BtrGMsw/Whats-App-Image-2024-12-21-at-12-41-58-AM.jpg", place: "Moodbidri", mobileNumber: "9740609159" },
        { role: "Managing Director", rolekannada: "ವ್ಯವಸ್ಥಾಪಕ MD", name: "Mr Thoufiq", photo: "https://i.ibb.co/4NYK2Mz/Whats-App-Image-2024-12-20-at-9-38-42-PM.jpg", place: "Moodbidri", mobileNumber: "6361782328" },
        { role: "President", rolekannada: "ಅಧ್ಯಕ್ಷರು ", name: "Mr Sufi Rajab Ali", photo: "https://i.ibb.co/K0VmCnj/Whats-App-Image-2024-12-21-at-1-48-45-PM.jpg", place: "Puttur, Bannur", mobileNumber: "9900225372" },
        { role: "Vice President", rolekannada: "ಉಪಾಧ್ಯಕ್ಷರು", name: "Loyeed Dsouza", photo: "https://i.ibb.co/dp9GVJb/Whats-App-Image-2024-12-21-at-12-39-05-AM.jpg", place: "Manjeshwar, Kasaragod, Kerala", mobileNumber: "8590130454" },
        { role: "Joint Secretary", rolekannada: "ಉಪ ಕಾರ್ಯದರ್ಶಿ", name: "Lalitha Ithal", photo: "https://i.ibb.co/JFZQNZK/Whats-App-Image-2024-12-21-at-12-42-28-AM.jpg", place: "Polali, Kaikamba", mobileNumber: "8123089380" },
    ];

    return (
        <>
            <Header />
            <div className="bg-green-50 min-h-screen p-6">

                <h1 className="text-4xl font-bold text-green-700 text-center mb-10">About Us</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {team.map((member, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center border border-green-200"
                        >
                            <img
                                src={member.photo}
                                alt={member.name}
                                className="w-24 h-24 rounded-full mb-4  shadow-md object-cover"
                            />
                            <h2 className="text-xl font-semibold text-green-800">{member.name}</h2>
                            <div className='flex flex-col justify-center'>
                                <p className="text-green-600">{member.role}</p>
                                <p className="text-green-600 font-semibold">{member.rolekannada}</p>
                                <p className="text-gray-600">{member.place}</p>
                                <p className="text-gray-600">{member.mobileNumber}</p>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
