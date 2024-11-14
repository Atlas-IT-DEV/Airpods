import { useState } from "react";
import "../components/sortBar.css";
import {
  noSortIcon,
  searchIcon,
  sortDownIcon,
  sortUpIcon,
} from "../images/images";
import { useStores } from "../store/store_context";
import { observer } from "mobx-react-lite";

const SortBar = observer(() => {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("rgba(92, 92, 92, 1)");
  const [icon, setIcon] = useState(noSortIcon);
  const { pageStore } = useStores();

  const handleClick = () => {
    if (count !== 2) {
      setCount(count + 1);
    } else {
      setCount((count) => (count = 0));
    }
    pageStore.updateSort(count);
    console.log(pageStore.sort);
  };
  return (
    <div className="sortBar">
      <form
        className="searchBar"
        onSubmit={(event) => {
          event.preventDefault();
          console.log(pageStore.search);
        }}
      >
        {searchIcon}
        <input
          type="text"
          placeholder="Поиск"
          className="searchField"
          onChange={(event) => pageStore.updateSearch(event.target.value)}
        />
      </form>
      <button
        className="sortPrice"
        onClick={() => {
          handleClick();
          count === 0
            ? setColor((color) => (color = "var(--Yellow-gradient, #f5ea99)"))
            : count === 1
            ? setColor((color) => (color = "var(--Yellow-gradient, #f5ea99)"))
            : setColor((color) => (color = "rgba(92, 92, 92, 1)"));

          count === 0
            ? setIcon((icon) => (icon = sortUpIcon))
            : count === 1
            ? setIcon((icon) => (icon = sortDownIcon))
            : setIcon((icon) => (icon = noSortIcon));
        }}
        style={{ borderColor: color }}
      >
        <p className="sortPriceText" style={{ color: color }}>
          Цена
        </p>
        <div>{icon}</div>
      </button>
    </div>
  );
});

export default SortBar;
