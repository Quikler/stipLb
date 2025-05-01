import { Box, HStack, VStack, Text, Image, Link, Button, Img, Heading } from "@chakra-ui/react";

export const Lb22 = () => {
    return (
        <Box className="p-6 bg-white rounded-md shadow-md m-5 w-full">
            <VStack spacing={4} align="stretch" className="p-6">
                <Heading>Завдання 1: Аналіз HTTP-запиту через браузер (варіант 3)</Heading>

                <Text fontStyle="italic">
                    Типи HTTP-запитів, які виконуються (GET, POST тощо).
                </Text>
                <Text>Виконуються 2 запити GET для отримання сторінки та іконки</Text>
                <Img src="./images/lb2.2.12.png" />

                <Text>
                    Заголовки запитів (User-Agent, Host, Content-Type).
                </Text>
                <Img src="./images/lb2.2.11.png" />

                <Text>
                    Ресурс сторінки повертає статусний код: 404 NOT FOUND
                </Text>

                <Text>
                    Заголовки для кешування: 304 Cache-Control
                </Text>

                <Text>
                    Відповідь сервера (статусний код, заголовки).
                </Text>
                <Img src="./images/lb2.2.13.png" />

                <Img src="./images/lb2.2.14.png" />
            </VStack>

            <VStack spacing={4} align="stretch" className="p-6">
                <Heading>Завдання 2: Надсилання запиту через Postman (варіант 3)</Heading>

                <Text>
                    Статусний код: 200 ОК
                    Формат даних: JSON
                </Text>

                <Text>
                    Після додавання application/json відповідь не змінилася
                </Text>
                <Img src="./images/lb2.2.2.png" />
            </VStack>
            <VStack spacing={4} align="stretch" className="p-6">
                <Heading>Завдання 3: Відправка POST-запиту (варіант 3)</Heading>
                <Text>
                    Статусний код: 201 CREATED
                    Формат даних: JSON
                </Text>

                <Img src="./images/lb2.2.3.png" />
            </VStack>
            <VStack spacing={4} align="stretch" className="p-6">
                <Heading>Завдання 4: Створення простого HTTP-сервера</Heading>
                <Img src="./images/lb2.2.43.png" />
                <Img src="./images/lb2.2.42.png" />
                <Img src="./images/lb2.2.41.png" />
            </VStack>
            <HStack p="6">
                <Link fontWeight='bold' fontSize='24' href='https://github.com/Quikler/stipLb/blob/master/src/components/Lb22.jsx'>Коди програми</Link>
            </HStack>
        </Box>
    );
};
