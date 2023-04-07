// services/profile.service.js
import axios from 'axios';

const API_URL = 'https://spheric-method-373719.uc.r.appspot.com/api/profile/';

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
