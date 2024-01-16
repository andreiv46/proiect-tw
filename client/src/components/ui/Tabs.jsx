import { useState } from "react";
import PropTypes from "prop-types";
import { cn } from "../../../lib/utils.jsx";

const Tabs = ({ children, className }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const handleClick = (e, newActiveTab) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  return (
    <div className={cn("max-w-6xl mx-auto", className)}>
      <div className="flex border-b border-gray-300">
        {children.map((child) => (
          <button
            key={child.props.label}
            className={`${
              activeTab === child.props.label
                ? "border-b-2 border-purple-500"
                : ""
            } flex-1 text-white font-medium py-2 bg-teal-600 shadow-lg`}
            onClick={(e) => handleClick(e, child.props.label)}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="py-4">
        {children.map((child) => {
          if (child.props.label === activeTab) {
            return <div key={child.props.label}>{child.props.children}</div>;
          }
          return null;
        })}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
};

const Tab = ({ label, children, className }) => {
  return (
    <div label={label} className={cn("hidden", className)}>
      {children}
    </div>
  );
};

Tab.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
export { Tabs, Tab };
