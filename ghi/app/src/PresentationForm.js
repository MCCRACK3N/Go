import React, { useEffect, useState } from 'react';

function PresentationForm() {
    const [conferences, setConferences] = useState([]);
    const fetchData = async () => {
        const url = 'http://localhost:8000/api/conferences/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setConferences(data.conferences);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const [conference, setConference] = useState('');
    const handleConferenceChange = (event) => {
        const value = event.target.value;
        setConference(value);
    }

    const [presenterName, setPresenterName] = useState('');
    const handleNameChange = (event) => {
        const value = event.target.value;
        setPresenterName(value);
    }

    const [presenterEmail, setPresenterEmail] = useState('');
    const handleEmailChange = (event) => {
        const value = event.target.value;
        setPresenterEmail(value);
    }

    const [companyName, setCompanyName] = useState('');
    const handleCompanyChange = (event) => {
        const value = event.target.value;
        setCompanyName(value);
    }
    const [title, setTitle] = useState('');
    const handleTitleChange = (event) => {
        const value = event.target.value;
        setTitle(value);
    }

    const [synopsis, setSynopsis]= useState('');
    const handleSynopsisChange = (event) => {
        const value = event.target.value;
        setSynopsis(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.presenter_name = presenterName;
        data.company_name = companyName;
        data.presenter_email = presenterEmail;
        data.title = title;
        data.synopsis = synopsis;
        data.conference = conference;

        const presentationUrl = `http://localhost:8000${conference}presentations/`;
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json',
            },
        };
        const presentationResponse = await fetch(presentationUrl, fetchConfig);
        if (presentationResponse.ok) {
            setPresenterName('');
            setCompanyName('');
            setPresenterEmail('');
            setTitle('');
            setSynopsis('');
            setConference('');
        }
    }
    return (
    <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new presentation</h1>
            <form onSubmit={handleSubmit} id="create-presentation-form">
              <div className="form-floating mb-3">
                <input onChange={handleNameChange} value={presenterName} placeholder="Presenter name" required type="text" name="presenter_name" id="presenter_name" className="form-control" />
                <label htmlFor="presenter_name">Presenter name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleEmailChange} value={presenterEmail} placeholder="Presenter email" required type="email" name="presenter_email" id="presenter_email" className="form-control" />
                <label htmlFor="presenter_email">Presenter email</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleCompanyChange} value={companyName} placeholder="Company name" type="text" name="company_name" id="company_name" className="form-control" />
                <label htmlFor="company_name">Company name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleTitleChange} value={title} placeholder="Title" required type="text" name="title" id="title" className="form-control" />
                <label htmlFor="title">Title</label>
              </div>
              <div className="mb-3">
                <label htmlFor="synopsis">Synopsis</label>
                <textarea onChange={handleSynopsisChange} value={synopsis} className="form-control" id="synopsis" rows="3" name="synopsis"></textarea>
              </div>
              <div className="mb-3">
                <select onChange={handleConferenceChange} value={conference} required name="conference" id="conference" className="form-select">
                  <option value="">Choose a conference</option>
                  {conferences.map(conference =>{
                    return (
                        <option key={conference.href} value={conference.href}>{conference.name}</option>
                    )
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
}

export default PresentationForm;