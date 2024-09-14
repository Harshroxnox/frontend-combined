let container = document.getElementById('container')

toggle = () => {
	container.classList.toggle('sign-in')
	container.classList.toggle('sign-up')
}

setTimeout(() => {
	container.classList.add('sign-in')
}, 200)


const RegistrationForm = document.getElementById("registration");

    RegistrationForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const obj_json = {
            username : name,
            email : email,
            password : password
        };

        const j = JSON.stringify(obj_json);

        registration(j);
    })


    function registration(jsonString) {         
        fetch("http://127.0.0.1:5000/registration", {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : jsonString
        }).then((response) => {
            if(!response.ok){
                throw new Error("Registration Unsuccessful");
            }
            return response.json();
        }).then((data) => {
            console.log(data);
            if('error' in data){
                console.log(data.error);
            }
            else{
                window.location.href = './login.html';
            }
        }).catch((e) => {
            console.error(`Error : ${e}`);
        });
    }

	

const LoginForm = document.getElementById("login");

LoginForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const email = document.getElementById("Lemail").value;
	const password = document.getElementById("Lpassword").value;

	const obj_json = {
		email : email,
		password : password
	};

	const j = JSON.stringify(obj_json);

	login(j);
});

function login(jsonString){
	fetch("http://127.0.0.1:5000/login", {
		method : 'POST',
		headers : {
			'Content-Type' : 'application/json'
		},
		body : jsonString
	}).then((response) => {
		if(!response.ok){
			throw new Error("Login Unsuccessful");
		}
		return response.json();
	}).then((data) => {
		console.log(data);
		if('error' in data){
			console.log(data.error);
		}
		else{
			const token = data.access_token;
			localStorage.setItem("token", token);
			// window.location.href = './chat.html'
		}
	}).catch((e) => {
		console.error(`Error : ${e}`);
	});
}


const account = document.getElementById("acc");

account.addEventListener("submit", (event) => {
	event.preventDefault();
	
	const token = localStorage.getItem('token');

	fetch('http://127.0.0.1:5000/account', {
		method: 'GET',
		headers: {
		'Authorization': `Bearer ${token}`,
		'Content-Type': 'application/json'
		}
	})
		.then(response => response.json())
		.then(data => console.log(data))
		.catch(error => console.error('Error:', error));
});