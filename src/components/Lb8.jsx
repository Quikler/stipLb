import { Box, Code, Link, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const Lb8 = () => {
    const [xml, setXml] = useState("");
    const [dtdSchema, setDtdSchema] = useState("");
    const [xmlSchema, setXmlSchema] = useState("");

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('./cookbook.xml');
            return await response.text();
        }

        async function loadXml() {
            const response = await fetchData();
            const parser = new DOMParser();
            const parsedXml = parser.parseFromString(response, 'text/xml');

            if (parsedXml.getElementsByTagName("parsererror").length > 0) {
                console.error("Ошибка парсинга XML:", parsedXml.getElementsByTagName("parsererror")[0].textContent);
                return;
            }

            setXml(parsedXml);
        }

        loadXml();

        const xmlSchema = `
            <?xml version="1.0" encoding="UTF-8"?>
            <xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
                <xs:element name="КулінарнаКнига">
                    <xs:complexType>
                        <xs:sequence>
                            <xs:element name="Рецепт" maxOccurs="unbounded">
                                <xs:complexType>
                                    <xs:sequence>
                                        <xs:element name="ТипСтрави" type="xs:string"/>
                                        <xs:element name="НазваСтрави" type="xs:string"/>
                                        <xs:element name="МіраТерезів" type="xs:string"/>
                                        <xs:element name="Інгредієнт" maxOccurs="unbounded">
                                            <xs:complexType>
                                                <xs:sequence>
                                                    <xs:element name="Назва" type="xs:string"/>
                                                    <xs:element name="Кількість" type="xs:decimal"/>
                                                </xs:sequence>
                                                <xs:attribute name="id" type="xs:ID" use="optional"/>
                                                <xs:attribute name="category" type="xs:string" use="optional"/>
                                            </xs:complexType>
                                        </xs:element>
                                        <xs:element name="Рецепт" type="xs:string"/>
                                        <xs:element name="Калорії" type="xs:decimal"/>
                                    </xs:sequence>
                                    <xs:attribute name="id" type="xs:ID" use="optional"/>
                                </xs:complexType>
                            </xs:element>
                        </xs:sequence>
                        <xs:attribute name="version" type="xs:string" use="optional"/>
                    </xs:complexType>
                </xs:element>
            </xs:schema>
        `;
        setXmlSchema(xmlSchema);

        const dtdSchema = `
            <!ELEMENT КулінарнаКнига (Рецепт+)>
            <!ELEMENT Рецепт (ТипСтрави, НазваСтрави, МіраТерезів, Інгредієнт+, Рецепт, Калорії)>
            <!ELEMENT ТипСтрави (#PCDATA)>
            <!ELEMENT НазваСтрави (#PCDATA)>
            <!ELEMENT МіраТерезів (#PCDATA)>
            <!ELEMENT Інгредієнт (Назва, Кількість)>
            <!ELEMENT Назва (#PCDATA)>
            <!ELEMENT Кількість (#PCDATA)>
            <!ELEMENT Рецепт (#PCDATA)>
            <!ELEMENT Калорії (#PCDATA)>

            <!ATTLIST Інгредієнт 
                id ID #REQUIRED 
                category CDATA #IMPLIED>
            <!ATTLIST Рецепт 
                id ID #REQUIRED>
            <!ATTLIST КулінарнаКнига 
                version CDATA #IMPLIED>
        `;
        setDtdSchema(dtdSchema);

    }, []);

    return (
        <Box className="p-6 m-5">
            <Box className="p-6 bg-white rounded-md shadow-md m-5">
                <VStack spacing={4} align="stretch" className="p-6">
                    <Text fontSize="2xl" fontWeight="bold">Завдання:</Text>
                    <Text fontStyle="italic">
                        1. Створити опис структури документа XML за допомогою DTD-схеми. DTD-схема
                        обов’язково має вміщати листи атрибутів елементів (3-4), має бути вказано
                        множинність входження в елементів XML –документ.<br />
                        2. Виконати опис структури документа XML за допомогою XML Schema . Вона має
                        бути не згенерована автоматично! Та обов’язково вміщати елементи complexType (3-
                        4).
                    </Text>
                    <VStack className="mt-6">
                        <Link
                            fontWeight="bold"
                            fontSize="24"
                            href="https://github.com/Quikler/stipLb/tree/master/src/components/Lb8.jsx"
                        >
                            Коди програми
                        </Link>
                    </VStack>
                </VStack>
            </Box>

            <Box className="p-6 bg-white rounded-md shadow-md m-5">
                <Text fontSize="xl" fontWeight="bold">XML:</Text>
                <pre style={{ whiteSpace: 'pre-wrap' }}>
                    <Code>{xml ? new XMLSerializer().serializeToString(xml) : "Загрузка..."}</Code>
                </pre>
            </Box>
            
            <Box className="p-6 bg-white rounded-md shadow-md m-5">
                <Text fontSize="xl" fontWeight="bold">DTD Schema:</Text>
                <pre style={{ whiteSpace: 'pre-wrap' }}>
                    <Code>{dtdSchema}</Code>
                </pre>
            </Box>

            <Box className="p-6 bg-white rounded-md shadow-md m-5">
                <Text fontSize="xl" fontWeight="bold">XML Schema:</Text>
                <pre style={{ whiteSpace: 'pre-wrap' }}>
                    <Code>{xmlSchema}</Code>
                </pre>
            </Box>
        </Box>
    );
}
