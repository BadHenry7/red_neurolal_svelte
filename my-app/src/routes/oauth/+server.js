import { redirect, json } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';
import {SECRET_CLIENT_ID,SECRET_CLIENT_SECRET} from '$env/static/private';
import { onMount } from "svelte";





let error=null;


async function getUserData(access_token) {

  const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
  console.log('response',response);
  const data = await response.json();
  console.log('data:-------------------------------------------------------',data);
  return data;
}


async function verificarUsuarioEnBD(user) {
  console.log("user tiene", user)
  const res = await fetch("https://red-neuronal-api.onrender.com/verif_user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
      google_id: user.google_id,
      foto: user.foto,
      access_token: user.access_token,
      estado: 1,
      usuario: user.email,
      nombre: user.given_name,
      apellido: user.family_name,
      })
  });

  return await res.json();
}


var rol_v=0
let estado_v=0
let v_estado=0
export const GET = async ({ url, cookies}) => {
    const redirectURL = 'https://red-neuronal-api.onrender.com/oauth';
    const code = await url.searchParams.get('code');

    //console.log('returned state',state)
    console.log('returned code',code)

    try {
        const oAuth2Client = new OAuth2Client(
          SECRET_CLIENT_ID,
          SECRET_CLIENT_SECRET,
            redirectURL
          );
        const r = await oAuth2Client.getToken(code);
        // Make sure to set the credentials on the OAuth2 client.
        oAuth2Client.setCredentials(r.tokens);
        console.info('Tokens acquired.');
        //const user = oAuth2Client.credentials;
        const user = await getUserData(r.tokens.access_token);
        console.log('credentials',user);

        //await getUserData(user.access_token);

        const usuarioBD = await verificarUsuarioEnBD({
          google_id: user.sub,  // ID único de Google
          nombre: user.name,
          email: user.email,
          foto: user.picture,
          access_token: r.tokens.access_token,
          given_name: user.given_name,
          family_name: user.family_name
      });
      let v_google_id=user.sub;
      let v_nombre=user.name;
      let v_email=user.email;
      let v_foto=user.foto;
      let access_token=r.tokens.access_token
      
     console.log("Respuesta del backend:", usuarioBD);
      let v_id= usuarioBD.id?usuarioBD.id:1;
      rol_v= usuarioBD.rol_v?usuarioBD.rol_v:1;
       v_estado= usuarioBD.estado?usuarioBD.estado:false;


      estado_v = usuarioBD.Informacion;
      
      cookies.set('sesionGoogle', JSON.stringify({
        google_id: user.sub,
        nombre: user.given_name,
        apellido: user.family_name,
        email: user.email,
        foto: user.picture,
        access_token: r.tokens.access_token,
        estado: estado_v,
        id: v_id,
        rol_v: rol_v
        }), {
            path: '/',
        httpOnly: false,
        secure: true,
        sameSite: "None",
        maxAge: 60 * 60 * 24 * 7 // 1 semana
      });
      
      
     error=null
      

     

      } catch (err) {
        console.log('Error logging in with OAuth2 user', err);
        error= err
       throw redirect(303, '/Login');

    }
    finally{

      if (error){

       throw redirect(303, '/Login');

      }

      if (estado_v==="Ya_existe" && v_estado!=false){
        if (rol_v==1){
          throw redirect(303, '/administrador_vista');
        }
        else if (rol_v==2){
          throw redirect(303, '/usuario');
        }
        else if (rol_v==3){
          throw redirect(303, '/doctor_adm');
        }
        else {
          throw redirect(303, '/vista_main');
        }
      }else if (estado_v==="Registrada" ){
        console.log("Estado actual:", estado_v, "Rol:", rol_v);

        throw redirect(303, '/completar_informacion');
      }else if (estado_v==="Ya_existe" && v_estado==false){

        throw redirect(303, '/completar_informacion');
      }
    }
      throw redirect(303, '/usuario');
    
};