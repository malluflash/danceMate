import SlotsContainer from "./SlotsContainer";

function DanceSlotCard() {
  return (
    <SlotsContainer>
      <div className="max-w-[300px] bg-gradient-to-br from-primary/60 via-secondary/60 to-accent/60 backdrop-blur-lg rounded-lg shadow-md overflow-hidden mx-4 border border-primary/30">
        <div className="p-5">
          <h3 className="text-xl font-semibold text-center text-white mb-2">Dance Form</h3>
          <h4 className="text-md text-center text-white/90 mb-2">Teacher</h4>
          <p className="text-center text-white/90 mb-1">Date</p>
          <p className="text-center text-white/90 mb-1">Time Slot</p>
          <p className="text-center text-white/90 mb-4">Total Count</p>
          <div className="text-center">
            <button 
              className="w-1/2 bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded transition-colors duration-200"
              onClick={() => {}}
            >
              Edit
            </button>
            <button
              className="w-1/2 mt-2 mx-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors duration-200"
              onClick={() => {}}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </SlotsContainer>
  );
}

export default DanceSlotCard;
