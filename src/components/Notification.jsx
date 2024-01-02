const Notification = ({ message }) => {
  return message ? <p style={{ color: "red" }}>{message}</p> : <></>;
};

export default Notification;
