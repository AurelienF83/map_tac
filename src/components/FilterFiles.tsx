const FilterFiles = () => {
  return (
    <div className="flex flex-col w-full md:w-48">
      <div className="mb-4 py-1 px-1 bg-card rounded-lg border border-border">
        {/* <h1 className="text-card-foreground font-semibold mb-2">Filtres</h1> */}
        <button className="mb-1 py-1 px-2 text-base text-card-foreground font-semibold hover:bg-accent cursor-pointer w-full rounded-sm">
          All
        </button>
        <button className="mb-1 py-1 px-2 text-base text-card-foreground font-semibold hover:bg-accent cursor-pointer w-full rounded-sm">
          Documentation
        </button>
        <button className="mb-1 py-1 px-2 text-base text-card-foreground font-semibold hover:bg-accent cursor-pointer w-full rounded-sm">
          Procédure
        </button>
        <button className="mb-1 py-1 px-2 text-base text-card-foreground font-semibold hover:bg-accent cursor-pointer w-full rounded-sm">
          Fichier de configuration
        </button>
      </div>
    </div>
  );
};

export default FilterFiles;
