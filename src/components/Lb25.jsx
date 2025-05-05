import { Box, VStack, Heading } from "@chakra-ui/react";

export const Lb25 = () => {
    return (
        <Box className="p-6 bg-white h-full rounded-md shadow-md m-5 w-full">
            <VStack spacing={4} align="stretch" className="h-full p-6">
                <Heading>Варіант 3 Розробити API для замовлень: створення, перегляд, оновлення статусу, аутентифікація JWT, WebSockets для оновлення статусу в реальному часі.</Heading>

                <iframe src="https://www.youtube.com/embed/rfTmkt3vv2g?rel=0" className="h-full" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
            </VStack>
        </Box>
    );
}
