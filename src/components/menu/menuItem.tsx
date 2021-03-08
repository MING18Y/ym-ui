import * as React from 'react';
import * as PropTypes from 'prop-types';


export interface menuItem {
  label: string,
  value: any,
}

export interface onClick {
  (item: menuItem): null
}

export interface MenuItemProps {
  item: menuItem,
  onClick: onClick,
}

function MenuItem(props: MenuItemProps) {
  const click = () => {
    props.onClick(props.item);
  };

  return (
    <div className="menu-item" onClick={click}>
      {
        props.item.label
      }
    </div>
  );
}

MenuItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.element,
  ]).isRequired,
  onClick: PropTypes.func,
  item: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.any,
  }),
};

export default MenuItem;


