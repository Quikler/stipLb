import { Button, HStack, Link, Text, Box, Table, VStack, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const Lb3 = () => {
    const rows = 15;
    const cols = 100;

    const [grid, setGrid] = useState(() => Array(rows).fill().map(() => Array(cols).fill(0)));

    const fillGrid = () => {
        const randomGrid = Array(rows).fill().map(() => Array(cols).fill(0));
    
        // Заполнение randomGrid случайными значениями
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                randomGrid[row][col] = Math.round(Math.random());
            }
        }
    
        // Обновляем состояние grid
        setGrid(randomGrid);
    };

    useEffect(() => fillGrid(), []);

    const toggleCell = (row, col) => {
        const newGrid = grid.map((rowArr, rIdx) =>
            rowArr.map((cell, cIdx) => (rIdx === row && cIdx === col ? (cell === 1 ? 0 : 1) : cell))
        );
        setGrid(newGrid);
    }

    const onNewGame = () => fillGrid();

    const onNextGeneration = () => {
        const newNextGrid = grid.map((rowArr) => [...rowArr]); // Копируем текущую сетку

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const aliveNeighbors = countAliveNeighbors(row, col);
                if (grid[row][col] === 1) {
                    newNextGrid[row][col] = aliveNeighbors === 2 || aliveNeighbors === 3 ? 1 : 0;
                } else {
                    newNextGrid[row][col] = aliveNeighbors === 3 ? 1 : 0;
                }
            }
        }

        setGrid(newNextGrid);
    }

    const countAliveNeighbors = (row, col) => {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                const newRow = row + i;
                const newCol = col + j;
                if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                    count += grid[newRow][newCol];
                }
            }
        }
        return count;
    }

    return (
        <>
            <Box className="p-6 bg-white rounded-md shadow-md m-5 w-full">
                <Text fontSize="2xl" fontWeight="bold">Завдання:</Text>
                <Text fontStyle="italic">
                    Гра &quot;Життя&quot;.<br />
                    Гра моделює життя поколінь гіпотетичної колонії живих клітин на
                    прямокутному ігровому полі, які виживають, розмножуються чи гинуть відповідно до
                    таких правил.<br />
                </Text>

                <Flex justifyContent="start" my="6">
                    <Box>
                        <Text fontWeight="bold" fontSize="2xl">Нотатка</Text>
                        <HStack>
                            <div style={{backgroundColor: "greenyellow", width: "25px", height: "25px"}}></div>
                            <Text>ЗЕЛЕНІ - живі</Text>
                        </HStack>
                        <HStack>
                        <div style={{backgroundColor: "red", width: "25px", height: "25px"}}></div>
                            <Text>ЧЕРВОНІ - мертві</Text>
                        </HStack>
                    </Box>
                </Flex>

                <HStack my="6">
                    <Button colorScheme="green" onClick={onNextGeneration} id="next">
                        Наступне покоління
                    </Button>
                    <Button colorScheme="red" onClick={onNewGame}>
                        Нова гра
                    </Button>
                </HStack>

                <Table id="grid" backgroundColor="gray">
                    <tbody>
                        {grid.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, colIndex) => (
                                    <td
                                        key={colIndex}
                                        onClick={() => toggleCell(rowIndex, colIndex)}
                                        style={{
                                            width: "20px",
                                            height: "20px",
                                            backgroundColor: cell === 1 ? "greenyellow" : "red",
                                            border: "1px solid black",
                                        }}
                                    ></td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Link px="6" fontWeight='bold' fontSize='24' href='https://github.com/Quikler/stipLb/src/componentsLb4.jsx'>Коди програми</Link>
            </Box>
        </>
    );
}
