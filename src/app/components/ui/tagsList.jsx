import React from "react";
import PropTypes from "prop-types";

function TagsList({
  items,
  valueProperty,
  contentProperty,
  onItemSelect,
  selectedItem
}) {
  const tags = [...items.keys()];
  return (
    <div className="btn-group">
      {tags.map((tag) => (
        <button
          key={tag}
          className={"btn btn-outline-primary" + (JSON.stringify(tag) === JSON.stringify(selectedItem) ? " active" : "")}
          onClick={() => onItemSelect(tag)}
        >
          <h5 className="card-title">{tag}</h5>
        </button>
        // </li>
      ))}
    </div>
  );
}
TagsList.defaultProps = {
  valueProperty: "_id",
  contentProperty: "name"
};
TagsList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  valueProperty: PropTypes.string,
  contentProperty: PropTypes.string,
  onItemSelect: PropTypes.func,
  selectedItem: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string])
};

export default TagsList;
