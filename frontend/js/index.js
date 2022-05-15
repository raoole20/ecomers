document.addEventListener("DOMContentLoaded", ()=>{
    app();
})


const app = () =>{
    // create a new user
    sendLoging();
    
    sendRegister();

}


const sendLoging = ()=>{
    
    const buttom = document.querySelector('#btn-2');

    buttom.addEventListener('click', (e)=>{
        e.preventDefault();

        const obj = {
            email: document.querySelector('#email_2').value,
            password: document.querySelector('#password_2').value
        }

        loginUser(obj);
    })
}


const loginUser = async ( obj )=>{
    try {
        const request = await fetch('http://localhost:8080/api/v1/user/login',{
            method: "POST",
            mode: 'cors',
            body: JSON.stringify(obj),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        if( request.status === 200 ){
            return swal({
                title: "Login seccess!",
                text: "Click the buttom ",
                icon: "success",
                button: "exit",
            }).then((e)=>{
                document.querySelector('#show-hide-forms').checked = false;
            })
        }

        console.log( request );

        const msgDiv = document.createElement('DIV');
        msgDiv.innerHTML = `<p>${ request.formData }<p>`
        msgDiv.classList.add('alert');

        const longinHeader = document.querySelector('#login_header');
        longinHeader.appendChild(msgDiv);

    } catch (error) {
        console.log("UPS you have a error", error );
    }
}

const sendRegister = ()=>{
    
    const buttom = document.querySelector('#btn-1');

    buttom.addEventListener('click', (e)=>{
        e.preventDefault();

        const obj = {
            email: document.querySelector('#name').value,
            email: document.querySelector('#email').value,
            password: document.querySelector('#password').value
        }

        registerUser(obj);
    })
}


const registerUser = async ( obj )=>{
    try {
        const request = await fetch('http://localhost:8080/api/v1/user/register',{
            method: "POST",
            mode: 'cors',
            body: JSON.stringify(obj),
            headers:{
                'Content-Type': 'application/json'
            }
        })

        if( request.status === 201 ){
            return swal({
                title: "Registro exitoso!",
                text: "Inicia seccion para continuar!",
                icon: "success",
                button: "Iniciar seccion",
            }).then((e)=>{
                document.querySelector('#show-hide-forms').checked = false;
            })
        }
    } catch (error) {
        console.log("UPS you have a error", error );
    }
}


const showMSG = (element, type, msg)=>{
    
    const msgDiv = document.createElement('DIV');
    msgDiv.innerHTML = `<p>${ msg }<p>`
    msgDiv.classList.add(`alert ${type}`);

    const longinHeader = document.querySelector(element);
    longinHeader.appendChild(msgDiv);

}