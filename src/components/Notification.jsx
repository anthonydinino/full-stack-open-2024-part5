const Notification = ({ messageInfo }) => {
  const { message, isError } = messageInfo;
  if (message === null) {
    return null;
  }

  return (
    <div className={`notification ${isError && "error"}`}>
      {message.message}
    </div>
  );
};

export default Notification;
