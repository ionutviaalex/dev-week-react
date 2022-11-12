import React, { useState, useEffect }  from 'react';
const User = () => {
	const [statusMessage1, setStatusMessage1] = useState("TBD");
	const [statusMessage2, setStatusMessage2] = useState("TBD");
	const [getReturn, setGetReturn] = useState("Empty");
	const [postReturn, setPostReturn] = useState("Empty");
	const [postInput, setPostInput] = useState('');
	
	//GET Request using fetch with basic error handling
	const getData = () => {
		fetch("http://localhost/api/time")
		.then(r => r.text())
		.then((response) => {
			console.log("GET response:", response);
			setGetReturn(response);
			setStatusMessage1("SUCCESS!");
		})
		.catch(error => {
			setStatusMessage1(error.toString());
			console.error('There was an error!', error);
		});
	};
  
    // POST request using fetch with error handling
	const handlePostInputChange = (event) => {setPostInput(event.target.value)};
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/text' },
        body: postInput
    };
    const postData = () => {
		fetch('http://localhost/api/json', requestOptions)
        .then(async response => {
			console.log("POST request made with options:", requestOptions);
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
			setStatusMessage2("SUCCESS!");
            setPostReturn(JSON.stringify(data));
        })
        .catch(error => {
			setStatusMessage2(error.toString());
			console.error('There was an error!', error);
        });
	};	
		
return(
        <div>
			<button variant="contained" onClick={getData}>GET</button>
            <h3>API Status: {statusMessage1}</h3>
			<h3>GET return:{getReturn}</h3>
			<br/>
			
			<input type="text" id="post-request-input-message" onChange={handlePostInputChange} value={postInput}></input>
			<button variant="contained" onClick={postData}>POST</button>
			<h3>API Status: {statusMessage2}</h3>
			<h3>POST return:{postReturn}</h3>
        </div>
    );
}
export default User;