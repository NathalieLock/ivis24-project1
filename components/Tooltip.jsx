export const Tooltip = ({ interactionData }) => {
  if (!interactionData) {
    return null;
  }

  return (
    <div
      className="absolute bg-black bg-opacity-80 rounded-md text-white text-sm px-2 py-1 ml-4 transform -translate-y-1/2"
      style={{
        left: `${interactionData.xPos}px`,
        top: `${interactionData.yPos}px`,
      }}
    >
      <div>{interactionData.name}</div>
    </div>
  );
};
