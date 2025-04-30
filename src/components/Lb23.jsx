import { Box, HStack, VStack, Text, Image, Link, Button, Img, Heading } from "@chakra-ui/react";

export const Lb23 = () => {
    return (
        <Box className="p-6 bg-white rounded-md shadow-md m-5 w-full">
            <VStack spacing={4} align="stretch" className="p-6">
                <Heading>Варіант 3. Оновити дані користувача за його ID</Heading>
                <Text>PUT /api/users/:id</Text>

                <Text>{`Current user's username:`}</Text>
                <Img src="./images/lb2.3.1.png" />

                <Text>{`Current user's username change:`}</Text>
                <Img src="./images/lb2.3.2.png" />

                <Text>{`Node js server log:`}</Text>
                <Img src="./images/lb2.3.3.png" />
            </VStack>

            <VStack spacing={4} align="stretch" className="p-6">
                <Heading>index.html</Heading>
                <pre>
                    <code>
                        {`
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div>
        <div>
            <span>Current user id: </span><span id="currentUserId"></span>
        </div>
        <div>
            <span>Current username: </span><span id="currentUsername"></span>
        </div>
    </div>
    <form id="submit-form">
        <label for="userId">User id</label>
        <input type="number" name="userId" value="">

        <label for="username">Username</label>
        <input type="text" name="username" value="">

        <button type="submit">Submit</button>
    </form>
    <script src="/js/script.js"></script>
</body>

</html>

            `}
                    </code>
                </pre>

                <Heading>Client script.js</Heading>
                <pre>
                    <code>
                        {`
document.addEventListener('DOMContentLoaded', async function() {
    try {
        const res = await fetch('http://localhost:3000/api/users/1', {
            method: 'GET',
        });

        if (!res.ok) {
            throw new Error(\`HTTP error! Status: \${res.status}\`);
        }

                        const userData = await res.json();

                        const currentUserId = document.getElementById('currentUserId');
                        currentUserId.textContent = userData.userId;

                        const currentUsername = document.getElementById('currentUsername');
                        currentUsername.textContent = userData.username;
    } catch (e) {
                            console.error("Error getting user:", e);
    }
});

                        const submitForm = document.getElementById('submit-form');
submitForm.addEventListener('submit', async e => {
                            e.preventDefault();

                        const userId = Number(submitForm.elements["userId"].value);
                        const username = submitForm.elements["username"].value;

                        try {
        const res = await fetch(\`http://localhost:3000/api/users/\${userId}\`, {
                            method: 'PUT',
                        headers: {
                            "Content-Type": "application/json",
            },
                        body: JSON.stringify({username: username }),
        })

                        if (!res.ok) {
            throw new Error(\`HTTP error! Status: \${res.status}\`);
        }

                        const userData = await res.json()

                        const currentUserId = document.getElementById('currentUserId');
                        currentUserId.textContent = userData.userId;

                        const currentUsername = document.getElementById('currentUsername');
                        currentUsername.textContent = userData.username;
    } catch (e) {
                            console.error("Error updating user", e);
    }
});
            `}
                    </code>
                </pre>

                <Heading>Server server.js</Heading>
                <pre>
                    <code>
                        {`const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const userData = {
    userId: 1,
    username: 'testUsername',
};

app.use(express.static("./public"));

app.get('/', (req, res) => {
    const htmlDoc = \`\${fs.readFileSync('./index.html')}\`;
    res.setHeader('Content-Type', 'text/html');
    res.send(htmlDoc);
});

app.get('/api/users/:id', (req, res) => {
    if (Number(req.params.id) !== userData.userId) {
        res.status(404).json({ error: 'User by id not found' });
        return;
    }

    res.json(userData);
});

const jsonParser = bodyParser.json();
app.put('/api/users/:id', jsonParser, (req, res) => {
    if (Number(req.params.id) !== userData.userId) {
        res.status(404).json({ error: 'User by id not found' });
        return;
    }

    const userId = req.params?.id;
    const userName = req.body?.username;

    userData.userId = userId;
    userData.username = userName;

    console.log('New username:', userData);
    res.json(userData);
});

app.listen(3000, () => {
    console.log('Сервер запущено на порту 3000');
});`}
                    </code>
                </pre>
            </VStack>

            <HStack p="6">
                <Link fontWeight='bold' fontSize='24' href='https://github.com/Quikler/stipLb/blob/master/src/components/Lb23.jsx'>Коди програми</Link>
            </HStack>
        </Box>
    );
};
