import {useEffect, useState} from "react";
import {Box, HStack, Link, Text, VStack} from "@chakra-ui/react";

export const Lb7 = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchXMLData = async () => {
            try {
                const response = await fetch('./cookbook.xml');
                const xmlText = await response.text();

                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
                const recipes = xmlDoc.getElementsByTagName('Рецепт');

                const parsedRecipes = Array.from(recipes).map(recipe => ({
                    type: recipe.getElementsByTagName('ТипСтрави')[0]?.textContent || '',
                    name: recipe.getElementsByTagName('НазваСтрави')[0]?.textContent || '',
                    measure: recipe.getElementsByTagName('МіраТерезів')[0]?.textContent || '',
                    ingredients: Array.from(recipe.getElementsByTagName('Інгредієнт')).map(ingredient => ({
                        name: ingredient.getElementsByTagName('Назва')[0]?.textContent || '',
                        amount: ingredient.getElementsByTagName('Кількість')[0]?.textContent || '',
                    })),
                    recipe: recipe.getElementsByTagName('Рецепт')[0]?.textContent.trim() || '',
                    calories: Number(recipe.getElementsByTagName('Калорії')[0]?.textContent || 0),
                })).filter(recipe => 
                    recipe.type && recipe.name && recipe.ingredients.length > 0
                );

                setRecipes(parsedRecipes);
            } catch (error) {
                console.error("Error fetching XML data: ", error);
            }
        };

        fetchXMLData();
    }, []);

    return (
        <Box className="p-6 m-5">
            <Box className="p-6 bg-white rounded-md shadow-md m-5">
                <VStack spacing={4} align="stretch" className="p-6">
                    <Text fontSize="2xl" fontWeight="bold">Завдання:</Text>
                    <Text fontStyle="italic">
                        1. Побудувати графічно статичну та динамічну модель для заданого варіанту. <br />
                        2. Створіть XML-документ, використовуючи інформаційну модель,
                        побудовану в першій частині лабораторної роботи. Документ має вміщати
                        якнайменше ДЕСЯТЬ записів!
                    </Text>
                    <Text>
                        <b>&quot;Кулінарна книга&quot;:</b><br />
                        - Тип страви;<br />
                        - Назва страви;<br />
                        - міра терезів;<br />
                        - інгредієнт 1;<br />
                        - кількість інгредієнта 1;<br />
                        …<br />
                        - рецепт;<br />
                        – кількість калорій.
                    </Text>
                    <HStack justifyContent='center' gap={12} className="mt-6">
                        <Link
                            fontWeight="bold"
                            fontSize="24"
                            href="https://github.com/Quikler/stipLb/tree/master/src/components/Lb7.jsx"
                        >
                            Коди програми
                        </Link>
                        <Link
                            fontWeight="bold"
                            fontSize="24"
                            href="https://github.com/Quikler/stipLb/blob/master/public/cookbook.xml"
                        >
                            Xml файл
                        </Link>
                    </HStack>
                </VStack>
            </Box>
            <div className="p-6 bg-white rounded-md shadow-md m-5">
                <h2 className="text-2xl font-bold">Кулінарна книга</h2>
                <ul className="mt-4">
                    {recipes.map((recipe, index) => (
                        <li key={index} className="my-4 p-4 border-solid border-2 border-sky-500">
                            <div>
                                <strong>Тип Страви:</strong> {recipe.type}
                            </div>
                            <div>
                                <strong>Назва Страви:</strong> {recipe.name}
                            </div>
                            <div>
                                <strong>
                                    Інгредієнти:
                                </strong> 
                                {recipe.ingredients.map((ingredient, idx) => (
                                    <p className="ps-8" key={idx}>
                                        {ingredient.name}: {ingredient.amount}
                                    </p>
                                ))}
                            </div>
                            <div>
                                <strong>Рецепт:</strong> {recipe.recipe}
                            </div>
                            <div>
                                <strong>Калорії:</strong> {recipe.calories}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Box>
    );
};