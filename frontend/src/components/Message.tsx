export const Message = ({
  username,
  user,
  index,
  message,
}: {
  username: string;
  user: string;
  index: number;
  message: string;
}) => {
  if (username === user) {
    return (
      <div
        key={index}
        className="w-52 bg-white ml-auto capitalize  p-4 rounded-md border border-black relative"
      >
        <p className="absolute top-0 right-5 text-xs">Tu</p>
        <p className="break-words">{message}</p>
      </div>
    );
  }
  return (
    <div
      key={index}
      className="w-52 bg-white mr-auto capitalize p-4 rounded-md border border-black relative"
    >
      <p className="absolute top-0  text-xs">{username}</p>
      <p className="break-words">{message}</p>
    </div>
  );
};
