const EmptyState = () => {
  return (
    <div
      className="
        px-4 
        py-10 
        sm:px-8 
        lg:px-10 
        lg:py-6 
        h-full 
        flex 
        justify-center 
        items-center 
        bg-gray-100
      "
    >
      <div className="text-center items-center flex flex-col">
        <h3 className="mt-2 text-2xl font-semibold text-gray-900">
          Chọn một cuộc trò chuyện để xem chi tiết
        </h3>
      </div>
    </div>
  );
};

export default EmptyState;
