import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faTrashAlt,
  faCheck
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useEffect, useState } from "react";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const Ol = styled.ol`
  width: 50%;
`;
const Li = styled.li`
  font-size: 1.2rem;
  color: var(--blue);
`;
const IconButton = styled.button`
  background-color: transparent;
  border: none;
`;

export const List = (props) => {
  const { items, setList, disabledItems, setdisabledItems } = props;
  const [currentItem, setCurrentItem] = useState("");
  const inputReference = useRef(null);
  const openField = (id) => {
    if (!currentItem) setdisabledItems(disabledItems.filter((it) => it !== id));
  };
  const setField = (e) => setCurrentItem(e.target.value);

  const update = (id) => {
    const allBefore = items.slice(0, id);
    const allAfter = items.slice(id + 1, items.length);
    const newArr = [...allBefore, currentItem, ...allAfter];

    setList(newArr);
    setdisabledItems([...disabledItems, id]);
    setCurrentItem("");
  };
  useEffect(() => {
    if (inputReference.current) {
      inputReference.current.focus();
    }
  }, [disabledItems]);
  return (
    <Container>
      <Ol>
        {items.map((item, i) => (
          <Li key={i}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                {i + 1}.{" "}
                <input
                  value={
                    disabledItems.includes(i)
                      ? item
                      : currentItem
                      ? currentItem
                      : item
                  }
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    fontSize: "1.2rem"
                  }}
                  disabled={disabledItems.includes(i) ? true : false}
                  ref={disabledItems.includes(i) ? null : inputReference}
                  onChange={setField}
                />{" "}
                <IconButton
                  onClick={() => update(i)}
                  style={{
                    display: disabledItems.includes(i) ? "none" : "inline"
                  }}
                >
                  <FontAwesomeIcon icon={faCheck} size="xs" color="green" />
                </IconButton>
              </div>
              <div>
                <IconButton onClick={() => openField(i)}>
                  <FontAwesomeIcon icon={faPencil} size="xs" />
                </IconButton>{" "}
                <IconButton
                  onClick={() => setList(items.filter((it, id) => id !== i))}
                >
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    color="var(--red)"
                    size="xs"
                  />
                </IconButton>
              </div>
            </div>
            <hr />
          </Li>
        ))}
      </Ol>
    </Container>
  );
};
