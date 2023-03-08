const MailList = () => {
  return (
    <div className="w-full bg-[#003580] text-white flex flex-col items-center gap-5 mt-12 p-12">
      <h1>Save time, save money!</h1>
      <span>Sign up and we'll send the best deals to you</span>
      <div>
        <input
          type="text"
          placeholder="Your Email"
          className="w-72 h-8 mr-2.5 p-2.5 rounded-md border-none"
        />
        <button className="h-12 bg-[#0071c2] text-white font-medium cursor-pointer rounded-md border-none">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default MailList;
