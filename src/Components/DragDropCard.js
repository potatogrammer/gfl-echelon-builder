import React, { Component } from "react";

import "./App.css";
import { getDollCodename, getDollStats } from "./Stores/DollStore";
import InfoCard from "./Components/InfoCard/InfoCard";
import { Layout } from "antd";
import SelectBar from "./Components/SelectBar/SelectBar";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
const { Header, Content, Footer, Sider } = Layout;

const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}`,
    content: ``,
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "none" : "#f0b001",
  // styles we need to apply on draggables
  ...draggableStyle,
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchCategory: "Any",
      results: [],
      displayContent: [],
      currentCard: 0,
      items: [],
      selected: getItems(1),
    };
  }

  id2List = {
    droppable: "items",
    droppable2: "selected",
  };

  getList = (id) => this.state[this.id2List[id]];

  onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      let state = { items };

      if (source.droppableId === "droppable2") {
        state = { selected: items };
      }

      this.setState(state);
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      this.setState({
        items: result.droppable,
        selected: result.droppable2,
      });
    }
  };

  handleSearchButton = (searchItem) => {
    const stats = getDollStats(this.state.searchCategory, searchItem);
    this.setState({ displayContent: stats }, () =>
      this.createDraggableTask(this.state.displayContent)
    );
  };

  handleSelectBar = (value) => {
    this.setState({
      searchCategory: value,
      results: getDollCodename(value, ""),
    });
  };

  componentDidMount() {
    this.setState({ results: getDollCodename(this.state.searchCategory, "") });
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Layout>
          <Header className="header"></Header>
          <Layout className="main">
            <Sider width={280} className="sider">
              <SelectBar
                handleSelectBar={this.handleSelectBar}
                handleSearchButton={this.handleSearchButton}
                results={this.state.results}
              />
              <Droppable
                index={0}
                droppableId="droppable"
                isDropDisabled={true}
              >
                {(provided, snapshot) => (
                  <div ref={provided.innerRef}>
                    {this.state.items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <InfoCard
                              displayContent={this.state.displayContent}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Sider>
            <Layout style={{ padding: "0 24px 24px" }}>
              <Content
                className="main-content"
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                }}
              >
                <Droppable
                  index={1}
                  className="destination"
                  droppableId="droppable2"
                >
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef}>
                      {this.state.selected.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              {item.content}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </DragDropContext>
    );
  }
}
