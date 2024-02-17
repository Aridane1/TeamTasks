import { backendImageEndpoint } from "../constants/backendEndpoints";

export const Card = ({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg hover:scale-105 transition">
      <img
        className="w-full h-52 object-cover rounded-b-2xl "
        src={`${backendImageEndpoint}/${image}`}
        alt={title}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
    </div>
  );
};
