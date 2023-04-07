// services/profile.service.js
import axios from 'axios';

const API_URL = 'http://159.89.228.162:1000/api/profile/';

class ProfileService {
    async createProfile(userId, education, skills, workExperience, achievements, interests) {
      const response = await axios.post(API_URL + 'create', {
        userId,
        education,
        skills,
        workExperience,
        achievements,
        interests,
      });
      return response.data;
    }
  
    async updateProfile(userId, education, skills, workExperience, achievements, interests) {
      const response = await axios.put(API_URL + 'update/' + userId, {
        education,
        skills,
        workExperience,
        achievements,
        interests,
      });
      return response.data;
    }

    async getProfileByUserId(userId) {
        const response = await axios.get(API_URL + 'profile/' + userId);
        return response.data;
    }
}  

const profileServiceInstance = new ProfileService();
export default profileServiceInstance;
