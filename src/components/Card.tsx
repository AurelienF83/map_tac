// Définition des props pour une seule carte
type CardProps = {
  title: string;
  value: string;
  description: string;
};

// Composant pour une seule carte
const Card: React.FC<CardProps> = ({ title, value, description }) => {
  return (
    <div className="bg-red-500 border border-white p-2 rounded-lg sm:mt-4">
      <h2 className="text-sm text-white font-medium mb-2">{title}</h2>
      <div className="text-2xl text-white font-bold">{value}</div>
      <p className="text-xs text-white">{description}</p>
    </div>
  );
};

// Jeu de données pour les cartes
const cardsData = [
  { title: "Total", value: "$40,000", description: "+15% depuis le dernier mois" },
  { title: "Réalisée", value: "$25,000", description: "+10% depuis le dernier mois" },
  { title: "À venir", value: "$55,000", description: "+25% depuis le dernier mois" },
  { title: "Reportée", value: "$75,000", description: "+35% depuis le dernier mois" },
];

// Composant conteneur pour l'ensemble des cartes
const CardsContainer: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1">
      {cardsData.map((card, index) => (
        <Card key={index} title={card.title} value={card.value} description={card.description} />
      ))}
    </div>
  );
};

export default CardsContainer;
