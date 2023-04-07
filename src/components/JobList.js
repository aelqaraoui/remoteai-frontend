import React, { Component } from 'react';
import '../styles/JobList.css'

class JobList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedJob: null,
    };
  }

  handleJobClick(jobId) {
    this.setState((prevState) => ({
      expandedJob: prevState.expandedJob === jobId ? null : jobId,
    }));
  }

  

  render() {
    const { jobs } = this.props;
    const { expandedJob } = this.state;

    return (
      <div className="job-list">
        {jobs.map((job) => (
          <div
            key={job.id}
            className={`job ${expandedJob === job.id ? 'active' : ''}`}
            onClick={() => this.handleJobClick(job.id)}
          >
            <div className="job-details">
              <h3>{job.title}</h3>
              <p>{job.company}</p>
              <p>{job.location}</p>
              <p className="job-salary">{job.salary}</p>
              {expandedJob === job.id && (
                <div className="job-description">
                  <h4>Description</h4>
                  <div dangerouslySetInnerHTML={{ __html: job.description_html }} />
                  {/*<p>{job.description}</p>*/}
                </div>
              )}
            </div>
            <div className="job-skills">
              {job.skills.map((skill, index) => (
                <span key={index} className="skill">
                  {skill}
                </span>
              ))}
            </div>
            <a href={job.url} className="apply-now" target='blank_'>Apply Now</a>
          </div>
        ))}
      </div>
    );
  }
}

export default JobList;
