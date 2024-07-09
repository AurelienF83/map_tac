import Navbar from "@/components/Navbar";
import CardFiles from "@/components/CardFiles";
import FilterFiles from "@/components/FilterFiles";
import FileList from "@/components/Filelist";

const Files = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="w-full border-b border-border">
        <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-screen-xl">
          <Navbar />
        </div>
      </div>
      <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-screen-xl">
        <div className="mb-4">
          <CardFiles />
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-52 mr-2">
            <FilterFiles />
          </div>
          <div className="flex-grow px-0 py-0 mt-0 md:mt-0 border border-border rounded-lg bg-background">
            <FileList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Files;
