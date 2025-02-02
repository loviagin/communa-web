"use client";

import Image from "next/image";

export default function GlobalError() {
  return (
    <html>
      <body style={{ 
        backgroundColor: "#1a1a1a", 
        color: "white", 
        textAlign: "center", 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh",
        padding: "20px"
      }}>
        <Image src="/logo.png" alt="Logo" width={150} height={150} />
        <h1 style={{ fontSize: "28px", margin: "20px 0" }}>Сайт в режиме технического обслуживания</h1>
        <p style={{ fontSize: "18px", opacity: 0.8 }}>Скоро вернемся! Спасибо за ваше терпение.</p>
      </body>
    </html>
  );
}