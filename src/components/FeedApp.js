import React, { useState, useEffect } from 'react';
import '../styles/FeedApp.css';
import '../styles/LoadingScreen.css';
import JobList from './JobList';
import profileServiceInstance from '../services/profile.service';
import authServiceInstance from '../services/auth.service';
import axios from 'axios';

const fetchData = async (profile) => {
  // Replace this URL with the actual API endpoint you want to fetch data from
  const url = 'http://localhost:8000/process_data';

  // Replace this with the data you want to send in the POST request
  const postData = {
    education: profile.education,
    skills: profile.skills,
    workExperience: profile.workExperience,
    acheivements: profile.acheivements,
    interests: profile.interests
  };

  const response = await axios.post(url, postData);

  const data = await response.data;
  return data;
};

const FeedApp = (props) => {

  const [jobs, setJobs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authServiceInstance.getCurrentUser();

    if (currentUser) {
      props.setRequiresLogin(false)

      profileServiceInstance.getProfileByUserId(currentUser.id)
        .then(fetchData).then((fetchedData) => {
          let pl = [];
    
          for(let i = 0; i < fetchedData['matches'].length; i++) {
            pl.push({
              id: i+1,
              title: fetchedData['matches'][i]['title'],
              company: fetchedData['matches'][i]['company'],
              location: fetchedData['matches'][i]['location'],
              skills: [fetchedData['matches'][i]['jobType'], fetchedData['matches'][i]['jobLevel']],
              salary: fetchedData['matches'][i]['salary'],
              description: fetchedData['matches'][i]['description'],
              description_html: fetchedData['matches'][i]['description_html'],
              url: fetchedData['matches'][i]['url'],
            })
          }
          
          setJobs(pl);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching profile:', error);
        });
    } else {
      props.setRequiresLogin(true)
    }
  }, []);

  if (props.requiresLogin) {
    return (
        <div class="container">
          <p class="centered-text">Login/Register to get a personalized feed of remote AI jobs.</p>
        </div>
      );
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-text">
          Loading
          <span className="loading-dots">
            <span className="dot dot-1">.</span>
            <span className="dot dot-2">.</span>
            <span className="dot dot-3">.</span>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="job-listings">
      <JobList jobs={jobs} />
    </div>
  );
};

export default FeedApp;
