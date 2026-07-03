const NoDataMessage = ({ message = "No data available" }) => {
    return (
        <div className="text-center w-full p-4 rounded-full bg-gray-200/50 mt-4">
            <p>{message}</p>
        </div>
    );
};

export default NoDataMessage;