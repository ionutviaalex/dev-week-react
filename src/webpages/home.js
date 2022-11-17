import React, { useState, useEffect }  from 'react';
import DynamicForm from "./components/DynamicForm";

const Home = () => {
	const [statusMessage1, setStatusMessage1] = useState("TBD");
	const [statusMessage2, setStatusMessage2] = useState("TBD");
	const [statusMessage3, setStatusMessage3] = useState("TBD");
	const [studentGetReturn, setStudentGetReturn] = useState("Empty");
	const [studentPostReturn, setStudentPostReturn] = useState("Empty");
	const [currentTime, setCurrentTime] = useState("Unknown Time");


    const simpleUrl = "https://cors-everywhere.herokuapp.com/" + process.env.REACT_APP_API_URL;
	const healthUrl = simpleUrl + "/";
	const timeUrl = simpleUrl + "/time";
	const studentUrl = simpleUrl + "/api/";

	//GET Time Request, endpoint returns text
	const getTime = () => {
		fetch(timeUrl)
		.then(r => r.text())
		.then((response) => {
			console.log("GET Time response:", response);
			setCurrentTime(response);
			setStatusMessage1("SUCCESS!");
		})
		.catch(error => {
			setStatusMessage1(error.toString());
			console.error('There was an error while getting the time!', error);
		});
	};

    //GET Students Request, endpoint returns JSON with list of students
    const getStudents = () => {
        fetch(studentUrl)
        .then(r => r.json())
        .then((response) => {
            console.log("GET Students response:", response);
            setStudentGetReturn(JSON.stringify(response));
            setStatusMessage2("SUCCESS!");
        })
        .catch(error => {
            setStatusMessage2(error.toString());
            console.error('There was an error while getting the students!', error);
        });
    };

    // POST Student request, endpoint return JSON with the saved student
    const onStudentSubmit = model => {
        console.log("This is the JSON:", JSON.stringify(model));
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(model)
        };
        fetch(studentUrl, requestOptions)
        .then(async response => {
            console.log("POST Student request made with options:", requestOptions);
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                console.log("A wild error appeared!");
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            console.log("POST response:", response);
            console.log("POST JSON:", data);
            setStatusMessage3("SUCCESS!");
            setStudentPostReturn(JSON.stringify(data));
        })
        .catch(error => {
            setStatusMessage3(error.toString());
            console.error('There was an error while posting a student!', error);
        });
    };

return(
        <div>
            <button onClick={getTime}>GET Time</button>
            <h3>{currentTime}</h3>
            <h3>API Status: {statusMessage1}</h3>
            <br/><br/><br/>

			<button onClick={getStudents}>GET Students</button>
            <h3>API Status: {statusMessage2}</h3>
			<h3>GET return:{studentGetReturn}</h3>
			<br/><br/><br/>

			<DynamicForm title="Student"
			    model={[
			        {key:"id", label:"Id", props:{required:true}},
			        {key:"name", label:"Name"},
			        {key:"age", label:"Age", type:"number"},
			    ]}
			    onSubmit = {(model) => {onStudentSubmit(model)}}
			/>
			<h3>API Status: {statusMessage3}</h3>
        </div>
    );
}
export default Home;