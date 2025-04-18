import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default function About() {
    const team = [
        { role: "Founder", rolekannada: "ಮುಖ್ಯ ಕಾರ್ಯ ನಿರ್ವಾಹಕ ಅಧಿಕಾರಿ", name: "Mr. Sheik Shabbir", photo: "https://i.ibb.co/BtrGMsw/Whats-App-Image-2024-12-21-at-12-41-58-AM.jpg", place: "Moodbidri", mobileNumber: "9740609159" },
        { role: "Managing Director", rolekannada: "ವ್ಯವಸ್ಥಾಪಕ MD", name: "Mr Thoufiq", photo: "https://i.ibb.co/4NYK2Mz/Whats-App-Image-2024-12-20-at-9-38-42-PM.jpg", place: "Moodbidri", mobileNumber: "6361782328" },
        { role: "President", rolekannada: "ಅಧ್ಯಕ್ಷರು", name: "Mr Sufi Rajab Ali", photo: "https://i.ibb.co/W51QySq/Whats-App-Image-2024-12-21-at-12-38-32-AM.jpg", place: "Puttur, Bannur", mobileNumber: "9900225372" },
        { role: "Vice President", rolekannada: "ಉಪಾಧ್ಯಕ್ಷರು", name: "Loyeed Dsouza", photo: "https://i.ibb.co/dp9GVJb/Whats-App-Image-2024-12-21-at-12-39-05-AM.jpg", place: "Manjeshwar, Kasaragod, Kerala", mobileNumber: "8590130454" },
        { role: "Secretary", rolekannada: "ಕಾರ್ಯದರ್ಶಿ", name: "Shahid Moodbidri", photo: "https://i.ibb.co/K0VmCnj/Whats-App-Image-2024-12-21-at-1-48-45-PM.jpg", place: "Moodbidri", mobileNumber: "9606435717" },
        { role: "Joint Secretary", rolekannada: "ಉಪ ಕಾರ್ಯದರ್ಶಿ", name: "Lalitha Ithal", photo: "https://i.ibb.co/JFZQNZK/Whats-App-Image-2024-12-21-at-12-42-28-AM.jpg", place: "Polali, Kaikamba", mobileNumber: "8123089380" },

    ];

    return (
        <>
            <Header />
            <div className="bg-green-50 min-h-screen px-4 sm:px-8 py-6">
                <div className="space-y-10">
                    <div className="text-center flex flex-col gap-4">
                        <h1 className="font-bold text-3xl sm:text-4xl text-green-700">Hope Community Welfare Foundation Trust</h1>
                        <p className="text-green-600 text-base sm:text-lg">A unique charitable welfare initiative focused on supporting the underprivileged while empowering individuals to grow financially through a sustainable team-based model.</p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-lg sm:text-xl font-bold text-green-700">Our Mission</h2>
                        <ul className="list-disc pl-6 space-y-2 text-green-600">
                            <li>Supporting the handicapped</li>
                            <li>Funding wedding costs for poor families</li>
                            <li>Covering hospitalization expenses</li>
                            <li>Providing aid for other critical needs</li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-lg sm:text-xl font-bold text-green-700">How It Works</h2>
                        <p className="text-green-600 text-base">Your one-time investment of <span className="font-semibold">₹351</span> is split into two components:</p>
                        <ul className="list-decimal pl-6 space-y-2 text-green-600">
                            <li><span className="font-semibold">₹51</span>: Directly contributed to our charity fund to support those in need.</li>
                            <li><span className="font-semibold">₹300</span>: Circulated within your team to create financial opportunities for everyone involved.</li>
                        </ul>
                        <p className="text-green-600 text-base">Through this unique model, your contribution not only supports charitable causes but also creates a chain of earnings within your team, ensuring continuous financial benefit.</p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-lg sm:text-xl font-bold text-green-700">ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ</h2>
                        <p className="text-green-600 text-base">ನಿಮ್ಮ ಏಕಕಾಲದ ಹೂಡಿಕೆ <span className="font-semibold">₹351</span> ಎರಡು ಭಾಗಗಳಾಗಿ ವಿಂಗಡಿಸಲಾಗುತ್ತದೆ:</p>
                        <ul className="list-decimal pl-6 space-y-2 text-green-600">
                            <li><span className="font-semibold">₹51</span>: ನಮ್ಮ ಚಾರಿಟಿ ನಿಧಿಗೆ ನೇರವಾಗಿ ದಾನವಾಗಿ ನೀಡಲಾಗುತ್ತದೆ, ಅಗತ್ಯವಿರುವವರಿಗೆ ಬೆಂಬಲ ನೀಡಲು.</li>
                            <li><span className="font-semibold">₹300</span>: ನಿಮ್ಮ ತಂಡದೊಳಗೆ ಹಂಚಲಾಗುತ್ತದೆ, ಎಲ್ಲರಿಗೂ ಆರ್ಥಿಕ ಅವಕಾಶಗಳನ್ನು ಸೃಷ್ಟಿಸಲು.</li>
                        </ul>
                        <p className="text-green-600 text-base">ಈ ವಿಶಿಷ್ಟ ಮಾದರಿಯ ಮೂಲಕ, ನಿಮ್ಮ ಕೊಡುಗೆ ಪರೋಪಕಾರಿ ಕಾರಣಗಳನ್ನು ಬೆಂಬಲಿಸುವುದಲ್ಲದೇ, ನಿಮ್ಮ ತಂಡದೊಳಗೆ ಆದಾಯ ಸರಪಳಿಯನ್ನು ರಚಿಸಿ, ನಿರಂತರ ಆರ್ಥಿಕ ಲಾಭವನ್ನು ಖಚಿತಪಡಿಸುತ್ತದೆ.</p>
                    </div>


                    <div className="space-y-4">
                        <h2 className="text-lg sm:text-xl font-bold text-green-700">Earning Structure</h2>
                        <ul className="list-none space-y-2 text-green-600">
                            <li><span className="font-semibold">2 Members:</span> No income earned yet.</li>
                            <li><span className="font-semibold">4 Members:</span> Earn ₹1200 (₹300 from each member), with ₹600 going towards a leader upgrade.</li>
                            <li><span className="font-semibold">8 Members:</span> Earn ₹4800 (₹600 from each member), with ₹2000 for upgrades.</li>
                            <li><span className="font-semibold">16 Members:</span> Earn ₹32,000 (₹2000 from each), with ₹4000 for upgrades.</li>
                            <li><span className="font-semibold">32 Members:</span> Earn ₹1,28,000 (₹4000 from each), with ₹8000 for upgrades.</li>
                            <li><span className="font-semibold">64 Members:</span> Earn ₹5,12,000 (₹16,000 from each), with ₹16,000 for upgrades donated to charity.</li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-lg sm:text-xl font-bold text-green-700">ಆದಾಯ ಸಂಕಲನ</h2>
                        <ul className="list-none space-y-2 text-green-600">
                            <li><span className="font-semibold">2 ಸದಸ್ಯರು:</span> ಇನ್ನೂ ಆದಾಯ ಲಭ್ಯವಿಲ್ಲ.</li>
                            <li><span className="font-semibold">4 ಸದಸ್ಯರು:</span> ₹1200 (ಪ್ರತಿಯೊಬ್ಬರಿಂದ ₹300), ಇದರಲ್ಲಿ ₹600 ನಾಯಕ ನವೀಕರಣಕ್ಕೆ ಮೀಸಲಾಗಿದೆ.</li>
                            <li><span className="font-semibold">8 ಸದಸ್ಯರು:</span> ₹4800 (ಪ್ರತಿಯೊಬ್ಬರಿಂದ ₹600), ಇದರಲ್ಲಿ ₹2000 ನವೀಕರಣಗಳಿಗೆ.</li>
                            <li><span className="font-semibold">16 ಸದಸ್ಯರು:</span> ₹32,000 (ಪ್ರತಿಯೊಬ್ಬರಿಂದ ₹2000), ಇದರಲ್ಲಿ ₹4000 ನವೀಕರಣಗಳಿಗೆ.</li>
                            <li><span className="font-semibold">32 ಸದಸ್ಯರು:</span> ₹1,28,000 (ಪ್ರತಿಯೊಬ್ಬರಿಂದ ₹4000), ಇದರಲ್ಲಿ ₹8000 ನವೀಕರಣಗಳಿಗೆ.</li>
                            <li><span className="font-semibold">64 ಸದಸ್ಯರು:</span> ₹5,12,000 (ಪ್ರತಿಯೊಬ್ಬರಿಂದ ₹16,000), ಇದರಲ್ಲಿ ₹16,000 ದಾನವಾಗಿ ಚಾರಿಟಿಗೆ ನೀಡಲಾಗುತ್ತದೆ.</li>
                        </ul>
                    </div>


                    <div className="space-y-4">
                        <h2 className="text-lg sm:text-xl font-bold text-green-700">Key Benefits & Restrictions</h2>
                        <ul className="list-disc pl-6 space-y-2 text-green-600">
                            <li><span className="font-semibold">Team Balance:</span> Teams must maintain equal numbers at every level for upgrades.</li>
                            <li><span className="font-semibold">Reapplication:</span> IDs are eligible for reuse once they have earned a minimum of ₹600.</li>
                            <li><span className="font-semibold">Unlimited Potential:</span> You can create unlimited IDs, each eligible for earnings once the ₹600 threshold is met.</li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-lg sm:text-xl font-bold text-green-700">Why Choose Us?</h2>
                        <ul className="list-disc pl-6 space-y-2 text-green-600">
                            <li>Support meaningful causes with every contribution.</li>
                            <li>Earn financial rewards through a transparent and sustainable system.</li>
                            <li>Become part of a community working to uplift the underprivileged while achieving personal growth.</li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-lg sm:text-xl font-bold text-green-700">Helpline Number</h2>
                        <p className="text-green-600">For any queries or doubts, please call <a className="font-semibold" href="tel:+919547526854">+91 9740609159</a>.</p>
                        <p className="text-green-600">ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳು ಅಥವಾ ಅನುಮಾನಗಳಿಗಾಗಿ, ದಯವಿಟ್ಟು ಕರೆ ಮಾಡಿ <a className="font-semibold" href="tel:+919547526854">+91 9740609159</a>.</p>
                    </div>
                </div>

                <div className="my-8">
                    <h2 className="text-lg sm:text-xl font-bold text-green-700 mb-4">Legal Documents</h2>
                    <div className="flex flex-wrap justify-center items-center gap-4">
                        <img className="object-contain w-40 h-40 sm:w-60 sm:h-60 rounded-lg shadow-md" src="https://i.ibb.co/W30j8dt/6318807778126317346.jpg" alt="Pan Card" />
                        <img className="object-contain w-40 h-40 sm:w-60 sm:h-60 rounded-lg shadow-md" src="https://i.ibb.co/6Dmz1yb/6318807778126317347.jpg" alt="Document Sheet" />
                        <img className="object-contain w-40 h-40 sm:w-60 sm:h-60 rounded-lg shadow-md" src="https://i.ibb.co/87TnXgq/6102581128532706792.jpg" alt="Document Sheet" />
                    </div>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-green-700 my-8">Board Members (ಸದಸ್ಯರು)</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {team.map((member, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center border border-green-200 hover:shadow-xl transition-all"
                        >
                            <img
                                src={member.photo}
                                alt={member.name}
                                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mb-4 shadow-md object-contain"
                            />
                            <h2 className="text-lg sm:text-xl font-semibold text-green-800">{member.name}</h2>
                            <div className="flex flex-col justify-center">
                                <p className="text-green-600 text-base">{member.role}</p>
                                <p className="text-green-600 font-semibold text-sm sm:text-base">{member.rolekannada}</p>
                                <p className="text-green-600 text-base">{member.place}</p>
                                <p className="text-green-600 text-base">{member.mobileNumber}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-green-700 my-8">Technical Team</h2>
                <div className='w-full flex flex-col justify-center gap-4 items-center'>
                    <a className='w-fit flex justify-center items-center flex-col gap-4' href="https://hirearrive.in" target="_blank" rel="noopener noreferrer">
                        <img className='object-contain w-40 h-40 sm:w-60 sm:h-60' src="https://i.ibb.co/hx2tMK3B/Card-Remark.png" alt="Hire Arrive" />
                    </a>
                    <div className='flex flex-col justify-center items-center'>
                        <p className='text-green-600 cursor-pointer font-semibold'>For Any Queries Mail Us on</p>
                        <a href="mailto:hirearrive@gmail.com" className="text-green-600 font-semibold">
                            hirearrive@gmail.com
                        </a>
                    </div>

                </div>


            </div>
            <Footer />
        </>
    );
}
