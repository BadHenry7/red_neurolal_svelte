// place files you want to import through the `$lib` alias in this folder.
export  async function token_obtener(v_usuario, v_password, todos2, opcion) {
   
      
    // event.preventDefault(); 
    // console.log("sddddddddddddd")
    // const recaptchaResponse = grecaptcha.getResponse();
    // if (recaptchaResponse.length === 0) {
    //     console.log("aaa")

    // Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     text: "Debe completar el CAPTCHA",
    // });
    if (opcion==="true"){


        const response = await fetch("https://red-neuronal-api.onrender.com/generate_token_google", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                usuario: v_usuario,
            }),
        });

        const data = await response.json();
        //return {"access_token": access_token}
        todos2 = data.access_token;
        
        if(todos2!=null){
            console.log("Revisando token2", todos2);
            return (todos2)
        }else{
            todos2="indefenido"
            return (todos2)
        }
    
    }else{
       
  


        const response = await fetch("https://red-neuronal-api.onrender.com/generate_token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                usuario: v_usuario,
                password: v_password,
            }),
        });

        const data = await response.json();
        //return {"access_token": access_token}
        todos2 = data.access_token;
        
        if(todos2!=null){
            console.log("Revisando token2", todos2);
            return (todos2)
        }else{
            todos2="indefenido"
            return (todos2)
        }
        
        
    }
}
