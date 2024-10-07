<template>
    <v-container class="loginCont" fluid>
        <v-row class="rowLogin">
            <v-col class="imglogin" md="6">
                <v-img   height="100%" width="100%" src="https://pbs.twimg.com/media/FQfcZC7WYAA0DG7.jpg" cover></v-img>
            </v-col>
            <v-col class="login" md="6">
                <v-card class="mx-auto cardLogin">
                    <br><br><br>
                    <v-card-title class="espacio">
                        <p class="titulo">Inicio de Sesión</p>
                    </v-card-title>
                    <br><br>
                    <v-card-text class="espacio">
                        <div>
                            <input type="text" placeholder="Usuario" class="usuario"><br><br><br><br><br>
                            <input type="password" placeholder="Contraseña" class="contraseña">
                        </div>
                        <br><br><br><br>
                        <div>
                            <v-btn class="loginBoton">
                                Iniciar Sesión
                            </v-btn>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'LoginView',
    data() {
        return {
            show1: false,
            show2: true,
            password: '',
            rules: [
                value => !!value || 'Campo requerido.',
                value => (value && value.length >= 8) || 'Mínimo 8 characters',
            ],
        }
    }
}
</script>


<style scoped>
.loginCont {
    width: 100%;
    min-height: 100vh;
    padding: 0;
    margin: 0;
}
.rowLogin{
    height: 100%;
    width: 100%;
}
.imglogin, .login{
    padding: 0;
    margin: 0;
}
.cardLogin {
    height: 753px;
    width: 803px;
    background-color: white;
}
.usuario {
    width: 85%;
    background-color: #cfd8dc;
    border: 2px solid black;
    border-radius: 10px;
    padding: 20px;
    margin-left: 20px;
}
.contraseña {
    width: 85%;
    background-color: #cfd8dc;
    border: 2px solid black;
    border-radius: 10px;
    padding: 20px;
    margin-left: 20px;
}
.loginBoton{
    background-color: #cfd8dc;
    margin-left: 25px;
}

.titulo{
    font-size: 35px;
    margin-left: 20px;
}
</style>