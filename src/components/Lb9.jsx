import {
    Box, Code, Link, Tab, Table, TabList, TabPanel, TabPanels, Tabs, Tbody, Td, Text, Th, Thead, Tr, VStack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const Lb9 = () => {
    const [receipts, setReceipts] = useState([]);
    const [receiptsSorted, setReceiptsSorted] = useState([]);
    const [receiptsFiltered, setReceiptsFiltered] = useState([]);

    const [originalXml, setOriginalXml] = useState("");
    const [originalXsl, setOriginalXsl] = useState("");
    const [sortedXsl, setSortedXsl] = useState("");
    const [filteredXsl, setFilteredXsl] = useState("");

    useEffect(() => {
        const loadXmlAndXsl = async () => {
            try {
                const xmlOriginal = await (await fetch('./cookbook.xml')).text();
                setOriginalXml(xmlOriginal);

                const xslOriginal = await (await fetch('./cookbook.xsl')).text();
                setOriginalXsl(xslOriginal);

                setReceipts(transformXml(xmlOriginal, xslOriginal));

                const xslSorted = await (await fetch('./cookbook2.xsl')).text();
                setSortedXsl(xslSorted);

                setReceiptsSorted(transformXml(xmlOriginal, xslSorted));

                const xslFiltered = await (await fetch('./cookbook3.xsl')).text();
                setFilteredXsl(xslFiltered);

                setReceiptsFiltered(transformXml(xmlOriginal, xslFiltered));
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

                    if (columns.length === 6) {
                        const recipe = {
                            type: columns[0]?.textContent || '',
                            name: columns[1]?.textContent || '',
                            measure: columns[2]?.textContent || '',
                            ingradient: Array.from(columns[3].children).map(div => div.textContent).join(', ') || '',
                            calories: columns[4]?.textContent || '',
                            recipe: columns[5]?.textContent || '',
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
                            href="https://github.com/Quikler/stipLb/tree/master/src/components/Lb9.jsx"
                        >
                            Коди програми
                        </Link>
                    </VStack>
                </VStack>
            </Box>

            {/* XML Files Tabs */}
            <Box className="p-6 bg-white rounded-md shadow-md m-5">
                <Text fontSize="xl" fontWeight="bold">XML файли:</Text>
                <Box overflowX="auto">
                    <Tabs>
                        <TabList>
                            <Tab>Вихідний XML</Tab>
                            <Tab>Вихідний XSL</Tab>
                            <Tab>Відсортований XSL</Tab>
                            <Tab>Відфільтровани XSL</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel whiteSpace='pre-wrap'><Code>{originalXml}</Code></TabPanel>
                            <TabPanel whiteSpace='pre-wrap'><Code>{originalXsl}</Code></TabPanel>
                            <TabPanel whiteSpace='pre-wrap'><Code>{sortedXsl}</Code></TabPanel>
                            <TabPanel whiteSpace='pre-wrap'><Code>{filteredXsl}</Code></TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Box>

            <RecipeTable title="Рецепти:" data={receipts} />
            <RecipeTable title="Рецепти (Відсортовані за алфавітом):" data={receiptsSorted} />
            <RecipeTable title="Рецепти (Відфільтровані за калоріями більше ніж 340):" data={receiptsFiltered} />
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