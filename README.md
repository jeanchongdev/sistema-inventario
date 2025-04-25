# 🎥✨ CineStream – Tu plataforma de cine en casa

<p align="center">
  <img src="https://i.postimg.cc/6QZXqrdt/inventario-React.png" alt="CineStream Preview" width="100%" height="100%" />
</p>

--------------------------------------------------------------------------------------------------

# 📝 Descripcion

**El proyecto consiste en un Sistema de inventario, en donde el usuario podrá agregar los productos que desee ya sea de cualquier tipo ósea ropa, calzados, ropa de vestir, etc. También le permite visualizar los productos agregados en la parte de abajo donde también le da la posibilidad de editar o eliminar dicho producto, también hay algunas validaciones que debemos de aclarar, si el usuario pone ya sea un carácter especial en el nombre pues rápidamente le mandara una alerta diciéndole que el nombre no debe de contener caracteres especiales por ejemplo como se puede ver en la imagen a continuación. Bien así sucesivamente pasara con los demás campos ya sea “precio”, “stock”, o “fecha de vencimiento” hay que aclarar algo que si el usuario pone una fecha anterior ya sea una fecha que paso antes ayer pues automáticamente le mandara la alerta diciéndole que coloque una fecha valida, también las validaciones están en el precio y stock, si el usuario pone ya sea un número negativo automáticamente le mostrara la alerta que no se permiten numero negativos el proyecto es 100% y editable también si el usuario desea editar algún producto o también eliminarlo podrá hacerlo.**

--------------------------------------------------------------------------------------------------
**Tecnologías utilizadas en el proyecto:**  
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" height="40px" width="40px"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg" height="40px" width="40px"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg" height="40px" width="40px"/>
--------------------------------------------------------------------------------------------------


## 🚀 Instalación rápida

**Copia y pega este comando en tu terminal de VS Code para comenzar:**

```bash
git clone https://github.com/jeanchongdev/sistema-inventario.git
```
## 🚀 Instalación de dependencias
**Para que pueda usar sweetalert2**

```bash
npm install sweetalert2 bootstrap react-bootstrap
npm install
npm install axios
```

## 🚀 Configuracion para MongoDB
1. **Crea la base de datos** `pruebas` en MongoSH si aún no existe.<br>
**[Descargar MongoDB la version 7](https://www.mongodb.com/try/download/community)** <br>
**[Descargar MongoSH la version 2.5 entran a la carpeta bin](https://www.mongodb.com/try/download/shell)**

```bash
Una ves en la aplicación MongoSH crear la base de datos
1ro:
mongosh
2do:
use prueba
3ro:
db.productos.insertOne({nombre:"Cartera",precio:"60.50"})
```

## 🚀 Configuracion para Postman
2. **Crear un nuevo "Collections" el nombre que desee luego crear lo siguiente**.

```bash
GET: `http://localhost:3000/productos`
POST: `http://localhost:3000/productos`
PUT: `http://localhost:3000/productos/:id`
PATCH: `http://localhost:3000/productos/:id`
DELETE: `http://localhost:3000/productos/:id`
reemplazar los id por el id correcto del producto agregado
```

--------------------------------------------------------------------------------------------------

## 👀 Ojo

**La pagina es adaptable a dispositivo movil mejor dicho es responsivo😊**

## 👨‍💻 Autor
**Desarrollado 🖤 por @jeanchongdev** <br>
🔗 **[Visita mi portafolio web](https://jeanchongdev.github.io/)** <br>
💼 **[Visit my web portfolio](https://jeanchongdev.vercel.app/)**

--------------------------------------------------------------------------------------------------

## 📄 Licencia

**Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](./LICENSE) para más detalles.**