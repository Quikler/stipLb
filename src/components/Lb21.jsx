import { Box, HStack, VStack, Text, Image, Link, Button, Img } from "@chakra-ui/react";

export const Lb21 = () => {
    return (
        <Box className="p-6 bg-white rounded-md shadow-md m-5 w-full">
            <VStack spacing={4} align="stretch" className="p-6">
                <Text fontStyle="italic">
                    Встановлення та налаштування веб-сервера.
                    Вивчення протоколу HTT­P ( Hyper Text Transfer Protocol ) та SSI.
                </Text>
            </VStack>

            <VStack spacing={4} align="stretch" className="p-6">
                <Text fontStyle="italic">
                    1. Отримати за допомогою методу GET головну сторінку вашого документа на сервері (1 скріншот):
                </Text>
                <img src="./images/lb2.1.1.png" />
            </VStack>
            <VStack spacing={4} align="stretch" className="p-6">
                <Text fontStyle="italic">
                    2. Визначте версію специфікації HTTP, яку підтримує сервер, а також версію та специфікацію програмного забезпечення, що працює на сервері. Визначте також дату та час, у який було сформовано відповідь, та час останньої модифікації головної сторінки сервера. (1 скріншот):
                </Text>
                <img src="./images/lb2.1.2.png" />
            </VStack>
            <VStack spacing={4} align="stretch" className="p-6">
                <Text fontStyle="italic">
                    3. Запитайте будь-який неіснуючий документ на сервері та зверніть увагу на відповідь, повернений сервером. (1 скріншот):
                </Text>
                <img src="./images/lb2.1.3.png" />
            </VStack>
            <VStack spacing={4} align="stretch" className="p-6">
                <Text fontStyle="italic">
                    4. Отримайте будь-які два документи, на які є посилання в отриманому документі; (2 скріншоти):
                </Text>
                <img src="./images/lb2.1.41.png" />
                <img src="./images/lb2.1.42.png" />
            </VStack>
            <VStack spacing={4} align="stretch" className="p-6">
                <Text fontStyle="italic">
                    5. Отримайте перші п’ятнадцять байт будь-якого документа із віртуального каталогу на сервері. Визначте за поверненою відповіддю повний розмір запитаного документа. Отримайте останні сім байт цього документа. (2 скріншоти):
                </Text>
                <img src="./images/lb2.1.51.png" />
                <img src="./images/lb2.1.52.png" />
            </VStack>
            <VStack spacing={4} align="stretch" className="p-6">
                <Text fontStyle="italic">
                    6. Надішліть запити за допомогою методів PUT та DELETE на сервер. (2 скріншоти):
                </Text>
                <img src="./images/lb2.1.61.png" />
                <img src="./images/lb2.1.62.png" />
            </VStack>
            <VStack spacing={4} align="stretch" className="p-6">
                <Text fontStyle="italic">
                    7. За допомогою методу OPTIONS запитайте інформацію про параметри сервера в цілому, про параметри кореневого каталогу сервера. Зверніть увагу на список методів, що підтримуються сервером для кожного каталогу. (1 скріншот):
                </Text>
                <img src="./images/lb2.1.7.png" />
            </VStack>
            <VStack spacing={4} align="stretch" className="p-6">
                <Text fontStyle="italic">
                    8. Надішліть два різні запити за допомогою методу TRACE на сервер і зверніть увагу на відповіді, повернені сервером. (2 скріншоти):
                </Text>
                <img src="./images/lb2.1.81.png" />
                <img src="./images/lb2.1.82.png" />
            </VStack>
            <HStack p="6">
                <Link fontWeight='bold' fontSize='24' href='https://github.com/Quikler/stipLb/blob/master/src/components/Lb21.jsx'>Коди програми</Link>
            </HStack>
        </Box>
    );
};
