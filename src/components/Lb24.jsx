import { Box, HStack, VStack, Text, Image, Link, Button, Img, Heading, Textarea } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

export const Lb24 = () => {
    const [serverCode, setServerCode] = useState("");
    const textAreaRef = useRef();

    useEffect(() => {
        const fetchServerCode = async () => {
            try {
                const res = await fetch("./server.js");
                const resText = await res.text();
                setServerCode(resText);
            } catch (e) {
                console.error('Cannot fetch server code:', e.message);
            }
        }

        fetchServerCode();
    }, []);

    useEffect(() => {
        textAreaRef.current.style.height = "1px";
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }, [serverCode])

    return (
        <Box className="p-6 bg-white rounded-md shadow-md m-5 w-full">
            <VStack spacing={4} align="stretch" className="p-6">
                <Heading>Варіант 3</Heading>

                <Heading>GET-запит на /api/user, який повертає випадкові дані користувача (ім’я, вік): &#123; &quot;name&quot;: &quot;Олександр&quot;, &quot;age&quot;: 25 &#125;.</Heading>
                <Img src="./images/lb2.4.1.png" />

                <Heading>POST-запит на /api/uppercase, який приймає рядок text і повертає його в верхньому регістрі: &#123; &quot;uppercase&quot;: &quot;&lt;text&gt;&quot;.toUpperCase() &#125;.</Heading>

                <Img src="./images/lb2.4.2.png" />

                <Heading>Server code:</Heading>
                <Textarea ref={textAreaRef} readOnly value={serverCode}></Textarea>
            </VStack>

            <HStack p="6">
                <Link fontWeight='bold' fontSize='24' href='https://github.com/Quikler/stipLb/blob/master/src/components/Lb24.jsx'>Коди програми</Link>
            </HStack>
        </Box>
    );
}
