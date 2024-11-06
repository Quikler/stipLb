import {
    Box, Code, Link, Tab, Table, TabList, TabPanel, TabPanels, Tabs, Tbody, Td, Text, Th, Thead, Tr, VStack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const Lb10 = () => {
    const [receipts, setReceipts] = useState([]);
    const [receiptsNumbered, setReceiptsNumbered] = useState([]);

    const [originalXml, setOriginalXml] = useState("");

    function numberToWords(num) {
        num = Number(num);
        if (num === 0) return "zero";
    
        const belowTwenty = [
            "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
            "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
            "seventeen", "eighteen", "nineteen"
        ];
        const tens = [
            "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"
        ];
        const thousands = ["", "thousand", "million", "billion"];
    
        function helper(n) {
            if (n === 0) return "";
            else if (n < 20) return belowTwenty[n] + " ";
            else if (n < 100) return tens[Math.floor(n / 10)] + " " + helper(n % 10);
            else return belowTwenty[Math.floor(n / 100)] + " hundred " + helper(n % 100);
        }
    
        let word = "";
        let i = 0;
    
        while (num > 0) {
            if (num % 1000 !== 0) {
                word = helper(num % 1000) + thousands[i] + " " + word;
            }
            num = Math.floor(num / 1000);
            i++;
        }
    
        return word.trim();
    }

    useEffect(() => {
        const loadXmlAndXsl = async () => {
            try {
                const xmlOriginal = await (await fetch('./cookbook.xml')).text();
                setOriginalXml(xmlOriginal);

                const xslOriginal = await (await fetch('./cookbook-10.xsl')).text();

                setReceipts(transformXml(xmlOriginal, xslOriginal));
                setReceiptsNumbered(transformXmlNumbered(xmlOriginal, xslOriginal));
            } catch (error) {
                console.error("Error loading XML/XSL: ", error);
            }
        };
        
        loadXmlAndXsl();
    }, []);

    const transformXmlNumbered = (xmlText, xslText) => {
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

                    Array.from(columns[3].children).forEach((val, i) => {
                        let splitted = val.textContent.split(':');
                        let first = splitted[0].trim();
                        let second = splitted[1].trim();

                        second = parseInt(second.match(/\d+/)[0], 10);
                        second = numberToWords(second);

                        val.textContent = `${first}: ${second}`;
                    });
                    
                    if (columns.length === 6) {
                        const recipe = {
                            type: columns[0]?.textContent || '',
                            name: columns[1]?.textContent || '',
                            measure: columns[2]?.textContent || '',
                            ingradient: Array.from(columns[3].children).map(div => div.textContent).join(', ') || '',
                            recipe: columns[4]?.textContent || '',
                            calories: numberToWords(columns[5]?.textContent) || '',
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

                    if (columns.length === 6) {
                        const recipe = {
                            type: columns[0]?.textContent || '',
                            name: columns[1]?.textContent || '',
                            measure: columns[2]?.textContent || '',
                            ingradient: Array.from(columns[3].children).map(div => div.textContent).join(', ') || '',
                            recipe: columns[4]?.textContent || '',
                            calories: columns[5]?.textContent || '',
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
                        1. Завантажте документ XML, розроблений у попередніх роботах, в об&#39;єкт
                        документа та відобразіть у вікні браузера.<br />
                        2. Використовуючи методи DOM XML, сформуйте HTML-сторінку, що містить
                        таблицю з кількох стовпців .<br />
                        3. Використовуючи методи DOM XML, замініть цифрові значення їх словесними
                        еквівалентами.
                    </Text>
                    <VStack className="mt-6">
                        <Link
                            fontWeight="bold"
                            fontSize="24"
                            href="https://github.com/Quikler/stipLb/tree/master/src/components/Lb9.jsx"
                        >
                            Коди програми
                        </Link>
                    </VStack>
                </VStack>
            </Box>

            <Box className="p-6 bg-white rounded-md shadow-md m-5">
                <Text fontSize="xl" fontWeight="bold" mb={3}>Вихідний XML файл:</Text>
                <Box overflowX="auto">
                    <Code whiteSpace='pre-wrap'>{originalXml}</Code>
                </Box>
            </Box>

            <RecipeTable title="Рецепти:" data={receipts} />
            <RecipeTable title="Рецепти у яких числа еквівалентні їх строковому представленню:" data={receiptsNumbered} />
        </Box>
    );
};

export const RecipeTable = ({ title, data }) => (
    <Box className="p-6 bg-white rounded-md shadow-md m-5">
        <Text fontSize="xl" fontWeight="bold">{title}</Text>
        <Box overflowX="auto">
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Тип Страви</Th>
                        <Th>Назва Страви</Th>
                        <Th>Міра терезів</Th>
                        <Th>Інградієнти</Th>
                        <Th>Рецепт</Th>
                        <Th>Калорії</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data && data.map((recipe, index) => (
                        <Tr key={index}>
                            <Td>{recipe.type}</Td>
                            <Td>{recipe.name}</Td>
                            <Td>{recipe.measure}</Td>
                            <Td>{recipe.ingradient}</Td>
                            <Td>{recipe.recipe}</Td>
                            <Td>{recipe.calories}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    </Box>
);