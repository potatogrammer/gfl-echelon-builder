import React, { Component } from "react";
import InfoCard from "./Components/InfoCard/InfoCard";
import SelectBar from "./Components/SelectBar/SelectBar";
import ChangeStatsModal from "./Components/Modal/Modal";
import "./App.css";
import _ from "lodash";
import { Layout } from "antd";
import {
  getDollsByTypesAndCodename,
  getDoll,
  getDollStats,
  getDollCodename,
} from "./Stores/DollStore";

const { Header, Content, Footer, Sider } = Layout;
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchCategory: "Any",
      searchResults: [],
      InfoCardContent: {
        name: "",
        stats: [],
        level: 100,
        link: 5,
        favor: 100,
        skill1Level: 10,
        skill2Level: 10,
      },
      modalDisplayed: false,
      newSearch: true,
    };
  }

  handleSearchButton = async (searchItem) => {
    if (searchItem === this.state.InfoCardContent.name) {
      await this.setState({ newSearch: false });
    } else {
      await this.setState({ newSearch: true });
    }
    if (this.state.newSearch) {
      await this.setState({
        InfoCardContent: {
          name: "",
          stats: [],
          level: 100,
          link: 5,
          favor: 100,
          skill1Level: 10,
          skill2Level: 10,
        },
      });
    }

    const doll = getDoll(
      this.state.searchCategory,
      searchItem,
      this.state.InfoCardContent.level,
      this.state.InfoCardContent.link,
      this.state.InfoCardContent.favor,
      this.state.InfoCardContent.skill1Level,
      this.state.InfoCardContent.skill2Level
    );
    console.log(doll);
    const stats = _.cloneDeep(getDollStats(doll));
    const codename = getDollCodename(doll);
    await this.setState({
      InfoCardContent: {
        ...this.state.InfoCardContent,
        name: codename,
        stats: stats,
      },
    });
  };

  handleSelectBar = (value) => {
    this.setState({
      searchCategory: value,
      searchResults: getDollsByTypesAndCodename(value, ""),
    });
  };

  handleAdjustStatsButton = () => {
    if (!this.state.modalDisplayed) {
      this.setState({ modalDisplayed: true });
    } else {
      this.setState({ modalDisplayed: false });
    }
  };

  handleStatsAdjustment = (stats) => {
    const newStats = _.cloneDeep(this.state.InfoCardContent);
    for (const key in stats) {
      newStats[key] = stats[key];
    }

    this.setState({ InfoCardContent: _.cloneDeep(newStats) }, () => {
      this.handleSearchButton(this.state.InfoCardContent.name);
    });
  };

  componentDidMount() {
    this.setState({
      searchResults: getDollsByTypesAndCodename(this.state.searchCategory, ""),
    });
  }

  render() {
    return (
      <Layout>
        <Header className="header"></Header>
        <Layout className="main">
          <Sider width={280} className="sider">
            <SelectBar
              handleSelectBar={this.handleSelectBar}
              handleSearchButton={this.handleSearchButton}
              searchResults={this.state.searchResults}
            />
            <InfoCard
              InfoCardContent={this.state.InfoCardContent}
              handleAdjustStatsButton={this.handleAdjustStatsButton}
            />
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content className="main-content">
              {this.state.modalDisplayed ? (
                <ChangeStatsModal
                  InfoCardContent={this.state.InfoCardContent}
                  handleStatsAdjustment={this.handleStatsAdjustment}
                  handleAdjustStatsButton={this.handleAdjustStatsButton}
                />
              ) : (
                <></>
              )}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default App;
