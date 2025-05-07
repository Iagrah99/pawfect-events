const DeletingContent = ({ content }) => {
  return (
    <div className="flex flex-col justify-center items-center text-center bg-slate-900 min-h-screen relative">
      <div className=" absolute top-64">
        <div className="text-3xl lg:text-5xl mb-3 text-white">
          Deleting {content}...
        </div>
      </div>
      <span className="inline-block w-20 h-20 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></span>
    </div>
  );
};

export default DeletingContent;
