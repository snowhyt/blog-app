
const GenderCheckBox = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className="flex gap-4">
      {/* Male */}
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === "MALE" ? "selected" : ""
          }`}
        >
          <span className="label-text text-black">Male</span>
          <input
            type="radio"
            name="gender"
            className="radio checked:bg-accent"
            checked={selectedGender === "MALE"}
            onChange={() => onCheckboxChange("MALE")}
          />
        </label>
      </div>
      {/* Female */}
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === "FEMALE" ? "selected" : ""
          }`}
        >
          <span className="label-text text-black">Female</span>
          <input
            type="radio"
            name="gender"
            className="radio checked:bg-accent"
            checked={selectedGender === "FEMALE"}
            onChange={() => onCheckboxChange("FEMALE")}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckBox;
