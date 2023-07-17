export const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <p>
      <span>⛔</span>
      {message}
    </p>
  );
};
