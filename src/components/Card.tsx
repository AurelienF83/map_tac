const Card = () => {
  return (
    <div className="">
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="text-sm text-white font-medium">Total Revenue</div>
      </div>
      <div className="">
        <div className="text-2xl text-white font-bold">$45,231.89</div>
        <p className="text-xs text-white">+20.1% from last month</p>
      </div>
    </div>
  );
};

export default Card;
