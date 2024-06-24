// Définition des props pour une seule carte
type CardProps = {
  title: string;
  count: number;
  description: string;
};

// Composant pour une seule carte
const Card: React.FC<CardProps> = ({ title, count, description }) => {
  return (
    <div className="bg-background border border-border p-2 rounded-lg sm:mt-4">
      <h2 className="text-sm text-card-foreground font-semibold mb-2">{title}</h2>
      <div className="text-2xl text-card-foreground font-semibold">{count}</div>
      <p className="text-xs text-card-foreground font-normal">{description}</p>
    </div>
  );
};

type CardsContainerProps = {
  statusCounts: {
    total: number;
    réalisée: number;
    àVenir: number;
    reportée: number;
  };
};

const CardsContainer: React.FC<CardsContainerProps> = ({ statusCounts }) => {
  const percentageRéalisée =
    statusCounts.total > 0 ? ((statusCounts.réalisée / statusCounts.total) * 100).toFixed(2) : 0;
  const percentageÀVenir = statusCounts.total > 0 ? ((statusCounts.àVenir / statusCounts.total) * 100).toFixed(2) : 0;
  const percentageReportée =
    statusCounts.total > 0 ? ((statusCounts.reportée / statusCounts.total) * 100).toFixed(2) : 0;

  const cardsData = [
    { title: "Total", count: statusCounts.total, description: "Début des données : 12/12/2023" },
    {
      title: "Réalisée",
      count: statusCounts.réalisée,
      description: `${percentageRéalisée}%`,
    },
    {
      title: "À venir",
      count: statusCounts.àVenir,
      description: `${percentageÀVenir}%`,
    },
    {
      title: "Reportée",
      count: statusCounts.reportée,
      description: `${percentageReportée}%`,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1">
      {cardsData.map((card, index) => (
        <Card key={index} title={card.title} count={card.count} description={card.description} />
      ))}
    </div>
  );
};

export default CardsContainer;
