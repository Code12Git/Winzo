import { FeaturesProvided } from "./constants/Features";

const Features = () => {
  return (
    <div className="flex">
      {FeaturesProvided?.map((feature) => (
        <div className="flex gap-2 text-white" key={feature.id}>
          <p>{feature.icon}</p>
          <p>{feature.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Features;
