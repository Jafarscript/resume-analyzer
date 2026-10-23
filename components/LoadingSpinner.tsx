const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-2">
      <div className="w-10 h-10 border-3 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
