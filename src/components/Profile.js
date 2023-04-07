// Profile.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import profileServiceInstance from '../services/profile.service';
import authServiceInstance from '../services/auth.service';
import '../styles/Form.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [education, setEducation] = useState('');
  const [skills, setSkills] = useState('');
  const [workExperience, setWorkExperience] = useState('');
  const [achievements, setAchievements] = useState('');
  const [interests, setInterests] = useState('');

  let navigate = useNavigate();

  useEffect(() => {
    const currentUser = authServiceInstance.getCurrentUser();
    setUser(currentUser);

    if (currentUser) {
      profileServiceInstance.getProfileByUserId(currentUser.id)
        .then((data) => {
          setProfile(data);
          setEducation(data.education);
          setSkills(data.skills);
          setWorkExperience(data.workExperience);
          setAchievements(data.achievements);
          setInterests(data.interests);
        })
        .catch((error) => {
          console.error('Error fetching profile:', error);
        });
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const profileData = {
      education,
      skills,
      workExperience,
      achievements,
      interests,
    };

    if (!profile) {
      console.log(user)
      profileServiceInstance.createProfile(user.id, profileData.education, profileData.skills, profileData.workExperience, profileData.achievements, profileData.interests)
        .then(() => {
          // Handle successful profile creation
          navigate('/')
        })
        .catch((error) => {
          console.error('Error creating profile:', error);
          alert('Error creating profile:', error);
        });
    } else {
      profileServiceInstance.updateProfile(user.id, profileData.education, profileData.skills, profileData.workExperience, profileData.achievements, profileData.interests)
        .then(() => {
          // Handle successful profile update
          navigate('/');
        })
        .catch((error) => {
          console.error('Error updating profile:', error);
          alert('Error updating profile:', error);
        });
    }
  };
  
  return (
    <div className="profile-container">
      <h2>Profile Information</h2>
      {user && (
        <form className="profile-form" onSubmit={handleSubmit}>
        
          <label htmlFor="education">Education:</label>
          <p>What is your highest level of education?</p>
          <p>What institutions did you attend?</p>
          <p>What was your major, and what certifications or degrees did you earn?</p>
          <textarea
            id="education"
            name="education"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          />
        
        
          <label htmlFor="skills">Skills:</label>
          <p>What technical or soft skills do you possess that would be relevant to potential employers?</p> 
          <textarea
            name="skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        
        
          <label htmlFor="workExperience">Work Experience:</label>
          <p>What is your current or most recent job title? </p>
          <p>What were your responsibilities and duties in that role? </p>
          <p>What other positions have you held in the past, and what were your responsibilities and achievements in those roles?</p>
          <textarea
            name="workExperience"
            value={workExperience}
            onChange={(e) => setWorkExperience(e.target.value)}
          />
        
        
          <label htmlFor="achievements">Achievements:</label>
          <p>What are some significant accomplishments you have achieved in your career, such as awards, recognitions, or successful projects?</p>
          <textarea
            name="achievements"
            value={achievements}
            onChange={(e) => setAchievements(e.target.value)}
          />
          
          <label htmlFor="interests">Interests:</label>
          <p>What are some of your hobbies and interests outside of work? </p>
          <p>This can help add personality to your CV and show potential employers what you're passionate about.</p>
          <textarea
            name="interests"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
          />
          
        <button type="submit">Save</button>
      </form>
      )}

      </div>
  );
};

export default Profile;
