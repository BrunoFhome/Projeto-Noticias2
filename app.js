const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const { getApps, initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const cookieParser = require('cookie-parser');



app.use(cookieParser());
app.use(express.static(__dirname + '/public/estilo.css'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//COOKIES CONFIGURAÇÃO DA SESSÃO
app.get('/set-cookie', (req, res) => {
    res.cookie('myCookie', 'cookieValue', { maxAge: 900000, httpOnly: true });
    res.send('Cookie has been set');
  });

var firebaseConfig = {
    apiKey: "AIzaSyDyVjR3Ed3HBWJrJ2t1ZiuMsU1iK3zRHZY",
  authDomain: "noticias-6b691.firebaseapp.com",
  projectId: "noticias-6b691",
  storageBucket: "noticias-6b691.appspot.com",
  messagingSenderId: "396677193319",
  appId: "1:396677193319:web:888d3f39717920d82c3ec2"
};

const produtos = [
    {
        categoria: 'eletrodomestico'
    },
    {       
        categoria: 'eletrodomestico'
    },
    {
        categoria: 'moveis'
    },
];

const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(firebaseApp);

// Login

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/login', async (req, res) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, req.body.email, req.body.password);
        console.log(userCredential); // Adicione esta linha
        res.redirect('/home');
    } catch (error) {
        res.send(error.message);
    }
});

app.get('/home', (req, res) => {
    const user = auth.currentUser;
    console.log(user); // Adicione esta linha
    if (user) {
        res.render('home', { user: user });
    } else {
        res.redirect('/');
    }
});

// Configuração do Express
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));



// Rota principal
app.get('/', (req, res) => {
    const categoriaSelecionada = req.query.categoria; // Obtenha a categoria selecionada do query string
    let produtosFiltrados = produtos;

    if (categoriaSelecionada && categoriaSelecionada !== '0') {
        // Filtrar produtos pela categoria selecionada
        produtosFiltrados = produtos.filter(produto => produto.categoria === categoriaSelecionada);
    }

    res.render('index', { produtos: produtosFiltrados });
});

// Rota para adicionar produto
app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', (req, res) => {
    const { nome, preco, categoria } = req.body;
    noticias.push({ nome, preco, categoria });
    res.redirect('/');
});


// Iniciar servidor
app.listen(port, () => {
    console.log('Servidor rodando na porta', port);
});
