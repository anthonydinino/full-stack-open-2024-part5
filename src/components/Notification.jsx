const Notification = ({ messageInfo }) => {
  if (messageInfo) {
    const { message, isError } = messageInfo;
    return (
      <div className={`notification ${isError && "error"}`}>{message}</div>
    );
  } else {
    return <></>;
  }
};

export default Notification;
