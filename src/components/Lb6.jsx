import 'react';
import $ from 'jquery';
import {Link, VStack, Text, Box, Button} from "@chakra-ui/react";

export const Lb6 = () => {
    const onClick = () => {
        const circle = $('#animated-circle');
        const delay = 700;

        circle.delay(delay).queue(function (next) {
            $(this).css({
                'position': 'absolute',
                'bottom': '0',
                'right': '0',
                'z-index': '1',
            });
            next();
        });

        circle.delay(delay).queue(function (next) {
            $(this).css('opacity', '.35');
            next();
        });

        circle.delay(delay).queue(function (next) {
            $(this).css('border-radius', '30px');
            next();
        });

        circle.delay(delay).queue(function (next) {
            $(this).css({
                'top': '0',
                'left': '0',
            });
            next();
        });

        circle.delay(delay).queue(function (next) {
            $(this).css('background', 'green');
            next();
        });

        circle.delay(delay).slideUp();
        circle.delay(delay).slideDown();
    };

    return (
        <Box className="p-6 m-5">
            <Box className="p-6 bg-white rounded-md shadow-md m-5">
                <VStack spacing={4} align="stretch" className="p-6">
                    <Text fontSize="2xl" fontWeight="bold">Завдання:</Text>
                    <Text fontStyle="italic">
                        Червоне коло R =50пікс (не використовувати картинки)<br />
                        1. Відображається у нижньому правому куті вікна браузера<br />
                        2. Змінює прозорість до 0,35<br />
                        3. Змінює радіус на 30 пікселів<br />
                        4. Рухається у верхній лівий кут вікна браузера<br />
                        5. Змінює колір на зелений<br />
                        6. Складається та відображається
                    </Text>
                    <Link px="6" fontWeight='bold' fontSize='24' href='https://github.com/Quikler/stipLb/src/componentsLb4.jsx'>Коди програми</Link>
            </VStack>
            </Box>

            <Box className="p-6 bg-white rounded-md shadow-md m-5">
                <div id="animated-circle" style={{
                    backgroundColor: "red",
                    borderRadius: "50px",
                    height: "150px",
                    width: "150px",
                }}></div>
                
                <Button mt="2" onClick={onClick}>Animate</Button>
            </Box>
        </Box>
    );
}
