import { Link as RouterLink } from 'react-router-dom'
import {Alert, Box, Button, FormControl, FormLabel, HStack, Input, Link, Text, VStack} from "@chakra-ui/react";
import {useState} from "react";

export const Lb4 = () => {
    return (
        <>
            <VStack>
                <RegistrationForm />

                <RegexExpression />
            </VStack>
        </>
    );
}

export const RegistrationForm  = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        organization: "",
        cardNumber: "",
        phone: "",
        email: "",
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        organization: "",
        cardNumber: "",
        phone: "",
        email: "",
    });
    const [cardAttempts, setCardAttempts] = useState(0);

    const validateFields = () => {
        const newErrors = {};

        if (!formData.firstName) newErrors.firstName = "Ім'я має бути вказане";
        if (!formData.lastName) newErrors.lastName = "Прізвище має бути вказане";
        if (!formData.organization) newErrors.organization = "Організація має бути вказана";
        if (!formData.cardNumber) newErrors.cardNumber = "Номер картки має бути вказаний";
        if (!formData.phone) newErrors.phone = "Номер телефону має бути вказаний";
        if (!formData.email) newErrors.email = "Електронна адреса має бути вказана";

        if (formData.firstName && !/^[a-zA-Zа-яА-Я]{2,}$/.test(formData.firstName)) {
            newErrors.firstName = "Некоректне ім'я";
        }

        if (formData.lastName && !/^[a-zA-Zа-яА-Я]{2,}$/.test(formData.lastName)) {
            newErrors.lastName = "Некоректне прізвище";
        }

        if (formData.phone && !/^\+?[\d\s-]{10,15}$/.test(formData.phone)) {
            newErrors.phone = "Некоректний номер телефону";
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Некоректна електронна адреса";
        }

        if (formData.cardNumber && !/^\d{16}$/.test(formData.cardNumber)) {
            newErrors.cardNumber = "Некоректний номер кредитної картки";
            setCardAttempts((prev) => prev + 1);
        }

        return newErrors;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateFields();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            alert("Форма успішно відправлена!");
            setCardAttempts(0);
        }
    };

    const onFormClear = () => {
        setFormData({
            firstName: "",
            lastName: "",
            organization: "",
            cardNumber: "",
            phone: "",
            email: "",
        });
        setErrors({
            firstName: "",
            lastName: "",
            organization: "",
            cardNumber: "",
            phone: "",
            email: "",
        });
        setCardAttempts(0);
    };

    return (
        <>
            <Box className="p-6 bg-white rounded-md shadow-md m-5">
                <VStack spacing={4} align="stretch" className="p-6">
                    <Text fontSize="2xl" fontWeight="bold">Завдання:</Text>
                    <Text fontStyle="italic">
                        1. Створити сторінку з динамічним змістом &quot;Перевірка значень, введених користувачем поля форми для реєстрації&quot;.
                        Форма повинна містити поля «Ім&#39;я», «Прізвище», «Найменування організації», «Номер кредитної картки», «Номер телефону», «Адреса електронної пошти»,
                        кнопки «Надіслати» та «Очистити».
                    </Text>
                    <Text fontStyle="italic">
                        2. Здійснити перевірку заповненості даними всіх полів.
                    </Text>
                    <Text fontStyle="italic">
                        3. Побудувати шаблон для перевірки даних кредитної картки з обмеженням кількості спроб неправильного введення даних трьома.
                    </Text>
                    <Text fontStyle="italic">
                        4. Остання перевірка має контролювати структуру та вміст полів (правильність введення імені та прізвища, номери телефону, електронної адреси.).
                    </Text>
                    <Text fontStyle="italic">
                        5. Виконати завдання, що відповідає порядковому номеру студента у журналі групи.
                    </Text>

                    <Link px="6" fontWeight='bold' fontSize='24' href='https://github.com/Quikler/stipLb/tree/master/src/components/Lb4.jsx'>Коди програми</Link>
                </VStack>
            </Box>

            <Box className="p-6 bg-white rounded-md shadow-md m-5 w-full">
                <form onSubmit={onSubmit}>
                    <FormControl mb={4}>
                        <FormLabel>Імя:</FormLabel>
                        <Input
                            placeholder="Імя"
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        />
                        {errors.firstName && <Alert status="error" backgroundColor="transparent" textColor="red">{errors.firstName}</Alert>}
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>Прізвище:</FormLabel>
                        <Input
                            placeholder="Прізвище"
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        />
                        {errors.lastName && <Alert status="error" backgroundColor="transparent" textColor="red">{errors.lastName}</Alert>}
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>Найменування організації:</FormLabel>
                        <Input
                            placeholder="Найменування організації"
                            value={formData.organization}
                            onChange={(e) => setFormData({...formData, organization: e.target.value})}
                        />
                        {errors.organization && <Alert status="error" backgroundColor="transparent" textColor="red">{errors.organization}</Alert>}
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>Номер кредитної картки</FormLabel>
                        <Input
                            placeholder="Номер кредитної картки"
                            value={formData.cardNumber}
                            onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                            isDisabled={cardAttempts >= 3}
                        />
                        {errors.cardNumber && <Alert status="error" backgroundColor="transparent" textColor="red">{errors.cardNumber}</Alert>}
                        {cardAttempts >= 3 && <Alert status="error" backgroundColor="transparent" textColor="red">Перевищено кількість спроб</Alert>}
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>Номер телефону</FormLabel>
                        <Input
                            placeholder="Номер телефону"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                        {errors.phone && <Alert status="error" backgroundColor="transparent" textColor="red">{errors.phone}</Alert>}
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>Адреса електронної пошти</FormLabel>
                        <Input
                            placeholder="Адреса електронної пошти"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                        {errors.email && <Alert status="error" backgroundColor="transparent" textColor="red">{errors.email}</Alert>}
                    </FormControl>

                    <HStack spacing={2} justifyContent="end">
                        <Button colorScheme="green" type="submit" isDisabled={cardAttempts >= 3}>Відправити</Button>
                        <Button onClick={onFormClear}>Очистити</Button>
                    </HStack>
                </form>
            </Box>
        </>
    );
};

export const RegexExpression = () => {
    const [inputText, setInputText] = useState('');
    const [foundWords, setFoundWords] = useState([]);

    const handleInputChange = (e) => {
        const text = e.target.value;
        setInputText(text);

        const regex = /a+b{4,}a+/g;
        setFoundWords(text.match(regex) || []);
    };

    return (
        <>
            <Box className="p-6 bg-white rounded-md shadow-md m-5">
                <VStack spacing={4} align="stretch" className="p-6">
                    <Text fontSize="2xl" fontWeight="bold">Завдання:</Text>
                    <Text fontStyle="italic">
                        Дано рядок &#39;aa aba abba abbba abbbba abbbbba&#39;. Напишіть
                        регулярний вираз, який знайде рядки виду aba, у яких &#39;b&#39; зустрічається
                        більше 4 разів (включно).
                    </Text>
                </VStack>

                <div className="p-6">
                    <h3 className="text-2xl font-bold mb-4">Введіть рядок</h3>

                    <textarea
                        className="border-2 border-gray-300 rounded-md p-2 w-full mb-4"
                        rows="4"
                        placeholder="Введіть рядок"
                        value={inputText}
                        onChange={handleInputChange}
                    />

                    <h3 className="text-xl font-semibold">Знайдені слова:</h3>
                    <ul className="list-disc pl-5">
                        {foundWords.length > 0 ?
                            (foundWords.map((word, index) => <li key={index}>{word}</li>)) :
                            (<p>Немає збігів.</p>)}
                    </ul>
                </div>

                <Link px="6" fontWeight='bold' fontSize='24' href='https://github.com/Quikler/stipLb/tree/master/src/components/Lb4.jsx'>Коди програми</Link>

            </Box>
        </>
    );
};