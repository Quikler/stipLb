import { ChakraProvider, Box, Flex, VStack, Text } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Link as RouterLink } from 'react-router-dom';
import AppRoutes from "../AppRoutes.jsx";

function App() {
    return (
        <ChakraProvider>
            <Router>
                <Flex className="min-h-screen">
                    <Box
                        as="nav"
                        className="w-80 bg-blue-800 text-white"
                        p={4}
                    >
                        <VStack align="start" spacing={4}>
                            <Text className="font-bold text-xl">Лабораторні роботи</Text>
                            <RouterLink to="/stipLb/Lb2" className="hover:text-green-400">
                                Лабораторна робота 1
                            </RouterLink>
                            <RouterLink to="/stipLb/Lb2" className="hover:text-green-400">
                                Лабораторна робота 2
                            </RouterLink>
                            <RouterLink to="/stipLb/Lb3" className="hover:text-green-400">
                                Лабораторна робота 3
                            </RouterLink>
                            <RouterLink to="/stipLb/Lb4" className="hover:text-green-400">
                                Лабораторна робота 4
                            </RouterLink>
                            <RouterLink to="/stipLb/Lb5" className="hover:text-green-400">
                                Лабораторна робота 5
                            </RouterLink>
                            <RouterLink to="/stipLb/Lb6" className="hover:text-green-400">
                                Лабораторна робота 6
                            </RouterLink>
                            <RouterLink to="/stipLb/Lb7" className="hover:text-green-400">
                                Лабораторна робота 7
                            </RouterLink>
                            <RouterLink to="/stipLb/Lb8" className="hover:text-green-400">
                                Лабораторна робота 8
                            </RouterLink>
                            <RouterLink to="/stipLb/Lb9" className="hover:text-green-400">
                                Лабораторна робота 9
                            </RouterLink>
                            <RouterLink to="/stipLb/Lb10" className="hover:text-green-400">
                                Лабораторна робота 10
                            </RouterLink>
                            <RouterLink to="/stipLb/Lb21" className="hover:text-green-400">
                                Лабораторна робота 2.1
                            </RouterLink>
                            <RouterLink to="/stipLb/Lb22" className="hover:text-green-400">
                                Лабораторна робота 2.2
                            </RouterLink>
                            <RouterLink to="/stipLb/Lb23" className="hover:text-green-400">
                                Лабораторна робота 2.3
                            </RouterLink>
                        </VStack>
                    </Box>

                    <Flex className="w-full bg-gray-100" direction="column">
                        <Box
                            as="header"
                            className="bg-green-400 w-full text-center py-4"
                        >
                            <Text className="font-bold">Звіт</Text>
                            <Text>про лабораторні роботи з курсу</Text>
                            <Text>«Сучасні технології Інтернет-програмування»</Text>
                            <Text>студента групи ІПЗ-22-1</Text>
                            <Text>Бінюков Роман Андрійович</Text>
                        </Box>

                        <Box className="flex-grow p-6">
                            <Routes>
                                {AppRoutes.map((route, index) => {
                                    const { element, ...rest } = route;
                                    return <Route key={index} {...rest} element={element} />;
                                })}
                            </Routes>
                        </Box>

                    </Flex>
                </Flex>
            </Router>
        </ChakraProvider>
    );
}

export default App;
