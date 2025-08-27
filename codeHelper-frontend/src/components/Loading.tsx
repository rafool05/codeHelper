
const Loading = () => {
  return (
    <div className="fixed inset-0 bg-primary-900 bg-opacity-95 flex flex-col items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-primary-800 border-t-secondary-800 rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-medium tracking-widest uppercase text-secondary-800 select-none">
        Loading...
      </p>
    </div>
  );
};

export default Loading;
