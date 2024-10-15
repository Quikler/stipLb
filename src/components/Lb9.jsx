import {
    Box, Code, Link, Tab, Table, TabList, TabPanel, TabPanels, Tabs, Tbody, Td, Text, Th, Thead, Tr, VStack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const Lb9 = () => {
    const [xml, setXml] = useState([]);
    const [xsl, setXsl] = useState([]);
    const [xmlDataCode, setXmlDataCode] = useState("");
    const [xmlCode, setXmlCode] = useState("");
    const [xslCode, setXslCode] = useState("");

    useEffect(() => {
        const loadXmlAndXsl = async () => {
            try {
                const xmlDataResponse = await fetch('./cookbook.xml');
                const xmlResponse = await fetch('./cookbook-9.xml');
                const xslResponse = await fetch('./cookbook.xsl');

                const xmlData = await xmlDataResponse.text();
                setXmlDataCode(xmlData);

                const xmlText = await xmlResponse.text();
                setXmlCode(xmlText);

                const xslText = await xslResponse.text();
                setXslCode(xslText);

                const transformedXmlRecipes = transformXml(xmlText, xslText);
                const transformedXslRecipes = transformXml(xmlData, xslText);

                setXml(transformedXmlRecipes);
                setXsl(transformedXslRecipes);
            } catch (error) {
                console.error("Error loading XML/XSL: ", error);
            }
        };
        
        loadXmlAndXsl();
    }, []);

    const transformXml = (xmlText, xslText) => {
        try {
            const parser = new DOMParser();
            const xml = parser.parseFromString(xmlText, "text/xml");
            const xsl = parser.parseFromString(xslText, "text/xml");

            // Creating XSLTProcessor
            const xsltProcessor = new XSLTProcessor();
            xsltProcessor.importStylesheet(xsl);

            // Transform
            const resultDocument = xsltProcessor.transformToFragment(xml, document);

            // Creating container
            const tempDiv = document.createElement('div');
            tempDiv.appendChild(resultDocument);
            
            // Getting table rows
            const rows = tempDiv.querySelectorAll('tr');
            const transformedData = [];

            rows.forEach((row, index) => {
                if (index > 0) {
                    const columns = row.querySelectorAll('td');

                    if (columns.length >= 3) {
                        const recipe = {
                            type: columns[0]?.textContent || '',
                            name: columns[1]?.textContent || '',
                            calories: columns[2]?.textContent || '',
                        };
                        transformedData.push(recipe);
                    } else {
                        console.error('Expected at least 6 columns in the row, but found:', columns.length);
                    }
                }
            });

            return transformedData;
        } catch (error) {
            console.error("Error during XML transformation:", error);
            return [];
        }
    };

    return (
        <Box className="p-6 m-5">
            <Box className="p-6 bg-white rounded-md shadow-md m-5">
                <VStack spacing={4} align="stretch" className="p-6">
                    <Text fontSize="2xl" fontWeight="bold">Завдання:</Text>
                    <Text fontStyle="italic">
                        1) Створіть власні шаблони XSL. Як вихідний файл використовуйте
                        результати робіт 6 і 7.<br />
                        2) Виконайте сортування записів за одним із можливих критеріїв та
                        фільтрацію даних за одним із можливих показників
                    </Text>
                    <VStack className="mt-6">
                        <Link
                            fontWeight="bold"
                            fontSize="24"
                            href="https://github.com/Quikler/stipLb/src/componentsLb9.jsx"
                        >
                            Коди програми
                        </Link>
                    </VStack>
                </VStack>
            </Box>

            <Box className="p-6 bg-white rounded-md shadow-md m-5">
                <Text fontSize="xl" fontWeight="bold">XML файли:</Text>
                <Box overflowX="auto">
                    <Tabs>
                        <TabList>
                            <Tab>XML</Tab>
                            <Tab>XML шаблон</Tab>
                            <Tab>XSL шаблон</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <pre style={{whiteSpace: 'pre-wrap'}}>
                                    <Code>
                                        {xmlDataCode}
                                    </Code>
                                </pre>
                            </TabPanel>
                            <TabPanel>
                                <pre style={{whiteSpace: 'pre-wrap'}}>
                                    <Code>
                                        {xmlCode}
                                    </Code>
                                </pre>
                            </TabPanel>
                            <TabPanel>
                                <pre style={{whiteSpace: 'pre-wrap'}}>
                                    <Code>
                                        {xslCode}
                                    </Code>
                                </pre>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Box>

            <Box className="p-6 bg-white rounded-md shadow-md m-5">
                <Text fontSize="xl" fontWeight="bold">XML шаблон:</Text>
                <Box overflowX="auto">
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Тип Страви</Th>
                                <Th>Назва Страви</Th>
                                <Th>Калорії</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {xml && xml.map((recipe, index) => (
                                <Tr key={index}>
                                    <Td>{recipe.type}</Td>
                                    <Td>{recipe.name}</Td>
                                    <Td>{recipe.calories}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </Box>

            <Box className="p-6 bg-white rounded-md shadow-md m-5">
                <Text fontSize="xl" fontWeight="bold">XSL шаблон:</Text>
                <Box overflowX="auto">
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Тип Страви</Th>
                                <Th>Назва Страви</Th>
                                <Th>Калорії</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {xsl && xsl.map((recipe, index) => (
                                <Tr key={index}>
                                    <Td>{recipe.type}</Td>
                                    <Td>{recipe.name}</Td>
                                    <Td>{recipe.calories}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </Box>
        </Box>
    );
};