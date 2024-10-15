import $ from "jquery";
import {Box, Button, Link, Text, VStack} from "@chakra-ui/react";
import {useEffect} from "react";

export const Lb5 = () => {
    useEffect(() => {
        $('#text').text('First');
    }, []);

    const onClick = () => {
        $('#text').text(
            $('#text').text() === 'First' ? 'Second' : 'First'
        );

        $('#text').css({ color: 'blue', fontSize: '14px', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' })
            .animate({ fontSize: '40px' }, 1000)
            .animate({ top: '70%', fontSize: '20px' }, 1000);
    };

    return (
        <Box>
            <Box className="p-6 bg-white rounded-md shadow-md m-5">
                <VStack spacing={4} align="stretch" className="p-6">
                    <Text fontSize="2xl" fontWeight="bold">Завдання:</Text>
                    <Text fontStyle="italic">
                        1. За натисканням кнопки один фрагмент тексту замінювати іншим<br />
                        2. Текст синього кольору рухається в центр сторінки, збільшується,
                        потім переміщається вниз і зменшується
                    </Text>
                    <Link px="6" fontWeight='bold' fontSize='24' href='https://github.com/Quikler/stipLb/src/componentsLb4.jsx'>Коди програми</Link>
                </VStack>
            </Box>

            <Box className="p-6 bg-white rounded-md shadow-md m-5">
                <h3 className="text-xl font-bold">Натисність кнопку щоб замінити текст</h3>
                <p id="text"></p>
                <Button
                    mt="2"
                    onClick={onClick}
                >
                    Замінити
                </Button>
            </Box>
        </Box>
    );
}