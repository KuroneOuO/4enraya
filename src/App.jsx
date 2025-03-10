import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";

const ROWS = 6;
const COLS = 7;

export default function App() {
  const [board, setBoard] = useState(
    Array(ROWS)
      .fill()
      .map(() => Array(COLS).fill(0))
  );
  const [currentPlayer, setCurrentPlayer] = useState(1);

  const dropPiece = (col) => {
    let newBoard = [...board.map((row) => [...row])];

    for (let r = ROWS - 1; r >= 0; r--) {
      if (newBoard[r][col] === 0) {
        newBoard[r][col] = currentPlayer;
        setBoard(newBoard);

        if (checkWin(newBoard, r, col)) {
          Alert.alert(`¡El jugador ${currentPlayer === 1 ? "🔴" : "🟡"} gana!`);
          return;
        }

        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        return;
      }
    }
  };

  const checkWin = (board, row, col) => {
    return (
      checkDirection(board, row, col, 1, 0) ||
      checkDirection(board, row, col, 0, 1) ||
      checkDirection(board, row, col, 1, 1) ||
      checkDirection(board, row, col, 1, -1)
    );
  };

  const checkDirection = (board, row, col, rowStep, colStep) => {
    let count = 1;
    count += countPieces(board, row, col, rowStep, colStep);
    count += countPieces(board, row, col, -rowStep, -colStep);
    return count >= 4;
  };

  const countPieces = (board, row, col, rowStep, colStep) => {
    let count = 0;
    let r = row + rowStep;
    let c = col + colStep;
    while (
      r >= 0 &&
      r < ROWS &&
      c >= 0 &&
      c < COLS &&
      board[r][c] === currentPlayer
    ) {
      count++;
      r += rowStep;
      c += colStep;
    }
    return count;
  };

  const resetGame = () => {
    setBoard(
      Array(ROWS)
        .fill()
        .map(() => Array(COLS).fill(0))
    );
    setCurrentPlayer(1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>4 en Línea</Text>
      <View style={styles.board}>
        {board.map((row, rIdx) => (
          <View key={rIdx} style={styles.row}>
            {row.map((cell, cIdx) => (
              <TouchableOpacity
                key={cIdx}
                style={[
                  styles.cell,
                  cell === 1
                    ? styles.red
                    : cell === 2
                    ? styles.yellow
                    : styles.empty,
                ]}
                onPress={() => dropPiece(cIdx)}
              />
            ))}
          </View>
        ))}
      </View>
      <Text style={styles.turn}>
        Turno: {currentPlayer === 1 ? "🔴" : "🟡"}
      </Text>
      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetText}>Reiniciar Juego</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#222",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  board: {
    borderWidth: 2,
    borderColor: "#fff",
    padding: 5,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: 50,
    height: 50,
    margin: 2,
    borderRadius: 25,
  },
  empty: {
    backgroundColor: "#1f7a8c",
  },
  red: {
    backgroundColor: "red",
  },
  yellow: {
    backgroundColor: "yellow",
  },
  turn: {
    fontSize: 20,
    color: "#fff",
    marginTop: 10,
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: "#ff4757",
    padding: 10,
    borderRadius: 10,
  },
  resetText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
