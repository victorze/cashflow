# Personal finance application

https://user-images.githubusercontent.com/22132891/137370193-4091d2e1-ac64-4b88-b0ff-e60ba7e96687.mp4

# Instalación

```bash
git clone https://github.com/victorze/cash-flow.git
cd cash-flow
npm install
```

# Configuración

Para hacer pruebas en local cree un contenedor de mondodb
```bash
docker run -d -p 27017:27017 --name cash-flow mongo:5
```

Haga una copia del archivo `.env.example`

```bash
cp .env.example .env
```

Luego ingrese los valores de configuración en el archivo `.env`

En este caso, el valor de la variable `MONGODB_URI` será `mongodb://localhost:27017/cashflow`

# Uso

```bash
npm start
```

Finalmente, dirígase a http://localhost:3000/
