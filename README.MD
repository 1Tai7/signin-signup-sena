## API Endpoints

### POST REGISTER
```bash
curl --location 'localhost:4000/api/register' \
--header 'Content-Type: application/json' \
--data-raw '
{
     "user": "c",
     "email": "c@c.com",
     "password": "$2a$05$nLY2It8riku2vwwDIINdgO/XIyPXRg1Gn9LFgnhwKqC4TwcAwEUL2"
}
'
```

### POST LOGIN
```bash
curl --location 'http://localhost:4000/api/login' \
--header 'Content-Type: application/json' \
--header 'Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYSIsImlhdCI6MTczNDQ3NTk5MywiZXhwIjoxNzM1MDgwNzkzfQ.wUyq-Dwa-n1y3JSdM1nJCvstr9yOE6JunYNZEuQkT3s' \
--data '
{
     "user": "a",
     "password": "a"
}
'
```

Repositorio GiHub:
`https://github.com/1Tai7/signin-login-sena`
