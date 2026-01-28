const RequestPending = () => {
  return (
    <div className="p-10 text-center">
      <h2 className="text-lg font-semibold">
        Your driver request is under review
      </h2>
      <p className="text-sm text-muted-foreground fon">
        Please wait for admin approval.
      </p>
    </div>
  );
};

export default RequestPending;
