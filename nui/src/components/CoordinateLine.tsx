// src/components/CoordinateLine.tsx
import React from 'react';
import styles from './CoordinateLine.module.css';

interface CoordinateLineProps {
    value: string;
}

// Função de copiar compatível com CFX NUI (RedM/FiveM)
function copyToClipboardCFX(text: string) {
    try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);

        textarea.select();
        const ok = document.execCommand("copy");

        document.body.removeChild(textarea);

        if (!ok) {
            console.warn("execCommand falhou");
        }
    } catch (err) {
        console.error("Erro ao copiar:", err);
    }
}

const CopyIcon: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button
        className={styles.copyButton}
        onClick={onClick}
        aria-label="Copiar coordenada"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={styles.copyIcon}
        >
            <path d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3.414l-2 2H8a1 1 0 0 1-1-1v-4H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3zM9 4v12h9V4H9zm1 2h7v10h-7V6zM5 8v8h1v1a1 1 0 0 0 1 1h8v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1zM9 8h7v10h-7V8z" />
        </svg>
    </button>
);

export const CoordinateLine: React.FC<CoordinateLineProps> = ({ value }) => {

    const handleCopy = React.useCallback(() => {
        copyToClipboardCFX(value);
        console.log(`Copiado: ${value}`);
    }, [value]);

    return (
        <div className={styles.coordinateLine}>
            <span className={styles.coordinateText}>{value}</span>
            <CopyIcon onClick={handleCopy} />
        </div>
    );
};
