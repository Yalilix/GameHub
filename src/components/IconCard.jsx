import { useNavigate } from 'react-router-dom';

export default function IconCard({ image, text, path }) {
  const navigate = useNavigate();
  const handleNavigate = (curPath) => {
    navigate(`/${curPath.toLowerCase().replaceAll(' ', '')}`);
  };
  return (
    <button
      className="relative h-52 w-44 rounded-xl shadow-xl overflow-hidden text-white"
      onClick={() => handleNavigate(path)}
    >
      <img src={image} alt="" className="h-4/5 w-full object-cover" />

      <div
        className="relative h-1/5 w-full bg-black/20 backdrop-blur-lg flex items-center justify-center"
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: 'center bottom',
          backgroundSize: 'cover',
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        <span className="relative text-white md:text-lg sm:text-md text-sm font-semibold">
          {text}
        </span>
      </div>
    </button>
  );
}
