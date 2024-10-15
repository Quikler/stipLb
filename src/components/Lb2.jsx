import {Box, HStack, VStack, Text, Image, Link, Button} from "@chakra-ui/react";
import {useState} from "react";

export const Lb2 = () => {
    const images = [
        "https://i.pinimg.com/originals/3f/a4/5e/3fa45ef41f42544a0c391f908db867a9.jpg",
        "https://i.pinimg.com/736x/d2/a7/ea/d2a7ea4b14c29110b88bd89d7aa0e964.jpg",
        "https://content.wepik.com/media/ai/top-image-3.png",
        "https://imgv3.fotor.com/images/gallery/cartoon-character-generated-by-Fotor-ai-art-creator.jpg",
        "https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg"
    ];

    const [imageIndex, setImageIndex] = useState(0);

    const [openMenu, setOpenMenu] = useState(null);

    const onMenuClick = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    const onMenuMouseLeave = () => {
        setOpenMenu(null);
    };

    const onClick = btn => {
        if (btn.target.textContent == "Попереднє") {
            imageIndex <= 0 ? setImageIndex(images.length - 1) : setImageIndex(imageIndex - 1);
        }
        else if (btn.target.textContent == "Наступне") {
            imageIndex >= images.length - 1 ? setImageIndex(0) : setImageIndex(imageIndex + 1);
        }
    };

    return (
        <>
            <Box className="p-6 bg-white rounded-md shadow-md m-5 w-full">
                <VStack spacing={4} align="stretch" className="p-6">
                    <Text fontSize="2xl" fontWeight="bold">Завдання 1:</Text>
                    <Text fontStyle="italic">
                        Горизонтальне дворівневе меню, що розкривається при натисканні
                        лівою кнопкою миші. Другий рівень меню приховується, коли вказівник миші залишає
                        область вибраного пункту або меню.
                    </Text>
                </VStack>

                <HStack
                    align="start"
                    spacing={8}
                    className="w-128 text-black p-4 bg-gray-100 rounded-md"
                    onMouseLeave={onMenuMouseLeave}
                >
                    <Box onMouseLeave={onMenuMouseLeave}>
                        <Text
                            fontSize="lg"
                            className="cursor-pointer hover:text-green-500 p-2"
                            onClick={() => onMenuClick('menu1')}
                        >
                            Пункт меню 1
                        </Text>
                        {openMenu === 'menu1' && (
                            <VStack spacing={2} className="p-2 pl-4">
                                <Text className="hover:text-green-400 cursor-pointer">
                                    Підпункт 1.1
                                </Text>
                                <Text className="hover:text-green-400 cursor-pointer">
                                    Підпункт 1.2
                                </Text>
                            </VStack>
                        )}
                    </Box>

                    <Box onMouseLeave={onMenuMouseLeave}>
                        <Text
                            fontSize="lg"
                            className="cursor-pointer hover:text-green-500 p-2"
                            onClick={() => onMenuClick('menu2')}
                        >
                            Пункт меню 2
                        </Text>
                        {openMenu === 'menu2' && (
                            <VStack spacing={2} className="p-2 pl-4">
                                <Text className="hover:text-green-400 cursor-pointer">
                                    Підпункт 2.1
                                </Text>
                                <Text className="hover:text-green-400 cursor-pointer">
                                    Підпункт 2.2
                                </Text>
                            </VStack>
                        )}
                    </Box>
                </HStack>
            </Box>

            <Box className="p-6 bg-white rounded-md shadow-md m-5 w-full">
                <VStack spacing={4} align="stretch" className="p-6">
                    <Text fontSize="2xl" fontWeight="bold">Завдання 2:</Text>
                    <Text fontStyle="italic">
                        Організуйте послідовний перегляд зображень (не менше чотирьох) за
                        допомогою кнопок Попереднє зображення та Наступне зображення.
                    </Text>
                </VStack>
                

                <HStack p="6">
                    <Button onClick={onClick}>Попереднє</Button>
                    <Image src={images[imageIndex]} boxSize="200px" />
                    <Button onClick={onClick}>Наступне</Button>
                </HStack>
            </Box>

            <HStack p="6">
                <Link fontWeight='bold' fontSize='24' href='https://github.com/Quikler/src/components/Lb2.jsx'>Коди програми</Link>
            </HStack>
        </>
    );
}