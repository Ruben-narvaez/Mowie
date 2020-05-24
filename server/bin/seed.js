require('dotenv').config()
const mongoose = require('mongoose')
const faker = require('faker/locale/es')

const User = require('../models/user.model')
const Project = require('../models/project.model')
const dbName = 'Plugged-In'

mongoose.connect(`${process.env.DB}`, { useNewUrlParser: true, useUnifiedTopology: true })
const bcrypt = require('bcrypt')
const bcryptSalt = 10
const salt = bcrypt.genSaltSync(bcryptSalt)

User.collection.drop()
Project.collection.drop()

const users = [
    {
        name: 'Ruben',
        lastname: 'Narr',
        username: 'ruben',
        city: 'Madrid',
        email: 'r@r.com',
        password: bcrypt.hashSync('ruben', salt),
        aboutMe: 'Soy sonidista, tengo mucha experiencia en rodajes de ficción y publicidad, y me gusta siempre rodar y rodar y rodar, es por eso que estoy por aquí. También, a parte de mi experiencia en el set, tengo conocimientos en software de edición como Premiere o Audition',
        picture: faker.internet.avatar(),
        age: 30,
        team: 'Sonido'
    },
    {
        name: 'Kike',
        lastname: 'Montaño',
        username: 'kike',
        city: 'Andalucía',
        email: 'kike@kike.com',
        password: bcrypt.hashSync('kike', salt),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 48,
        team: 'Cámara'
    },
    {
        name: 'Fran',
        lastname: 'Naranjo',
        username: 'fran',
        city: 'Canarias',
        email: 'fran@fran.com',
        password: bcrypt.hashSync('fran', salt),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 18,
        team: 'Fotografía'
    },
    {
        name: 'Germán',
        lastname: 'Álvarez',
        username: 'ger',
        city: 'Madrid',
        email: 'ger@ger.com',
        password: bcrypt.hashSync('ger', salt),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 30,
        team: 'Guión'
    },
    {
        name: 'Alejandro',
        lastname: 'Murawczik',
        username: 'alex',
        city: 'Madrid',
        email: 'alex@alex.com',
        password: bcrypt.hashSync('alex', salt),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 35,
        team: 'Guión'
    },
    {
        name: 'Patricia',
        lastname: 'Jurado',
        username: 'paty',
        city: 'Caracas',
        email: 'paty@paty.com',
        password: bcrypt.hashSync('paty', salt),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 27,
        team: 'Sonido'
    },
    {
        name: 'Álvaro',
        lastname: 'Moral',
        username: 'alvaro',
        city: 'Madrid',
        email: 'alvaro@alvaro.com',
        password: bcrypt.hashSync('alvaro', salt),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 21,
        team: 'Dirección'
    },
    {
        name: 'Gabriela',
        lastname: 'Gallango',
        username: 'gaby',
        city: 'Barcelona',
        email: 'gaby@gaby.com',
        password: bcrypt.hashSync('gaby', salt),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 73,
        team: 'Dirección'
    },
    {
        name: 'Dayan',
        lastname: 'Rojas',
        username: 'dayan',
        city: 'Getafe',
        email: 'dayan@dayan.com',
        password: bcrypt.hashSync('dayan', salt),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 32,
        team: 'Arte'
    },
    {
        name: 'Elvira',
        lastname: 'Ramirez',
        username: 'elvi',
        city: 'Sevilla',
        email: 'elvi@elvi.com',
        password: bcrypt.hashSync('elvi', salt),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 22,
        team: 'Dirección'
    },
    {
        name: 'Gerard',
        lastname: 'Toledo',
        username: 'gerard',
        city: 'Torrevieja',
        email: 'gerard@gerard.com',
        password: bcrypt.hashSync('gerard', salt),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 18,
        team: 'Producción'
    },
    {
        name: 'Héctor',
        lastname: 'Antón',
        username: 'hectorino',
        city: 'Madrid',
        email: 'hectorino@hectorino.com',
        password: bcrypt.hashSync('hectorino', salt),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 24,
        team: 'Producción'
    },
    {
        name: 'Julián',
        lastname: 'Bajo',
        username: 'julianb',
        city: 'Cuenca',
        email: 'julianb@julianb.com',
        password: bcrypt.hashSync('julian', salt),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 30,
        team: 'Producción'
    },
    {
        name: 'Julián',
        lastname: 'Kizeno',
        username: 'juliank',
        city: 'Albacete',
        email: 'juliank@juliank.com',
        password: bcrypt.hashSync('juliank', salt),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 32,
        team: 'Dirección'
    },
    {
        name: 'Yaiza',
        lastname: 'Misterio',
        username: 'yai',
        city: 'Usera',
        email: 'yai@yai.com',
        password: bcrypt.hashSync('yai', salt),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 23,
        team: 'Sonido'
    },
    {
        name: 'Victor',
        lastname: 'Gálvez',
        username: 'vic',
        city: 'Guadalajara',
        email: 'vic@vic.com',
        password: bcrypt.hashSync('vic', salt),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 24,
        team: 'Sonido'
    },
    {
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        city: faker.address.cityPrefix(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 50,
        team: 'Arte'
    },
    {
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        city: faker.address.cityPrefix(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 30,
        team: 'Dirección'
    },
    {
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        city: faker.address.cityPrefix(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 19,
        team: 'Dirección'
    },
    {
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        city: faker.address.cityPrefix(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 52,
        team: 'Arte'
    },
    {
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        city: faker.address.cityPrefix(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 33,
        team: 'Fotografía'
    },
    {
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        city: faker.address.cityPrefix(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 24,
        team: 'Sonido'
    },
    {
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        city: faker.address.cityPrefix(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 16,
        team: 'Guión'
    },
    {
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        city: faker.address.cityPrefix(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 35,
        team: 'Guión'
    },
    {
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        city: faker.address.cityPrefix(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 38,
        team: 'Fotografía'
    },
    {
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        city: faker.address.cityPrefix(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 45,
        team: 'Cámara'
    },
    {
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        city: faker.address.cityPrefix(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 64,
        team: 'Dirección'
    },
    {
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        city: faker.address.cityPrefix(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 43,
        team: 'Cámara'
    },
    {
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        city: faker.address.cityPrefix(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 41,
        team: 'Fotografía'
    },
    {
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        city: faker.address.cityPrefix(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 30,
        team: 'Arte'
    },
    {
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        city: faker.address.cityPrefix(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 48,
        team: 'Cámara'
    },
    {
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        city: faker.address.cityPrefix(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 30,
        team: 'Producción'
    },
    {
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        city: faker.address.cityPrefix(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 50,
        team: 'Arte'
    },
    {
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        city: faker.address.cityPrefix(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 30,
        team: 'Dirección'
    },
    {
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        city: faker.address.cityPrefix(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 19,
        team: 'Dirección'
    },
    {
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        city: faker.address.cityPrefix(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 52,
        team: 'Arte'
    },
    {
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        city: faker.address.cityPrefix(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 33,
        team: 'Fotografía'
    },
    {
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        city: faker.address.cityPrefix(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 24,
        team: 'Sonido'
    },
    {
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        city: faker.address.cityPrefix(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 16,
        team: 'Guión'
    },
    {
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        city: faker.address.cityPrefix(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 35,
        team: 'Guión'
    },
    {
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        city: faker.address.cityPrefix(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 38,
        team: 'Fotografía'
    },
    {
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        city: faker.address.cityPrefix(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 45,
        team: 'Cámara'
    },
    {
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        city: faker.address.cityPrefix(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 64,
        team: 'Dirección'
    },
    {
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        city: faker.address.cityPrefix(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 43,
        team: 'Cámara'
    },
    {
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        city: faker.address.cityPrefix(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 41,
        team: 'Fotografía'
    },
    {
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        city: faker.address.cityPrefix(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        picture: faker.internet.avatar(),
        aboutMe: faker.lorem.paragraph(),
        age: 30,
        team: 'Arte'
    }
]

const projects = [
    {
        title: 'Las dunas de Marruecos',
        format: 'Largometraje',
        genre: 'Documental',
        description: 'En este proyecto queremos abordar la situación de las aldeas del norte del Sáhara, desde un punto de vista humano, no cómo meros espectadores sino como participantes del día a día, por lo que las personas que se apunten deberían tener en cuenta que será necesario pasar varias semanas fuera del país',
        poster: 'https://cineclasico4.webcindario.com/LAU-11.JPG',
        location: 'Marrakech',
        needed: 'Operador de cámara, ayudante de cámara, Director de fotografía y gaffer',
        date: '30-09-2020',
         
    },
    {
        title: 'Kárate a muerte en Algete',
        format: 'Web Serie',
        genre: 'Artes Marciales',
        description: 'Web serie que narra las aventuras del karateka Esteban Saigón, padre de muchos, maestro de pocos. En esta historia pretendemos mezclar el cliché karateka de los ochenta con el Madrid mas cañí, todo ambientado en una España postdictadura en la que Blondie lidera las listas de éxitos',
        poster: 'https://www.malaga.es/culturama/anterior/2004/cine/images/pedro02.jpg',
        location: 'Algete',
        needed: "Guionista para trabajar mano a mano con el director y pulir los fallos del guión, también necesitamos un par de personas para el equipo de arte",
        date: 'No está definida la fecha de rodaje'
    },
    {
        title: 'Neo-Madrid',
        format: 'Largometraje',
        genre: 'Acción',
        description: 'Año 2019. Neo-Madrid es una ciudad construida sobre las ruinas de la antigua capital española destruida tras la Tercera Guerra Mundial. España es un país al borde del colapso que sufre continuas crisis políticas. En secreto, un equipo de científicos ha reanudado por orden del ejército un experimento para encontrar a individuos que puedan controlar el arma definitiva: una fuerza denominada "la energía absoluta". Pero los habitantes de Neo-Madrid tienen otras cosas de las que preocuparse. Uno de ellos es Paco, un joven pandillero líder de una banda de motoristas. Durante una pelea, su mejor amigo, Pepe, sufre un extraño accidente y termina ingresado en unas instalaciones militares. Allí los científicos descubrirán que es el poseedor de la energía absoluta. Pero Pepe, que no se resigna a convertirse en un conejillo de indias, muy pronto se convertirá en la amenaza más grande que el mundo ha conocido. ',
        poster: 'https://madridsecreto.co/wp-content/uploads/2018/11/capitol-1.jpg',
        location: 'Lavapiés',
        needed: "De todo, somos dos directores, lo único que tenemos es el guión y el storyboard y necesitamos un buen equipo para sacar el proyecto",
        date: 'Enero 2021'
    },
    {
        title: 'La habitación',
        format: 'Cortometraje',
        genre: 'Drama',
        description: 'Johnny es un exitoso banquero que vive en una casa adosada de Pozuelo con su prometida, Lisa. Ellos comparten una relación intensa e íntima caracterizada por el amor constante y apasionado. A pesar de esta idílica existencia, Lisa se ha sentido inexplicablemente insatisfecha con su vida, y una tarde confía a su mejor amiga Michelle y a su madre Claudette que encuentra a Johnny aburrido. Aunque Michelle le aconseja estar agradecida por lo que tiene, y su madre le aconseja que la estabilidad financiera es más importante que la felicidad, Lisa decide seducir al mejor amigo de Johnny, Mark. Aunque inicialmente es renuente, Mark cede ante los avances de Lisa. Su asunto continúa a través del resto de la película, a pesar de que Mark parece renuente al principio de cada encuentro sexual y repetidamente trata de romper la relación. Mientras tanto, Lisa ha llegado a la conclusión de que «lo quiere todo», decide quedarse con Johnny por el apoyo financiero y los bienes materiales que puede proporcionarle. Cuando la fecha de la boda se acerca y la influencia de Johnny en sus billetes de banco car, Lisa alterna entre glorificar y vilipendiar a Johnny con su familia y amigos, haciendo falsas acusaciones de abuso doméstico y defendiendo a Johnny contra críticas. Mientras tanto, Johnny, habiendo oído a Lisa confesar su infidelidad a su madre, fija una grabadora en su teléfono en un intento por identificar a su amante.',
        poster: 'https://s6.eestatic.com/2017/09/15/cultura/cine/Peliculas-James_Franco-Festival_de_cine_de_San_Sebastian-Cine_246988503_47045348_1706x1706.jpg',
        location: 'Pozuelo',
        needed: "Sólo nos faltan dos sonidistas y un diseñador de sonido",
        date: 'Verano 2020'
    },
    {
        title: 'Neo-Madrid',
        format: 'Largometraje',
        genre: 'Acción',
        description: 'Año 40.000. Planeta Lythion. La intrépida Barbarella aterriza en un misterioso planeta donde vivirá toda clase de aventuras, peligros y placeres. Año 40.000. Planeta Lythion. La intrépida Barbarella aterriza en un misterioso planeta donde vivirá toda clase de aventuras, peligros y placeres.Año 40.000. Planeta Lythion. La intrépida Barbarella aterriza en un misterioso planeta donde vivirá toda clase de aventuras, peligros y placeres.Año 40.000. Planeta Lythion. La intrépida Barbarella aterriza en un misterioso planeta donde vivirá toda clase de aventuras, peligros y placeres.Año 40.000. Planeta Lythion. La intrépida Barbarella aterriza en un misterioso planeta donde vivirá toda clase de aventuras, peligros y placeres.Año 40.000. Planeta Lythion. La intrépida Barbarella aterriza en un misterioso planeta donde vivirá toda clase de aventuras, peligros y placeres.Año 40.000. Planeta Lythion. La intrépida Barbarella aterriza en un misterioso planeta donde vivirá toda clase de aventuras, peligros y placeres.Año 40.000. Planeta Lythion. La intrépida Barbarella aterriza en un misterioso planeta donde vivirá toda clase de aventuras, peligros y placeres.Año 40.000. Planeta Lythion. La intrépida Barbarella aterriza en un misterioso planeta donde vivirá toda clase de aventuras, peligros y placeres.',
        poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSNLWUaWBa0Js-Ta2fTU1ZfH17qCHVd_dZOe0vEVKNuyseLUeue&usqp=CAU',
        location: 'Prosperidad',
        needed: "Somos un equipo y necesitamos un realizador con experiencia",
        date: '14-09-2020'
    },
    {
        title: 'Lola y los fantasmas',
        format: 'Cortometraje',
        genre: 'Comedia romántica',
        description: 'Lola, que pasaba la vida fuera de casa, se obligada a guardar confinamiento durante la cuarentena por el coronavirus. Descubrirá que en su casa hay un antiguo habitante que la acompañará en esta historia. Lola, que pasaba la vida fuera de casa, se obligada a guardar confinamiento durante la cuarentena por el coronavirus. Descubrirá que en su casa hay un antiguo habitante que la acompañará en esta historia.Lola, que pasaba la vida fuera de casa, se obligada a guardar confinamiento durante la cuarentena por el coronavirus. Descubrirá que en su casa hay un antiguo habitante que la acompañará en esta historia.Lola, que pasaba la vida fuera de casa, se obligada a guardar confinamiento durante la cuarentena por el coronavirus. Descubrirá que en su casa hay un antiguo habitante que la acompañará en esta historia.',
        poster: 'https://i2.wp.com/wesleying.org/wp-content/uploads/2013/03/runlola.jpg?resize=600%2C396',
        location: 'Vallecas',
        needed: "Director de Fotografía y Ayudante de Sonido",
        date: 'Mayo 2020'
    },
    {
        title: 'El hombre del Loro',
        format: 'Cortometraje',
        genre: 'Comedia',
        description: 'Han pasado 10 años desde aquel fatídico Verano... Nuestros protagonistas ya casi habían olvidado los acontecimientos... Pero... El hombre del Loro ha vuelto, y su sed de venganza será terrible. Cortometraje de comedia de terror parodizando los slasher míticos de los 90',
        poster: 'https://estaticos.elmundo.es/assets/multimedia/imagenes/2016/11/16/14793003181494.jpg',
        location: 'Usera',
        needed: "Guionista para ayudarnos a cerrar los gags y el guión en sí. También necesitaremos un equipo al completo, así que puede apuntarse todo el mundo",
        date: 'Octubre 2020'
    },
    {
        title: 'La gente gato',
        format: 'Largometraje',
        genre: 'Drama',
        description: 'La gente gato pretende ser un drama sobre esas personas que viven solas, que no tienen a nadie y que no saben relacionarse con los demás. La gente gato pretende ser un drama sobre esas personas que viven solas, que no tienen a nadie y que no saben relacionarse con los demás. La gente gato pretende ser un drama sobre esas personas que viven solas, que no tienen a nadie y que no saben relacionarse con los demás. La gente gato pretende ser un drama sobre esas personas que viven solas, que no tienen a nadie y que no saben relacionarse con los demás. La gente gato pretende ser un drama sobre esas personas que viven solas, que no tienen a nadie y que no saben relacionarse con los demás. La gente gato pretende ser un drama sobre esas personas que viven solas, que no tienen a nadie y que no saben relacionarse con los demás. La gente gato pretende ser un drama sobre esas personas que viven solas, que no tienen a nadie y que no saben relacionarse con los demás. La gente gato pretende ser un drama sobre esas personas que viven solas, que no tienen a nadie y que no saben relacionarse con los demás.',
        poster: 'https://lh3.googleusercontent.com/proxy/yT6gRBRCBrrtCaR8pfn7RpYZEKU5kNkmGPU54F1TjI-3G9u0DNRCwj3DazM4ClKzHTciHsRqJJRbu9vF4qGbqynSpX3YudkZ6QJEH9LNP11A6A5ZTkFCEC5n9lTI_IOAO-PNNfZF17KxcrFesa8rBdEFkWig',
        location: 'Coslada',
        needed: "A alguien de arte, especializado en vestuario de época",
        date: '24-Junio-2020'
    },
    {
        title: 'Starman',
        format: 'Cortometraje',
        genre: 'Ciencia-ficción',
        description: ' Elliott es un joven deprimido, su vida es monótona y su pasión es la ciencia ficción. Está enamorado pero no se atreve a confesar sus sentimientos... Un día de casualidad encuentra un condesador de fluzo tirado por ahí, lo activará y sin querer llamará a Tom, un extraterrestre del planeta Melmac, que vendrá para arreglar su vida... o intentarlo',
        poster: 'https://25.media.tumblr.com/756c48166f463492c59e0f2bb870221e/tumblr_mz7c1q07MZ1slyv83o1_500.png',
        location: 'Benalmádena',
        needed: "Bucamos director de fotografía",
        date: '2021'
    },
    {
        title: 'Una historia triste',
        format: 'Largometraje',
        genre: 'Documental',
        description: ' Historia del punk español, especialmente centrado en el movimiento del norte de España y centrado en la figura de Iosu de Eskorbuto. Historia del punk español, especialmente centrado en el movimiento del norte de España y centrado en la figura de Iosu de Eskorbuto. Historia del punk español, especialmente centrado en el movimiento del norte de España y centrado en la figura de Iosu de Eskorbuto. Historia del punk español, especialmente centrado en el movimiento del norte de España y centrado en la figura de Iosu de Eskorbuto. Historia del punk español, especialmente centrado en el movimiento del norte de España y centrado en la figura de Iosu de Eskorbuto Historia del punk español, especialmente centrado en el movimiento del norte de España y centrado en la figura de Iosu de Eskorbuto Historia del punk español, especialmente centrado en el movimiento del norte de España y centrado en la figura de Iosu de Eskorbuto. Historia del punk español, especialmente centrado en el movimiento del norte de España y centrado en la figura de Iosu de Eskorbuto. Historia del punk español, especialmente centrado en el movimiento del norte de España y centrado en la figura de Iosu de Eskorbuto',
        poster: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Cfakepathiosueskorbutojpg_EDIIMA20170602_0274_5.jpg',
        location: 'Santurce',
        needed: "Operador de cámara y sonidista",
        date: 'Enero 2021'
    }
]

User.create(users)
    .then(allUsers => {
        console.log(`${allUsers} created`)
    })
    .catch(err => console.log(`Ha ocurrido un error: ${err}`))

Project.create(projects)
    .then(allProjects => {
        console.log(`${allProjects} created`)
    })
    .catch(err => console.log(`Ha ocurrido un error: ${err}`))