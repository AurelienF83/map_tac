import React from "react";

const CardFiles: React.FC = () => {
  const cardsData = [
    { title: "Total", count: 100, description: "Début des données : 12/12/2023" },
    { title: "Documentations", count: 0, description: "0%" },
    { title: "Procédures", count: 0, description: "0%" },
    { title: "Fichier de configuration", count: 0, description: "0%" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1">
      {cardsData.map((card, index) => (
        <div key={index} className="bg-card border border-border p-2 rounded-lg sm:mt-4">
          <h2 className="text-sm text-card-foreground font-semibold mb-2">{card.title}</h2>
          <div className="text-2xl text-card-foreground font-semibold">{card.count}</div>
          <p className="text-xs text-card-foreground font-normal">{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CardFiles;
