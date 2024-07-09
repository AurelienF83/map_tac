import React from "react";
import { Button } from "./ui/button";

const files = [
  {
    name: "Document 1",
    size: "2 MB",
    date: "12/12/2023",
    url: "#",
  },
  {
    name: "Document 2",
    size: "1.5 MB",
    date: "13/12/2023",
    url: "#",
  },
  {
    name: "Document 3",
    size: "3 MB",
    date: "14/12/2023",
    url: "#",
  },
];

const FileList: React.FC = () => {
  return (
    <div className="p-4 bg-card rounded-lg">
      <h2 className="text-lg font-semibold text-card-foreground mb-4">Liste des fichiers</h2>
      <div className="grid grid-cols-4 gap-4 mb-2 text-card-foreground font-semibold">
        <div className="text-left">Nom</div>
        <div className="text-left">Taille</div>
        <div className="text-left">Date</div>
        <div></div> {/* Placeholder for download button */}
      </div>
      <ul>
        {files.map((file, index) => (
          <li
            key={index}
            className={`grid grid-cols-4 gap-4 items-center mb-2 p-2 bg-background hover:bg-accent rounded-sm transition-colors ${
              index !== files.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <div className="text-sm font-semibold text-left col-start-1 col-end-2">{file.name}</div>
            <div className="text-xs text-left col-start-2 col-end-3">{file.size}</div>
            <div className="text-xs text-left col-start-3 col-end-4">{file.date}</div>
            <div className="col-start-4 col-end-5 text-right">
              <Button size="sm">Télécharger</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
