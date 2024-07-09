import Navbar from "@/components/Navbar";

const Files = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="w-full border-b border-border">
        <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-screen-xl">
          <Navbar />
        </div>
      </div>
      <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-screen-xl">
        <h1 className="text-2xl font-bold text-foreground">Files Page</h1>
      </div>
    </div>
  );
};

export default Files;
