<script>
      import Navbaradmin from "$lib/Navbar.svelte";


    import Footer from "../../../../lib/Footer.svelte";
    import { onMount } from "svelte";

    let todos = {};
    let loading = true;
    let error = null;
    let v_usuario = "";
    let v_password = "";
    let v_nombre = "";
    let v_apellido = ""; 
    let v_documento = "";
    let v_telefono = "";
    let v_rol = 3;
    let v_estado = 1;
    let v_genero="";
    let v_edad="";

    onMount(async () => {
        try {
            const response = await fetch("https://api-nodejs-buxf.onrender.com/api/especialidades/getespecialidades");
            if (!response.ok) throw new Error("Error al cargar los datos");
           const data = await response.json();
          let  todos_node=data.data
          console.log("esto es data de node", data)

            console.log("esto es node", todos_node)
            console.log(todos_node[1])
            console.log(todos_node.length)
            

            const Selectespecialidad = document.getElementById("especialista");
            for (let i = 0; i < todos_node.length; i++) {
                const user = todos_node[i];

                const option = document.createElement("option");

                option.value = user.nombre;

                option.textContent = user.nombre;

                Selectespecialidad.appendChild(option);
            }
            

        } catch (e) {
            error = e.message;
            console.log(error)
        } finally {
            loading = false;
        }
    });

    const serviceID = "service_acpug5r";
    const templateID = "template_0hvvaww";
    const apikey = "3bmpPn1S0SLhgotWj";

    function sendEmail() {
        emailjs.init(apikey);
        emailjs
            .send(serviceID, templateID, {
                nombre: v_nombre,
                email: v_usuario,
            })
            .then((result) => {
                alert("Correo enviado con éxito!");
            })
            .catch((error) => {
                console.log("Error al enviar el correo:", error.text);
            });
    }

    async function Register() {
        try {
            console.log("si entra?")
            const response = await fetch("https://red-neuronal-api.onrender.com/create_user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    usuario: v_usuario,
                    password: v_password,
                    nombre: v_nombre,
                    apellido: v_apellido,
                    documento: v_documento,
                    telefono: v_telefono,
                    id_rol: v_rol,
                    estado: v_estado,
                    genero: v_genero,
                    edad: v_edad
                }),
            });

            const data = await response.json(); 

            let id_atributo_v=1
            let estado_v=1

            console.log(data);
            todos= data
            console.log(todos);
            
            let v_id=todos[0];
            console.log("----Este es el v_id")

            console.log(v_id)
            let v_especialidad= document.getElementById("especialista").value;
            console.log("Este es el valor que tiene v_especialidad")
            console.log(v_especialidad)
            if (data.Informacion != "Ya_existe") {
                const response = await fetch("https://red-neuronal-api.onrender.com/create_atributoxusuario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    valor: v_especialidad,
                    descripcion: v_especialidad,
                    id_usuario: v_id,
                    id_atributo: id_atributo_v,
                    estado: estado_v
                }),
            });







            Swal.fire({
                    title: "Registrado!",
                    text: "Usuario ha sido registrado",
                    icon: "success",
                });
                document.getElementById("nombre").value = "";
                document.getElementById("apellido").value = "";
                document.getElementById("documento").value = "";
                document.getElementById("telefono").value = "";
                document.getElementById("usuario").value = "";
                document.getElementById("password").value = "";
                //sendEmail()
            } else {
                alert("Usuario ya registrado");
            }
        } catch (e) {
            error = e.message;
            console.log("Error en la solicitud: " + error);
        }
    }
</script>

<Navbaradmin></Navbaradmin>
<div class="container pt-3">
    <div class="text-center fs-1"><b> 🚑Registro de medico 🚑</b></div>

    <!--<div class="text-end fs-3  text-a-secondary ">
        ¿Ya tienes una cuenta?<a href="/Login" class="text-secondary">Click aqui</a>
    </div>
    
    <border ; ; para redondearlo-->

    <form
        name="formulario"
        id="formulario"
        class="container"
        on:submit={Register}
    >
        <div class="container py-5 ps-4 px-5 mt-5 border border-info">
            <!-- border-danger -->
            <div class="row mt-5 mx-5">
                <div class="col-lg-6 col-md-6 col-sm-6 col-12 col-xl-6">
                    <label for="nombre">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        name="name"
                        placeholder="Escriba el nombre completo"
                        autocomplete="off"
                        class="form-control "
                        required
                        bind:value={v_nombre}
                    />
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-12 col-xl-6">
                    <!--El autocomplete off, es para que no te salga sugerencia de cosas que ya registraste-->
                    <label for="apellido">Apellido</label>
                    <input
                        type="text"
                        id="apellido"
                        name="lastname"
                        placeholder="Escriba su apellido completo"
                        autocomplete="off"
                        class="form-control "
                        required
                        bind:value={v_apellido}
                    />
                </div>
            </div>

            <div class="row mt-4 mx-5">
                <div class="col-lg-6 col-md-6 col-sm-6 col-12 col-xl-6">
                    <label for="documento">Documento</label>
                    <input
                        type="text"
                        id="documento"
                        name="document"
                        placeholder="Escriba el numero de documento"
                        autocomplete="off"
                        class="form-control "
                        required
                        bind:value={v_documento}
                    />
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-12 col-xl-6">
                    <label for="telefono">Telefono</label>
                    <input
                        type="text"
                        id="telefono"
                        name="phone"
                        placeholder="Escriba el numero de telefono o celular"
                        autocomplete="off"
                        class="form-control "
                        required
                        bind:value={v_telefono}
                    />
                </div>
            </div>

            <div class="row mt-4 mx-5">
                <div class="col-lg-6 col-md-6 col-sm-6 col-12 col-xl-6 py-2">
                    <label for="genero">Genero</label>
                    <select id="genero" class="form-select"  bind:value={v_genero}>
                        <option value="" disabled selected>Seleccione un genero</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>

                    </select>
                    

                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-12 col-xl-6 py-2">
                    <label for="edad">Edad</label>
                    <input
                        type="number"
                        id="edad"
                        placeholder="Escriba la edad"
                        required
                        class="form-control"
                        bind:value={v_edad}
                    />
                </div>
            </div>




            <div class="row mt-4 mx-5">
                <div class="col-lg-6 col-md-6 col-sm-6 col-12 col-xl-6 py-2">
                    <label for="usuario">Usuario</label>
                    <input
                        type="text"
                        id="usuario"
                        name="user"
                        placeholder="Escriba su usuario"
                        required
                        class="form-control "
                        bind:value={v_usuario}
                    />
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-12 col-xl-6 py-2">
                    <label for="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Escriba la contraseña"
                        required
                        class="form-control "
                        bind:value={v_password}
                    />
                </div>
            </div>
            <div class="row mt-4 mx-5">
                <div class="col-lg-6 col-md-6 col-sm-6 col-12 col-xl-6">
                    <label for="">Ocupacion</label>
                    <select class="form-select form-control " id="especialista" required>
                        <option selected>Seleccione</option>
                    </select>
                </div>

            </div>
            <div class="row mt-3 mx-5">
                <div class="row mt-4 mx-5">
                    <div
                        class="col-lg-5 col-md-5 col-sm-5 col-12 col-xl-5 py-2"
                    >
                        <!--<input type="checkbox" id="terminos" required />
                        <label
                            ><a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#TerminosCondiciones"
                            >
                                Acepto los términos y condiciones</a
                            ></label
                        >-->
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-12 col-xl-6">
                        <input
                            type="submit"
                            value="Enviar"
                            class="btn text-black btn-info "
                        />
                    </div>
                </div>
            </div>
        </div>
    </form>

    <div><br /></div>
</div>

<!--<div
    class="modal fade"
    id="TerminosCondiciones"
    tabindex="-1"
    aria-labelledby="rModalLabel"
    aria-hidden="true"
>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="mleModalLabel">
                    <b>Términos y Condiciones</b>
                </h5>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
            </div>
            <div class="modal-body">
                <p>
                    <b>1. Aceptación de los Términos: </b>

                    Al acceder y utilizar hospital, aceptas cumplir con estos
                    términos y condiciones. Si no estás de acuerdo con alguno de
                    los términos, te recomendamos que no utilices nuestros
                    servicios.
                </p>
                <p>
                    <b>2. Uso del Contenido: </b>

                    Todo el contenido proporcionado en nuestra pagina y base de
                    datos, incluyendo pero no limitado a texto, imágenes,
                    videos, gráficos y logotipos, está protegido por derechos de
                    autor y otros derechos de propiedad intelectual. No puedes
                    copiar, reproducir, distribuir o modificar dicho contenido
                    sin nuestro permiso expreso por correo.
                </p>
                <p>
                    <b>3. Privacidad: </b>

                    Nuestra política de privacidad describe cómo recopilamos,
                    usamos y protegemos tu información personal. Al utilizar
                    nuestros servicios, aceptas las sgtes practicas:
                    <br />
                    - Los datos registrados no son vendidos ni utilizados para fines
                    comerciales mas allá de estar en esta pagina.
                    <br />
                    - No tratamos con datos de manera intrinseca, por lo que no registramos
                    datos tales como tarjetas de creditos o numeros de cuentas todos
                    los datos que obtenemos son exlusivamente para funcionar la pagina
                    y base de datos.
                    <br />
                    - Su Privacidad es nuestra prioridad, por lo que garantizamos
                    que nadie mas allá de los mismos administradores del gimnasio
                    y nuestros ingenieros tienen acceso a sus datos personales
                </p>

                <p>
                    <b>4. Responsabilidad: </b>

                    No nos hacemos responsables por cualquier pérdida, daño o
                    lesión resultante del uso en el gimnasio, solamente somos un
                    medio facilitador de este. Utiliza los servicios bajo tu
                    propio riesgo.
                </p>
                <p>
                    <b>5. Enlaces a Terceros: </b>

                    Nuestro sitio web puede contener enlaces a sitios web o
                    recursos de terceros. No tenemos control sobre el contenido
                    o las prácticas de privacidad de estos sitios y no asumimos
                    responsabilidad por ellos.
                </p>
                <p>
                    <b>6. Modificaciones de los Términos: </b>

                    Nos reservamos el derecho de modificar estos términos y
                    condiciones en cualquier momento. Cualquier modificación
                    entrará en vigencia inmediatamente después de su publicación
                    por este mismo medio. Es tu responsabilidad revisar
                    periódicamente estos términos.
                </p>
                <p>
                    <b>7. Ley Aplicable: </b>

                    Estos términos y condiciones se rigen por las leyes de
                    colombia y cualquier disputa que surja estará sujeta a la
                    jurisdicción exclusiva de los tribunales de colombia.
                </p>
            </div>
            <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal">Cerrar</button
                >
            </div>
        </div>
    </div>
</div>-->

