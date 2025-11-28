import React, { useEffect } from "react";
import styles from "./App.module.css";
import { CoordinateLine } from "./components/CoordinateLine";

interface ParsedCoords {
  x: string;
  y: string;
  z: string;
  h: string;
}

function parseInput(input: string): ParsedCoords | null {
  const parts = input.trim().split(/\s+/);
  if (parts.length === 4) {
    return {
      x: parts[0],
      y: parts[1],
      z: parts[2],
      h: parts[3],
    };
  }
  return null;
}

export default function App() {
  const [rawInput, setRawInput] = React.useState("");
  const [visible, setVisible] = React.useState(false);

  const coords = parseInput(rawInput);

  const handleClose = () => {
    setVisible(false);
    fetch(`http://${GetParentResourceName()}/closeNui`, {
      method: "POST",
    });
  };

  // ⛔ Se ainda não temos coords, mostramos somente o cartão vazio
  if (visible && !coords) {
    return (
      <div className={styles.appContainer}>
        <div className={styles.card}>
          <h5 className={styles.header}>Coordinates</h5>
          <div className={styles.body}>
            <p style={{ color: "#ccc", textAlign: "center" }}>
              Aguardando coordenadas...
            </p>
            <button className={styles.closeButton} onClick={handleClose}>
              CLOSE
            </button>
          </div>
        </div>
      </div>
    );
  }

  const formattedCoordinates = coords
    ? [
        `x = ${coords.x}, y = ${coords.y}, z = ${coords.z}, h = ${coords.h}`,
        `x = ${coords.x}, y = ${coords.y}, z = ${coords.z}`,
        `${coords.x}, ${coords.y}, ${coords.z}`,
        `vector3(${coords.x}, ${coords.y}, ${coords.z})`,
        `vec3(${coords.x}, ${coords.y}, ${coords.z})`,
      ]
    : [];

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log("📩 NUI RECEIVED:", event.data);

      if (!event.data?.action) return;

      if (event.data.action === "open") {
        console.log("✔ Coords recebidas:", event.data.coords);
        setRawInput(event.data.coords);
        setVisible(true);
      }

      if (event.data.action === "close") {
        setVisible(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (visible && event.key === "Escape") {
        handleClose();
      }
    };

    // Adiciona o listener CORRETO
    window.addEventListener("message", handleMessage);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("message", handleMessage);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [visible]);

  return (
    <div
      className={styles.appContainer}
      style={{ display: visible ? "flex" : "none" }}
    >
      <div className={styles.card}>
        <h5 className={styles.header}>Coordinates</h5>

        <div className={styles.body}>
          {formattedCoordinates.map((coordValue, index) => (
            <CoordinateLine key={index} value={coordValue} />
          ))}

          <button className={styles.closeButton} onClick={handleClose}>
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
