const RequestPending = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Your driver request is under review
        </h2>
        <p className="text-sm text-gray-500">
          Please wait for admin approval.
        </p>
        <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 text-2xl">
  ⏳
</div>
      </div>
    </div>
  );
};

export default RequestPending;
