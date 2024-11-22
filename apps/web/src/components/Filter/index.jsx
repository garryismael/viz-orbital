import PropTypes from "prop-types";
import { DualRangeSlider } from "../ui/slider";

const Filter = ({ ranges, handleUpdate }) => {
  return (
    <div className="grid grid-cols-2 gap-2 gap-y-6 !mt-6">
      <div>
        <p className="mb-8">Surf. (m²)</p>
        <DualRangeSlider
          label={(value) => value}
          labelPosition="top"
          value={ranges.surface}
          onValueChange={(values) => handleUpdate("surface", values)}
          min={0}
          max={200}
          step={1}
        />
      </div>
      <div>
        <p className="mb-8">Étage</p>
        <DualRangeSlider
          label={(value) => value}
          labelPosition="top"
          value={ranges.floor}
          onValueChange={(values) => handleUpdate("floor", values)}
          min={0}
          max={5}
          step={1}
        />
      </div>
      <div>
        <p className="mb-8">Pieces</p>
        <DualRangeSlider
          label={(value) => value}
          labelPosition="top"
          value={ranges.piece}
          onValueChange={(values) => handleUpdate("piece", values)}
          min={1}
          max={5}
          step={1}
        />
      </div>
      <div>
        <p className="mb-8">Prix (€)</p>
        <DualRangeSlider
          label={(value) => value}
          labelPosition="top"
          value={ranges.price}
          onValueChange={(values) => handleUpdate("price", values)}
          min={0}
          max={500000}
          step={10000}
        />
      </div>
    </div>
  );
};

Filter.propTypes = {
  ranges: PropTypes.object,
  handleUpdate: PropTypes.func,
};
export default Filter;
