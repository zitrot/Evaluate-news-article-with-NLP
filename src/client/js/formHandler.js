function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value

    Client.checkForName(formText)

    console.log(formText)
    postData('http://localhost:8081/articleinfo', { url: formText }).then((data) => {
        console.log("data recieved", data);
        document.getElementById('results').innerHTML = data.agreement + " " + data.confidence + " " + data.subjectivity + " " + data.irony;
    });
}
const postData = async(url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};
export { handleSubmit }