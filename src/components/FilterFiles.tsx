import React from "react";
import { Settings, FileText, FileCode, FileCog } from "lucide-react";

const FilterFiles = () => {
  return (
    <div className="flex flex-col w-full md:w-52">
      <div className="mb-4 py-1 px-1 bg-card rounded-lg border border-border">
        <button className="mb-1 py-1 px-2 flex items-center text-sm text-card-foreground font-semibold hover:bg-accent cursor-pointer w-full rounded-sm">
          <Settings className="mr-2" size={16} />
          All
        </button>
        <button className="mb-1 py-1 px-2 flex items-center text-sm text-card-foreground font-semibold hover:bg-accent cursor-pointer w-full rounded-sm">
          <FileText className="mr-2" size={16} />
          Documentation
        </button>
        <button className="mb-1 py-1 px-2 flex items-center text-sm text-card-foreground font-semibold hover:bg-accent cursor-pointer w-full rounded-sm">
          <FileCode className="mr-2" size={16} />
          Procédure
        </button>
        <button className="mb-1 py-1 px-2 flex items-center text-sm text-card-foreground font-semibold hover:bg-accent cursor-pointer w-full rounded-sm">
          <FileCog className="mr-2" size={16} />
          Fichier de configuration
        </button>
      </div>
    </div>
  );
};

export default FilterFiles;
