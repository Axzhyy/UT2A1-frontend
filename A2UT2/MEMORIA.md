# MEMORIA - UT2A2: Login y Enrutamiento

**Nombre:** Santana Rodriguez Joel  
**Asignatura:** Desarrollo Web en Entorno Cliente  
**Fecha:** 24/11/2025

---

## Índice

1. [Login Correcto e Incorrecto](#1-login-correcto-e-incorrecto)
2. [Lógica del Login](#2-lógica-del-login)
3. [Explicación del Enrutamiento](#3-explicación-del-enrutamiento)
4. [Prueba de Rutas](#4-prueba-de-rutas)
5. [Funcionamiento del Error](#5-funcionamiento-del-error)
6. [Navegación tras Login](#6-navegación-tras-login)

---

## 1. Login Correcto e Incorrecto

### Login Correcto
*(Insertar captura de pantalla aquí mostrando el formulario relleno con credenciales correctas y la consola si es posible)*

### Login Incorrecto
*(Insertar captura de pantalla aquí mostrando el mensaje de error "Usuario o contraseña incorrectos")*

---

## 2. Lógica del Login

El componente `Login.tsx` gestiona la autenticación del usuario mediante el uso de estados locales (`useState`).

- Se definen dos estados para capturar la entrada del usuario: `user` y `pass`.
- Se definen dos constantes con las credenciales válidas: `bduser = "joel"` y `bdpasswd = "1234"`.
- Al enviar el formulario (`handleSubmit`), se previene el comportamiento por defecto y se comparan los valores introducidos con las constantes.
- **Si coinciden:** Se usa `useNavigate` de `react-router-dom` para redirigir al usuario a la ruta `/home`.
- **Si no coinciden:** Se activa un estado de error (`setError(true)`), lo que renderiza un componente `Alert` de Material UI indicando que las credenciales son incorrectas.

```tsx
// Fragmento de la lógica
if(user === bduser && pass === bdpasswd){
  setError(false)
  navigate("/home")
} else {
  setError(true)
}
```

---

## 3. Explicación del Enrutamiento

El enrutamiento se ha implementado utilizando `react-router-dom` en el archivo `App.tsx`.

- Se utiliza `createBrowserRouter` para definir la estructura de rutas.
- La ruta raíz `/` renderiza el `Login` como elemento índice (`index: true`).
- Se han definido las rutas hijas `home` y `reports` que renderizan sus respectivos componentes.
- Se ha configurado un `errorElement` (<ErrorPage />) en la raíz para capturar cualquier error de navegación o rutas inexistentes.

```tsx
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Login /> },
      { path: "home", element: <Home /> },
      { path: "reports", element: <Reports /> },
    ],
  },
])
```

---

## 4. Prueba de Rutas

### Ruta /home
*(Insertar captura de pantalla de la página Home)*

### Ruta /reports
*(Insertar captura de pantalla de la página Reports)*

---

## 5. Funcionamiento del Error

Al intentar acceder a una ruta no definida (por ejemplo, `/ruta-inventada`), el router activa el `errorElement`.

*(Insertar captura de pantalla de la página de Error mostrando "Ruta no encontrada" o el error 404)*

---

## 6. Navegación tras Login

Al pulsar el botón "Acceder" con las credenciales correctas, el sistema redirige automáticamente a la página Home.

*(Insertar captura de pantalla de la página Home tras el login)*
